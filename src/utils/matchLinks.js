const REGION_MAP = {
  NA1: "na",
  EUW1: "euw",
  EUN1: "eune",
  KR: "kr",
  JP1: "jp",
  BR1: "br",
  LA1: "lan",
  LA2: "las",
  OC1: "oce",
  RU: "ru",
  TR1: "tr"
};

export function generateLeagueMatchLinks(matchId) {
  const [riotRegion, gameId] = matchId.split("_");
  const logRegion = REGION_MAP[riotRegion];

  if (!logRegion) {
    throw new Error(`Unsupported region: ${riotRegion}`);
  }

  return {
    matchId,
    leagueOfGraphs: `https://www.leagueofgraphs.com/match/${logRegion}/${gameId}`
  };
}
