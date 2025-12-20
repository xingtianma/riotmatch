import { getAccountByRiotId } from "../api/riot.client.js";

export async function getPUUIDFromRiotId(riotId) {
  const [gameName, tagLine] = riotId.split("#");

  if (!gameName || !tagLine) {
    throw new Error("Invalid Riot ID format. Use Name#TAG");
  }

  const account = await getAccountByRiotId(gameName, tagLine);

  return account.puuid;
}
