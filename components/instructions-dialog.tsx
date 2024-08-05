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
import { useIsMobile } from "@/hooks/useMobile";
import Image from "next/image";

export default function InstructionsDialog() {
  const isMobile = useIsMobile();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>How to play</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>How to play</DialogTitle>
          <div className="flex flex-col justify-center items-center py-4">
            <DialogDescription>
              After submitting your answers, green means the player is in the
              correct position. Yellow means the player is one spot away. Red
              means the player is more than one spot away.
            </DialogDescription>
            <Image
              src={isMobile ? "/instructions-mobile.png" : "/instructions.png"}
              alt="Instructions"
              height={isMobile ? 600 : 400}
              width={isMobile ? 200 : 600}
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
