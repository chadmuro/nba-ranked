import Image from "next/image";
import { fetchQuery } from "convex/nextjs";
import { api } from "../convex/_generated/api";
import { mapStatType } from "@/utils/types";

export default async function Home() {
  const games = await fetchQuery(api.games.getGameData);
  const today = games[games.length - 1];
  if (!today) {
    return <div>No games today</div>;
  }

  let data;
  if (today.data) {
    data = JSON.parse(today.data);
  }

  return (
    <main className="flex flex-1 flex-col items-center justify-start p-24">
      <h1 className="text-4xl font-bold">Today's Game</h1>
      <h2>{today.date}</h2>
      <h3>
        Sort these players in order of their {mapStatType(today.stat)} from the{" "}
        {today.season - 1}-{today.season} season.
      </h3>
      <div className="flex flex-row justify-between">
        {data?.map((player: any) => {
          return (
            <div key={player.index}>
              <p>{player.playerName}</p>
              <p>{player.playerStat}</p>
              {player.playerImageSrc !== undefined ? (
                <Image
                  src={player.playerImageSrc}
                  alt={player.playerName}
                  height={450}
                  width={300}
                />
              ) : null}
            </div>
          );
        })}
      </div>
    </main>
  );
}
