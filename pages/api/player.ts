import * as cheerio from "cheerio";
import { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  data: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const season = "2024";
  const stat = "#totals_stats::pts";

  try {
    const response = await fetch(
      `https://www.basketball-reference.com/leagues/NBA_${season}_totals.html${stat}`
    );
    const htmlString = await response.text();
    const $ = cheerio.load(htmlString);
    const allRows = $("tr.full_table");

    const randomPlayers: any[] = [];
    const randomPlayerData: {
      index: number;
      playerName: string;
      playerStat: string;
      playerImageSrc?: string;
    }[] = [];

    for (let i = 0; i < 6; i++) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * allRows.length);
      } while (randomPlayers.includes(randomIndex));

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
      const playerImageSrc = player$("#meta > div.media-item > img").attr(
        "src"
      );

      const playerStat = allRows
        .eq(randomIndex)
        .find("td[data-stat='pts']")
        .text();

      randomPlayerData.push({
        index: randomIndex,
        playerName,
        playerStat,
        playerImageSrc,
      });
    }
    console.log(randomPlayerData);

    return res.status(200).json({ data: randomPlayerData });
  } catch (e) {
    return { error: "error" };
  }
}
