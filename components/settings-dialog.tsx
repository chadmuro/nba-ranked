"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
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
import { Switch } from "./ui/switch";
import { useState } from "react";

export default function SettingsDialog() {
  const [hardMode, setHardMode] = useState(false);

  function handleDailyReset() {
    localStorage.removeItem("game_data");

    // Refresh the page with nextjs
    window.location.reload();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Settings</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Make changes to how you want to play the game
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <div className="flex items-center gap-4">
              <Label htmlFor="hard_mode">Hard mode 🔥</Label>
              <Switch checked={hardMode} onCheckedChange={setHardMode} />
            </div>
            <p className="text-sm font-extralight">
              After submitting your answer, you will only be shown the number of
              players in the correct position.
            </p>
          </div>

          <div>
            <div className="flex items-center gap-4">
              <Label htmlFor="reset">Reset all game stats</Label>
              <Button
                onClick={handleDailyReset}
                size="sm"
                variant="destructive"
              >
                Reset
              </Button>
            </div>
            <p className="text-sm font-extralight">
              This will reset the game stats for all days.
            </p>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
