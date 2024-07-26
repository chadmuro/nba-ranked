import { httpRouter } from "convex/server";
import { postGameDataApi } from "./games";

const http = httpRouter();

http.route({
  path: "/postGameData",
  method: "POST",
  handler: postGameDataApi,
});

// Convex expects the router to be the default export of `convex/http.js`.
export default http;
