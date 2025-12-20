import axios from "axios";

const riotClient = axios.create({
  headers: {
    "X-Riot-Token": process.env.RIOT_API_KEY
  },
  timeout: 5000
});

// Riot Account API (global)
export async function getAccountByRiotId(gameName, tagLine) {
  const url = `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`;

  const response = await riotClient.get(url);
  return response.data;
}

export async function getValMatchIdsByPUUID(puuid, start = 0, count = 100) {
  const url = `https://americas.api.riotgames.com/val/match/v1/matchlists/by-puuid/${puuid}?start=${start}&count=${count}`;

  const response = await riotClient.get(url);
  return response.data; // array of match IDs
}

export async function getLolMatchIdsByPUUID(puuid, start = 0, count = 100) {
  const url = `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=${start}&count=${count}`;

  const response = await riotClient.get(url);
  return response.data; // array of match IDs
}
