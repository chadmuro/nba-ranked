type StatType = "pts" | "pts_per_g" | "trb" | "trb_per_g" | "ast" | "ast_per_g";

export function mapStatType(statType: StatType): string {
  switch (statType) {
    case "pts":
      return "total points";
    case "pts_per_g":
      return "points per game";
    case "trb":
      return "total rebounds";
    case "trb_per_g":
      return "rebounds per game";
    case "ast":
      return "total assists";
    case "ast_per_g":
      return "assists per game";
    default:
      return "";
  }
}

// customize settings

// show stats
// show answer placement (only correct answers)
// show answer placement (one away hint)

export type DailyGameData = {
  _id: string;
  data: string;
  date: string;
  season: string;
  stat: StatType;
};

export type Player = {
  index: number;
  playerName: string;
  playerStat: string;
  playerImageSrc: string;
};
