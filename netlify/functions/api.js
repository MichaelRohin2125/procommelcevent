import serverless from 'serverless-http';
import { app, initDB } from '../../server/server.js';

const expressHandler = serverless(app);
let dbInitPromise;

const ensureDbInitialized = async () => {
  if (!dbInitPromise) {
    dbInitPromise = initDB();
  }
  await dbInitPromise;
};

const normalizePath = (path = '') => path.replace(/^\/\.netlify\/functions\/api(?=\/|$)/, '/api');

export const handler = async (event, context) => {
  await ensureDbInitialized();
  const normalizedEvent = {
    ...event,
    path: normalizePath(event.path),
  };

  return expressHandler(normalizedEvent, context);
};
