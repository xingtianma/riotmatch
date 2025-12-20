import "dotenv/config";
import { getPUUIDFromRiotId } from "./services/account.service.js";
import { getAllMatchIdsForPlayer } from "./services/match.service.js";

async function main() {
  try {
    const riotId = "darm#envi"; // replace with real ID

    const puuid = await getPUUIDFromRiotId(riotId);
    console.log("PUUID:", puuid);

    const matches = await getAllMatchIdsForPlayer(puuid, {
      maxPages: 5
    });

    console.log(`Found ${matches.length} matches`);
    console.log(matches.slice(0, 5)); // preview
  } catch (err) {
    console.error(err.message);
  }
}

main();
