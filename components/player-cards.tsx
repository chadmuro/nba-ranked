import { Reorder } from "framer-motion";
import { useEffect, useState } from "react";
import PlayerCard from "./player-card";
import { useSearchParams } from "next/navigation";
import { useIsMobile } from "@/hooks/useMobile";
import { Button } from "./ui/button";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface Props {
  data: any;
  date: string;
}

export default function PlayerCards({ data, date }: Props) {
  const [gameData, setGameData] = useLocalStorage("game_data", {
    [date]: { players: data, guessCount: 0 },
  });

  const [players, setPlayers] = useState(
    gameData[date] ? gameData[date].players : data
  );

  const [correctPositions, setCorrectPositions] = useState<number[]>([]);
  const [wrongPositions, setWrongPositions] = useState<number[]>([]);
  const [oneOffPositions, setOneOffPositions] = useState<number[]>([]);
  const searchParams = useSearchParams();
  const isMobile = useIsMobile();

  useEffect(() => {
    const savedGameData = JSON.parse(localStorage.getItem("game_data") || "[]");
    const savedPlayersData = savedGameData[date]?.players;

    if (savedPlayersData?.length) {
      setPlayers(savedPlayersData);
    } else {
      setPlayers(data);
    }

    const savedGuessCount = savedGameData[date]?.guessCount;

    if (savedGuessCount > 0) {
      const sortedPlayers = [...savedPlayersData].sort(
        (a: any, b: any) => b.playerStat - a.playerStat
      );
      onSubmit(false, savedPlayersData, sortedPlayers);
    } else {
      setCorrectPositions([]);
      setWrongPositions([]);
      setOneOffPositions([]);
    }
  }, [searchParams]);

  const sortedPlayers = [...players].sort(
    (a: any, b: any) => b.playerStat - a.playerStat
  );

  function onSubmit(
    updateGuessCount = false,
    passedPlayersData = players,
    passedSortedPlayers = sortedPlayers
  ) {
    const correct: number[] = [];
    const wrong: number[] = [];
    const oneOff: number[] = [];

    passedPlayersData.forEach((player: any, index: number) => {
      const sortedIndex = passedSortedPlayers.findIndex(
        (sortedPlayer: any) => sortedPlayer.index === player.index
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

    if (updateGuessCount) {
      setGameData({
        ...gameData,
        [date]: {
          players: passedPlayersData,
          guessCount: gameData[date] ? gameData[date].guessCount + 1 : 1,
        },
      });
    }
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
      <p>Total guesses: {gameData[date]?.guessCount ?? 0}</p>
      <div className="flex flex-row sm:flex-col w-full gap-4 py-4">
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
      <Button
        disabled={correctPositions.length === 6}
        onClick={() => onSubmit(true)}
      >
        Submit
      </Button>
    </>
  );
}
