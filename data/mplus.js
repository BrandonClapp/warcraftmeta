const fetch = require("node-fetch");
const dotenv = require("dotenv");
const _ = require("lodash");
dotenv.config();

const credentials = {
  client: {
    id: process.env.CLIENT_ID,
    secret: process.env.CLIENT_SECRET,
  },
  auth: {
    tokenHost: "https://us.battle.net",
  },
};

const { ClientCredentials } = require("simple-oauth2");

let token = "";
async function getToken() {
  if (!token) {
    console.log("Getting a token");
    const client = new ClientCredentials(credentials);
    try {
      const response = await client.getToken();
      token = response.token.access_token;
    } catch (error) {
      console.log("Error getting access token", error.message);
    }
  }

  return token;
}

async function getDungeons() {
  const url = `https://us.api.blizzard.com/data/wow/mythic-keystone/dungeon/index?namespace=dynamic-us&locale=en_US&access_token=${await getToken()}`;
  console.log(url);
  const response = await (await fetch(url)).json();
  const keys = response.dungeons.map((d) => {
    return {
      id: d.id,
      name: d.name,
    };
  });
  return keys;
}

async function getCurrentWeek() {
  const url = `https://us.api.blizzard.com/data/wow/mythic-keystone/period/index?namespace=dynamic-us&locale=en_US&access_token=${await getToken()}`;
  console.log(url);
  const response = await (await fetch(url)).json();
  const periods = response.periods.map((p) => p.id);
  const latest = periods.reverse()[0];
  return latest;
}

async function getSpecs() {
  const specs = [
    { id: 62, name: "Arcane", class: "Mage" },
    { id: 63, name: "Fire", class: "Mage" },
    { id: 64, name: "Frost", class: "Mage" },
    { id: 65, name: "Holy", class: "Paladin" },
    { id: 66, name: "Protection", class: "Paladin" },
    { id: 70, name: "Retribution", class: "Paladin" },
    { id: 71, name: "Arms", class: "Warrior" },
    { id: 72, name: "Fury", class: "Warrior" },
    { id: 73, name: "Protection", class: "Warrior" },
    { id: 102, name: "Balance", class: "Druid" },
    { id: 103, name: "Feral", class: "Druid" },
    { id: 104, name: "Guardian", class: "Druid" },
    { id: 105, name: "Restoration", class: "Druid" },
    { id: 250, name: "Blood", class: "Death Knight" },
    { id: 251, name: "Frost", class: "Death Knight" },
    { id: 252, name: "Unholy", class: "Death Knight" },
    { id: 253, name: "Beast Mastery", class: "Hunter" },
    { id: 254, name: "Marksmanship", class: "Hunter" },
    { id: 255, name: "Survival", class: "Hunter" },
    { id: 256, name: "Discipline", class: "Priest" },
    { id: 257, name: "Holy", class: "Priest" },
    { id: 258, name: "Shadow", class: "Priest" },
    { id: 259, name: "Assassination", class: "Rogue" },
    { id: 260, name: "Outlaw", class: "Rogue" },
    { id: 261, name: "Subtlety", class: "Rogue" },
    { id: 262, name: "Elemental", class: "Shaman" },
    { id: 263, name: "Enhancement", class: "Shaman" },
    { id: 264, name: "Restoration", class: "Shaman" },
    { id: 265, name: "Affliction", class: "Warlock" },
    { id: 266, name: "Demonology", class: "Warlock" },
    { id: 267, name: "Destruction", class: "Warlock" },
    { id: 268, name: "Brewmaster", class: "Monk" },
    { id: 269, name: "Windwalker", class: "Monk" },
    { id: 270, name: "Mistweaver", class: "Monk" },
    { id: 577, name: "Havoc", class: "Demon Hunter" },
    { id: 581, name: "Vengeance", class: "Demon Hunter" },
  ];

  return specs;
  // const url = `https://us.api.blizzard.com/data/wow/playable-specialization/index?namespace=static-us&locale=en_US&access_token=${await getToken()}`;
  // const response = await (await fetch(url)).json();
  // const specs = response.character_specializations.map((s) => {
  //   console.log("s", s);
  //   return {
  //     id: s.id,
  //     name: s.name,
  //   };
  // });
  // return specs;
}

async function getConnectedRealms() {
  const url = `https://us.api.blizzard.com/data/wow/connected-realm/index?namespace=dynamic-us&locale=en_US&access_token=${await getToken()}`;
  console.log(url);
  const response = await (await fetch(url)).json();
  const connectedRealms = response.connected_realms.map((cr) => {
    const id = cr.href.match(/connected-realm\/(\d*)/)[1];
    return parseInt(id, 10);
  });
  return connectedRealms;
}

async function getLeaderboard(connectedRealm, dungeonId, periodId) {
  const url = `https://us.api.blizzard.com/data/wow/connected-realm/${connectedRealm}/mythic-leaderboard/${dungeonId}/period/${periodId}?namespace=dynamic-us&locale=en_US&access_token=${await getToken()}`;
  console.log(url);
  const response = await (await fetch(url)).json();
  const players = response.leading_groups
    .filter((g) => {
      return g.keystone_level >= 20;
    })
    .map((g) => {
      const members = g.members.map((m) => {
        return {
          name: m.profile.name,
          spec: m.specialization.id,
          realm: m.profile.realm.slug,
        };
      });
      return members;
    })
    .reduce((acc, curr) => {
      acc = acc.concat(curr);
      return acc;
    }, []);

  const uniquePlayers = _.uniqWith(players, _.isEqual);
  return uniquePlayers;
}

async function aggregateMplus() {
  const currentWeek = await getCurrentWeek();
  const specs = await getSpecs();

  let dungeons = await getDungeons();
  let connectedRealms = await getConnectedRealms();

  // connectedRealms = connectedRealms.slice(1, 3);
  // dungeons = dungeons.slice(1, 3);

  // console.log("subsets", connectedRealms, dungeons);

  const leaderboards = [];
  for (let i = 0; i < connectedRealms.length; i++) {
    const cRealm = connectedRealms[i];

    for (let j = 0; j < dungeons.length; j++) {
      const dungeonId = dungeons[j].id;
      // await timeout(200);
      const leaderboard = await getLeaderboard(cRealm, dungeonId, currentWeek);
      leaderboards.push(leaderboard);
    }
  }

  // _.uniqWith(objects, _.isEqual);

  const leaderboardPlayers = _.uniqWith(
    _.flattenDeep(leaderboards).map((p) => {
      const spec = specs.find((s) => s.id === p.spec);

      return {
        name: p.name,
        spec: spec.name,
        class: spec.class,
        realm: p.realm,
      };
    }),
    _.isEqual
  );

  // console.log("leaderboards", JSON.stringify(leaderboardPlayers));
  return leaderboardPlayers;
}

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = {
  aggregateMplus,
};
