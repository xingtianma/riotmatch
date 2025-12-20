import { getPUUIDFromRiotId } from "./account.service.js";
import { getAllMatchIdsForPlayer } from "./match.service.js";
import { generateLeagueMatchLinks } from "../utils/matchLinks.js";

export async function getSharedMatchIds(riotIdA, riotIdB, options = {}) {
  // Convert Riot IDs -> PUUIDs
  const puuidA = await getPUUIDFromRiotId(riotIdA);
  const puuidB = await getPUUIDFromRiotId(riotIdB);

  // Fetch match histories
  const matchesA = await getAllMatchIdsForPlayer(puuidA, options);
  const matchesB = await getAllMatchIdsForPlayer(puuidB, options);

  // Convert one side to a Set for fast lookup
  const setB = new Set(matchesB);

  // Intersect
  const sharedMatches = matchesA.filter(matchId =>
    setB.has(matchId)
  );

  return sharedMatches.map(generateLeagueMatchLinks);
}
