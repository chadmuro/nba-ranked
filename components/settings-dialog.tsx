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

          <div className="flex items-center gap-4">
            <Label htmlFor="reset">Reset day stats</Label>
            <Button variant="outline">Reset</Button>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit">Save changes</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
