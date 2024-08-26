import Image from "next/image";
import { Reorder } from "framer-motion";
import { useIsMobile } from "@/hooks/useMobile";
import { Player } from "@/lib/types";

interface Props {
  player: Player;
  onReorderWithPositionLock: () => void;
  dragLock: boolean;
}

export default function PlayerCard({
  player,
  onReorderWithPositionLock,
  dragLock,
}: Props) {
  const isMobile = useIsMobile();

  return (
    <Reorder.Item
      key={player.index}
      value={player}
      className="flex flex-row sm:flex-col cursor-grab active:cursor-grabbing w-fit gap-1"
      onDragEnd={onReorderWithPositionLock}
      dragListener={!dragLock}
      style={{ touchAction: "none" }}
    >
      {player.playerImageSrc !== undefined ? (
        <Image
          src={player.playerImageSrc}
          alt={player.playerName}
          height={!isMobile ? 300 : 60}
          width={!isMobile ? 250 : 40}
          className="pointer-events-none"
        />
      ) : null}
      <p>{player.playerName}</p>
    </Reorder.Item>
  );
}
