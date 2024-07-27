"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mapStatType } from "@/lib/types";
import { useSearchParams, useRouter } from "next/navigation";

interface Props {
  games: any;
}

export function DateSelect({ games }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();

  function onChange(date: string) {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("date", date);
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    router.replace(newUrl);
  }

  console.log(searchParams?.get("date"));

  return (
    <Select onValueChange={onChange} value={searchParams?.get("date") || ""}>
      <SelectTrigger className="w-[350px]">
        <SelectValue placeholder="Select a date" />
      </SelectTrigger>
      <SelectContent>
        {games.map((game: any) => {
          return (
            <SelectItem key={game.date} value={game.date}>
              {game.date} ({game.season - 1}-{game.season}{" "}
              {mapStatType(game.stat)})
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
