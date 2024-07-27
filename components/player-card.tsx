import Image from "next/image";
import { Reorder } from "framer-motion";
import { useIsMobile } from "@/hooks/useMobile";

interface Props {
  player: any;
}

export default function PlayerCard({ player }: Props) {
  const isMobile = useIsMobile();

  return (
    <Reorder.Item
      key={player.index}
      value={player}
      className="flex flex-row sm:flex-col cursor-grab active:cursor-grabbing"
    >
      {player.playerImageSrc !== undefined ? (
        <Image
          src={player.playerImageSrc}
          alt={player.playerName}
          height={300}
          width={isMobile ? 80 : 250}
          className="pointer-events-none"
        />
      ) : null}
      <p>{player.playerName}</p>
    </Reorder.Item>
  );
}
