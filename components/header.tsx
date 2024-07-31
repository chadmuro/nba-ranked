import { DateSelect } from "@/components/date-select";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import SettingsDialog from "./settings-dialog";
import InstructionsDialog from "./instructions-dialog";

export default async function Header() {
  const games = await fetchQuery(api.games.getGameData);

  return (
    <header className="self-end flex flex-col gap-2 p-4">
      <div className="flex justify-end gap-2">
        <InstructionsDialog />
        <SettingsDialog />
      </div>
      <DateSelect games={games} />
    </header>
  );
}
