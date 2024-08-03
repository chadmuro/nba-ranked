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

export default function InstructionsDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>How to play</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>How to play</DialogTitle>
          {/* <DialogDescription>Learn how to play NBA, Ranked</DialogDescription> */}
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
