import GameContent from "@/components/game-content";
import { api } from "../convex/_generated/api";
import { fetchQuery } from "convex/nextjs";

export default async function Home() {
  const games = await fetchQuery(api.games.getGameData);

  return (
    <main className="flex flex-1 flex-col items-center justify-start p-4 w-full max-w-screen-xl gap-2">
      <GameContent games={games} />
    </main>
  );
}
