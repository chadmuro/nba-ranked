export enum StatTypeUrl {
  PTS = "totals.html#totals_stats::pts",
  PTS_PER_G = "per_game.html#per_game_stats::pts_per_g",
  TRB = "totals.html#totals_stats::trb",
  TRB_PER_G = "per_game.html#per_game_stats::trb_per_g",
  AST = "totals.html#totals_stats::ast",
  AST_PER_G = "per_game.html#per_game_stats::ast_per_g",
  FG3 = "totals.html#totals_stats::fg3",
}

export enum StatType {
  PTS = "pts",
  PTS_PER_G = "pts_per_g",
  TRB = "trb",
  TRB_PER_G = "trb_per_g",
  AST = "ast",
  AST_PER_G = "ast_per_g",
  FG3 = "fg3",
}

export function mapStatType(statType: StatType): string {
  switch (statType) {
    case StatType.PTS:
      return "total points";
    case StatType.PTS_PER_G:
      return "points per game";
    case StatType.TRB:
      return "total rebounds";
    case StatType.TRB_PER_G:
      return "rebounds per game";
    case StatType.AST:
      return "total assists";
    case StatType.AST_PER_G:
      return "assists per game";
    case StatType.FG3:
      return "three-pointers made";
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
