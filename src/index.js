import "dotenv/config";
import { getSharedMatchIds } from "./services/sharedMatches.service.js";

async function main() {
  try {
    const riotIdA = "darm#envi";
    const riotIdB = "envi#yuu";

    const sharedMatches = await getSharedMatchIds(
      riotIdA,
      riotIdB,
      { maxPages: 5 }
    );

    console.log(`Shared matches found: ${sharedMatches.length}`);
    console.log(sharedMatches.slice(0, 5)); // preview
  } catch (err) {
    console.error(err.message);
  }
}

main();
