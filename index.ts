import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { handleUncaughtErrors, handleUnhandledRejections } from './src/services';
import { appLoader, databaseLoader, loadRedis } from './src/loaders';
import { router } from './src/routes';

process.on('uncaughtException',
  handleUncaughtErrors);
process.on('unhandledRejection',
  handleUnhandledRejections);

const app = express();

databaseLoader()
  .then(loadRedis)
  .then(() => appLoader(app, router))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
