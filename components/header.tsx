import { DateSelect } from "@/components/date-select";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";

export default async function Header() {
  const games = await fetchQuery(api.games.getGameData);

  return (
    <header className="self-end">
      <button>How to play</button>
      <button>Settings</button>
      <DateSelect games={games} />
    </header>
  );
}
