"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";

export default function InstructionsDialog() {
  const localTime = new Date();
  localTime.setUTCHours(0, 0, 0, 0);
  const formattedTime = localTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>How to play</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-screen overflow-auto">
        <DialogHeader>
          <DialogTitle>How to play</DialogTitle>
          <div className="flex flex-col justify-center items-center py-4">
            <DialogDescription className="text-normal">
              New game is available every day from {formattedTime} 🏀
            </DialogDescription>
            <p className="text-sm text-muted-foreground py-2">
              Every day you will be presented with a list of random NBA players
              from a single season (1999-2000 to present). You need to rank
              these players based on the given stat from that season.
            </p>
            <p className="text-sm text-muted-foreground py-2">
              After submitting your answers, green means the player is in the
              correct rank. Yellow means the player is one rank away. Red means
              the player is more than one rank away.
            </p>
            <Image
              src={"/instructions.png"}
              alt="Instructions"
              height={200}
              width={400}
            />
          </div>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button">Got it!</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
