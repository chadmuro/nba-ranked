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
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useState } from "react";

export default function SettingsDialog() {
  const [modalState, setModalState] = useState<0 | 1>(0);
  const [gameSettings, setGameSettings] = useLocalStorage("game_settings", {
    hardMode: false,
  });

  function handleDailyReset() {
    localStorage.removeItem("game_data");

    window.location.reload();
  }

  return (
    <Dialog
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          setModalState(0);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline">Settings</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {modalState === 0 && (
          <div className="grid gap-4 py-4">
            <div>
              <div className="flex items-center gap-4">
                <Label htmlFor="hard_mode">Hard mode 🔥</Label>
                <Switch
                  checked={gameSettings.hardMode}
                  onCheckedChange={() => {
                    setGameSettings({ hardMode: !gameSettings.hardMode });
                    window.location.reload();
                  }}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                After submitting your answer, you will only be shown the number
                of players in the correct rank.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-4">
                <Label htmlFor="reset">Reset all game stats</Label>
                <Button
                  // onClick={handleDailyReset}
                  onClick={() => setModalState(1)}
                  size="sm"
                  variant="destructive"
                >
                  Reset
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                This will reset the game stats for all days.
              </p>
            </div>
          </div>
        )}
        {modalState === 1 && (
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-4">
              <div>
                <Label htmlFor="reset">
                  Are you sure you want to reset all game stats?
                </Label>
              </div>
              <p className="text-sm text-muted-foreground">
                This will reset the game stats for all days and cannot be
                undone.
              </p>
              <Button
                onClick={handleDailyReset}
                size="sm"
                variant="destructive"
              >
                Reset
              </Button>
              <Button
                onClick={() => setModalState(0)}
                size="sm"
                variant="secondary"
              >
                Back
              </Button>
            </div>
          </div>
        )}
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
