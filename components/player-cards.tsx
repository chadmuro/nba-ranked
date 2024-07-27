import { Reorder } from "framer-motion";
import { useEffect, useState } from "react";
import PlayerCard from "./player-card";
import { useSearchParams } from "next/navigation";
import { useIsMobile } from "@/hooks/useMobile";

interface Props {
  data: any;
}

export default function PlayerCards({ data }: Props) {
  const [players, setPlayers] = useState(data);
  const searchParams = useSearchParams();
  const isMobile = useIsMobile();

  useEffect(() => {
    setPlayers(data);
  }, [searchParams]);

  // Sort players by player.stat
  const sortedPlayers = [...players].sort(
    (a: any, b: any) => b.playerStat - a.playerStat
  );

  return (
    <div className="flex flex-row sm:flex-col ">
      <div className="flex flex-col sm:flex-row gap-4 justify-around w-full">
        {sortedPlayers.map((player: any, index) => {
          return (
            <div
              key={player.index}
              className="flex flex-col items-center w-full"
            >
              <p>#{index + 1}</p>
              <p>{player.playerStat}</p>
            </div>
          );
        })}
      </div>
      <Reorder.Group
        key={isMobile ? "vertical" : "horizontal"}
        axis={isMobile ? "y" : "x"}
        values={players}
        onReorder={setPlayers}
        className="flex flex-col sm:flex-row gap-4 justify-around w-full overflow-hidden"
      >
        {players.map((player: any) => {
          return <PlayerCard key={player.index} player={player} />;
        })}
      </Reorder.Group>
    </div>
  );
}
