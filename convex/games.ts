import { v } from "convex/values";
import { internalMutation, query, httpAction } from "./_generated/server";
import { internal } from "./_generated/api";

export const getGameData = query({
  args: {},
  handler: async (ctx) => {
    const todaysDate = new Date().toISOString().split("T")[0];
    return await ctx.db
      .query("games")
      .filter((q) => q.lte(q.field("date"), todaysDate))
      .take(365);
  },
});

export const postGameData = internalMutation({
  args: {
    date: v.string(),
    data: v.string(),
    season: v.string(),
    stat: v.string(),
  },
  handler: async (ctx, args) => {
    const gameId = await ctx.db.insert("games", {
      date: args.date,
      data: args.data,
      season: args.season,
      stat: args.stat,
    });
  },
});

export const postGameDataApi = httpAction(async (ctx, request) => {
  const requestData = await request.json();

  await ctx.runMutation(internal.games.postGameData, {
    date: requestData.date,
    data: requestData.data,
    season: requestData.season,
    stat: requestData.stat,
  });

  return new Response(null, {
    status: 200,
  });
});
