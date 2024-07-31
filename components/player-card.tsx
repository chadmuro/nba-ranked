import Image from "next/image";
import { Reorder } from "framer-motion";
import { useIsMobile } from "@/hooks/useMobile";

interface Props {
  player: any;
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
      className="flex flex-row sm:flex-col cursor-grab active:cursor-grabbing"
      onDragEnd={onReorderWithPositionLock}
      dragListener={dragLock}
    >
      {player.playerImageSrc !== undefined ? (
        <Image
          src={player.playerImageSrc}
          alt={player.playerName}
          height={isMobile ? 90 : 300}
          width={isMobile ? 60 : 250}
          className="pointer-events-none"
        />
      ) : null}
      <p>{player.playerName}</p>
    </Reorder.Item>
  );
}
