import { Reorder } from "framer-motion";
import { useEffect, useState } from "react";
import PlayerCard from "./player-card";
import { useSearchParams } from "next/navigation";
import { useIsMobile } from "@/hooks/useMobile";
import { Button } from "./ui/button";

interface Props {
  data: any;
}

export default function PlayerCards({ data }: Props) {
  const [players, setPlayers] = useState(data);
  const [correctPositions, setCorrectPositions] = useState<number[]>([]);
  const [wrongPositions, setWrongPositions] = useState<number[]>([]);
  const [oneOffPositions, setOneOffPositions] = useState<number[]>([]);
  const searchParams = useSearchParams();
  const isMobile = useIsMobile();

  useEffect(() => {
    setPlayers(data);
    setCorrectPositions([]);
    setWrongPositions([]);
    setOneOffPositions([]);
  }, [searchParams]);

  // Sort players by player.stat
  const sortedPlayers = [...players].sort(
    (a: any, b: any) => b.playerStat - a.playerStat
  );

  function onSubmit() {
    const correct: number[] = [];
    const wrong: number[] = [];
    const oneOff: number[] = [];

    players.forEach((player: any, index: number) => {
      const sortedIndex = sortedPlayers.findIndex(
        (sortedPlayer) => sortedPlayer.index === player.index
      );

      if (index === sortedIndex) {
        correct.push(index);
      } else if (Math.abs(index - sortedIndex) === 1) {
        oneOff.push(index);
      } else {
        wrong.push(index);
      }
    });

    setCorrectPositions(correct);
    setOneOffPositions(oneOff);
    setWrongPositions(wrong);
  }

  function onReorderWithPositionLock() {
    if (correctPositions.length === 0) {
      return setPlayers(players);
    }

    let updatedPlayers = [...players];

    // iterate over the correctPositions array
    correctPositions.forEach((correctPosition) => {
      // check if the correctPosition is within the bounds of the array
      if (correctPosition < 0 || correctPosition >= sortedPlayers.length) {
        console.error(`Position ${correctPosition} is out of bounds`);
        return;
      }

      // get the player from the sortedPlayers array
      const sortedPlayer = sortedPlayers[correctPosition];

      // remove the player from the updatedPlayers array
      updatedPlayers = updatedPlayers.filter(
        (player) => player.index !== sortedPlayer.index
      );

      // add sorted player to the correct position
      updatedPlayers.splice(correctPosition, 0, sortedPlayer);
    });

    // Update the players state
    setPlayers(updatedPlayers);
  }

  return (
    <>
      <div className="flex flex-row sm:flex-col w-full gap-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-around">
          {sortedPlayers.map((player: any, index) => {
            return (
              <div
                key={player.index}
                className={`flex flex-col items-center w-full px-4 flex-1 ${
                  correctPositions.includes(index)
                    ? "bg-green-500"
                    : oneOffPositions.includes(index)
                      ? "bg-yellow-500"
                      : wrongPositions.includes(index)
                        ? "bg-red-500"
                        : ""
                }`}
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
          {players.map((player: any, index: number) => {
            return (
              <PlayerCard
                key={player.index}
                player={player}
                onReorderWithPositionLock={onReorderWithPositionLock}
                dragLock={!correctPositions.includes(index)}
              />
            );
          })}
        </Reorder.Group>
      </div>
      <Button onClick={onSubmit}>Submit</Button>
    </>
  );
}
