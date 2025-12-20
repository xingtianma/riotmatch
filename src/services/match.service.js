import { getLolMatchIdsByPUUID } from "../api/riot.client.js";

export async function getAllMatchIdsForPlayer(puuid, options = {}) {
  const {
    pageSize = 100,
    maxPages = 10
  } = options;

  const allMatches = new Set();

  try {
    for (let page = 0; page < maxPages; page++) {
      const start = page * pageSize;

      const matchBatch = await getLolMatchIdsByPUUID(
        puuid,
        start,
        pageSize
      );

      if (matchBatch.length === 0) {
        break;
      }

      matchBatch.forEach(matchId => allMatches.add(matchId));
    }
  } catch (err) {
    console.error(err.response?.data || err.message);
    throw err; // rethrow so higher layers know it failed
  }

  return [...allMatches];
}
