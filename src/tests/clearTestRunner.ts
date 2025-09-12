import { clearDB } from './helpers';

async function run() {
  try {
    await clearDB();
    console.log('DB cleared (via clearDB)');
    process.exit(0);
  } catch (err) {
    console.error('Error clearing DB', err);
    process.exit(1);
  }
}

run();
