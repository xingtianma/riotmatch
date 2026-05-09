# RiotMatch

A CLI tool that finds shared League of Legends match history between two players using the Riot Games API. Give it two Riot IDs and it returns every game they've played together, with links to view each match on League of Graphs.

## Features

- **Shared match lookup** — finds the intersection of two players' match histories
- **Paginated fetching** — walks through match history in configurable page sizes
- **Match links** — generates [League of Graphs](https://www.leagueofgraphs.com/) URLs for every shared match
- **Multi-region support** — handles NA, EUW, EUNE, KR, JP, BR, LAN, LAS, OCE, RU, and TR

## Prerequisites

- [Node.js](https://nodejs.org/) v18+
- A [Riot Games API key](https://developer.riotgames.com/)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/xingtianma/riotmatch.git
cd riotmatch
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
RIOT_API_KEY=your_riot_api_key
```

> **Note:** Development API keys expire every 24 hours. For persistent use, apply for a [personal or production key](https://developer.riotgames.com/).

### 4. Run

Edit the Riot IDs in `src/index.js`, then:

```bash
npm start
```

## Example Output

```
Shared matches found: 12
[
  {
    matchId: 'NA1_5283746192',
    leagueOfGraphs: 'https://www.leagueofgraphs.com/match/na/5283746192'
  },
  {
    matchId: 'NA1_5283612847',
    leagueOfGraphs: 'https://www.leagueofgraphs.com/match/na/5283612847'
  },
  ...
]
```

## Configuration Options

The `getSharedMatchIds` function accepts an options object:

| Option | Default | Description |
|--------|---------|-------------|
| `maxPages` | `10` | Maximum number of pages to fetch per player |
| `pageSize` | `100` | Number of matches per API page (max 100) |

```js
const sharedMatches = await getSharedMatchIds(
  "player1#TAG",
  "player2#TAG",
  { maxPages: 5, pageSize: 100 }
);
```

## Project Structure

```
riotmatch/
├── src/
│   ├── index.js                          # CLI entry point
│   ├── api/
│   │   └── riot.client.js                # Riot API client (account + match endpoints)
│   ├── services/
│   │   ├── account.service.js            # Riot ID → PUUID resolution
│   │   ├── match.service.js              # Paginated match history fetching
│   │   └── sharedMatches.service.js      # Shared match intersection logic
│   └── utils/
│       └── matchLinks.js                 # Match ID → League of Graphs URL generator
├── .env                                  # API key (git-ignored)
├── .gitignore
└── package.json
```

## How It Works

1. **Resolve Riot IDs** — converts each `Name#TAG` to a PUUID via the Riot Account API
2. **Fetch match histories** — paginates through each player's League match list
3. **Intersect** — finds match IDs that appear in both players' histories
4. **Generate links** — maps each shared match ID to a League of Graphs URL

## API Endpoints Used

| Endpoint | Purpose |
|----------|---------|
| `GET /riot/account/v1/accounts/by-riot-id/{name}/{tag}` | Resolve Riot ID to PUUID |
| `GET /lol/match/v5/matches/by-puuid/{puuid}/ids` | Fetch League match history |

Both endpoints are routed through the `americas` regional host.

## Supported Regions

| Riot Region | League of Graphs Region |
|-------------|------------------------|
| NA1 | na |
| EUW1 | euw |
| EUN1 | eune |
| KR | kr |
| JP1 | jp |
| BR1 | br |
| LA1 | lan |
| LA2 | las |
| OC1 | oce |
| RU | ru |
| TR1 | tr |

## Getting a Riot API Key

1. Sign in at [developer.riotgames.com](https://developer.riotgames.com/)
2. Your **Development API Key** is shown on the dashboard (regenerate if expired)
3. For long-term use, register a project and apply for a **Personal** or **Production** key

## License

ISC
