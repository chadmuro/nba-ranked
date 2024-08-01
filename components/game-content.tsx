"use client";

import { mapStatType } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import PlayerCards from "./player-cards";

interface Props {
  games: any;
}

export default function GameContent({ games }: Props) {
  const searchParams = useSearchParams();
  const gameDate =
    searchParams?.get("date") || new Date().toISOString().split("T")[0];

  const today = games?.find((game: any) => game.date === gameDate);

  if (!today) {
    return <div>No games today</div>;
  }

  let data;
  if (today.data) {
    data = JSON.parse(today.data);
  }

  return (
    <>
      <h1 className="text-4xl font-bold">NBA, Ranked</h1>
      <h2 className="text-3xl font-bold">Today&apos;s Game</h2>
      <h3>{today.date}</h3>
      <h4>
        Sort these players in order of their {mapStatType(today.stat)} from the{" "}
        {today.season - 1}-{today.season} season.
      </h4>
      <PlayerCards data={data} date={today.date} />
    </>
  );
}
