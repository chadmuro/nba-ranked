import { DateSelect } from "@/components/date-select";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import SettingsDialog from "./settings-dialog";
import InstructionsDialog from "./instructions-dialog";
import { Button } from "./ui/button";
import Link from "next/link";

export default async function Header() {
  const games = await fetchQuery(api.games.getGameData);

  return (
    <header className="self-end flex flex-col gap-2 p-4">
      <div className="flex justify-end gap-2">
        <Link href="/">
          <Button variant="secondary">Today&apos;s game</Button>
        </Link>
        <InstructionsDialog />
        <SettingsDialog />
      </div>
      <DateSelect games={games} />
    </header>
  );
}
