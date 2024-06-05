import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
import { Server } from 'http';

let server: Server;
async function main() {
  try {
    await mongoose.connect(config.database as string);
    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
process.on('unhandledRejection', () => {
  console.log(`😈 unhandledRejection is detected, server is shutting down`);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log(`🚫 uncaughtException is detected, server is shutting down`);

  process.exit(1);
});

