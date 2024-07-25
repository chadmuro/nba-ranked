"use client";
import { useQuery } from "convex/react";
import Image from "next/image";
import { api } from "../convex/_generated/api";

export default function Home() {
  const games = useQuery(api.games.get);
  const today = games ? games[0] : [];
  let data;

  if (today.data) {
    data = JSON.parse(today.data);
  }

  console.log(data);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {data?.map((player: any) => {
        return (
          <div key={player.index}>
            <p>{player.playerName}</p>
            <p>{player.playerStat}</p>
            {player.playerImageSrc !== undefined ? (
              <Image
                src={player.playerImageSrc}
                alt={player.playerName}
                height={300}
                width={300}
              />
            ) : null}
          </div>
        );
      })}
    </main>
  );
}
