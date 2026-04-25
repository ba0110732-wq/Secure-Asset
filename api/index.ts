// Vercel Serverless Function entry point.
// Routes ALL `/api/*` requests to the Express app from `@workspace/api-server`.
// Configured via vercel.json rewrite: `/api/(.*)` -> `/api/index`.
import app from "../artifacts/api-server/src/app";

export default app;
