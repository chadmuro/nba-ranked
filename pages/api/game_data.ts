import * as cheerio from "cheerio";
import { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  data: {
    index: number;
    playerName: string;
    playerStat: string;
    playerImageSrc?: string | undefined;
  }[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const authHeader = req.headers["authorization"];
  if (
    !process.env.CRON_SECRET ||
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return res.status(401).json({ data: [] });
  }

  const season = getRandomYear();
  const statType = getRandomStatTypeUrl();
  const statTypeUrl = statType.statTypeUrl;
  const rowRef = statType.rowRef;

  try {
    const response = await fetch(
      `https://www.basketball-reference.com/leagues/NBA_${season}_${statTypeUrl}`
    );
    const htmlString = await response.text();
    const $ = cheerio.load(htmlString);
    const allRows = $("tr.full_table");

    const randomPlayerIds: number[] = [];
    const gamePlayerData: {
      index: number;
      playerName: string;
      playerStat: string;
      playerImageSrc?: string;
    }[] = [];

    for (let i = 0; gamePlayerData.length < 6; i++) {
      let randomIndex;
      let playerImageSrc;

      do {
        randomIndex = Math.floor(Math.random() * allRows.length);
      } while (randomPlayerIds.includes(randomIndex));

      const playerName = allRows
        .eq(randomIndex)
        .find("td")
        .eq(0)
        .find("a")
        .text();
      const playerLink = allRows
        .eq(randomIndex)
        .find("td")
        .eq(0)
        .find("a")
        .attr("href");

      const playerImageResponse = await fetch(
        `https://www.basketball-reference.com${playerLink}`
      );
      const playerHtmlString = await playerImageResponse.text();
      const player$ = cheerio.load(playerHtmlString);
      const playerImageElement = player$("#meta > div.media-item > img");

      if (playerImageElement.length > 0) {
        playerImageSrc = playerImageElement.attr("src");

        const playerStat = allRows
          .eq(randomIndex)
          .find(`td[data-stat='${rowRef}']`)
          .text();

        const isDuplicate = gamePlayerData.some(
          (player) => player.playerStat === playerStat
        );

        if (!isDuplicate) {
          gamePlayerData.push({
            index: randomIndex,
            playerName,
            playerStat,
            playerImageSrc,
          });
        }
      }
    }

    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    const date = currentDate.toISOString().split("T")[0];

    await fetch(`${process.env.CONVEX_SITE_URL}/postGameData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date,
        data: JSON.stringify(gamePlayerData),
        season: season.toString(),
        stat: rowRef,
      }),
    });

    return res.status(200).json({ data: gamePlayerData });
  } catch (e) {
    return { error: `error: ${e}` };
  }
}

function getRandomYear(): number {
  const minYear = 2000;
  const maxYear = 2024;
  return Math.floor(Math.random() * (maxYear - minYear + 1)) + minYear;
}

type StatTypeUrl =
  | "totals.html#totals_stats::pts"
  | "per_game.html#per_game_stats::pts_per_g"
  | "totals.html#totals_stats::trb"
  | "per_game.html#per_game_stats::trb_per_g"
  | "totals.html#totals_stats::ast"
  | "per_game.html#per_game_stats::ast_per_g";

type StatType = "pts" | "pts_per_g" | "trb" | "trb_per_g" | "ast" | "ast_per_g";

type StatTypeUrlWithRowRef = {
  statTypeUrl: StatTypeUrl;
  rowRef: StatType;
};

function getRandomStatTypeUrl(): StatTypeUrlWithRowRef {
  const statTypeUrls: StatTypeUrlWithRowRef[] = [
    { statTypeUrl: "totals.html#totals_stats::pts", rowRef: "pts" },
    {
      statTypeUrl: "per_game.html#per_game_stats::pts_per_g",
      rowRef: "pts_per_g",
    },
    { statTypeUrl: "totals.html#totals_stats::trb", rowRef: "trb" },
    {
      statTypeUrl: "per_game.html#per_game_stats::trb_per_g",
      rowRef: "trb_per_g",
    },
    { statTypeUrl: "totals.html#totals_stats::ast", rowRef: "ast" },
    {
      statTypeUrl: "per_game.html#per_game_stats::ast_per_g",
      rowRef: "ast_per_g",
    },
  ];
  const randomIndex = Math.floor(Math.random() * statTypeUrls.length);
  return statTypeUrls[randomIndex];
}
