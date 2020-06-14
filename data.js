const fetch = require("node-fetch");
const cheerio = require("cheerio");
const _ = require("lodash");
const fs = require("fs").promises;

async function get3v3Bracket() {
  const response = await Promise.all([
    fetch("https://worldofwarcraft.com/en-us/game/pvp/leaderboards/3v3?page=1"),
    fetch("https://worldofwarcraft.com/en-us/game/pvp/leaderboards/3v3?page=2"),
    fetch("https://worldofwarcraft.com/en-us/game/pvp/leaderboards/3v3?page=3"),
    fetch("https://worldofwarcraft.com/en-us/game/pvp/leaderboards/3v3?page=4"),
    fetch("https://worldofwarcraft.com/en-us/game/pvp/leaderboards/3v3?page=5"),
    fetch("https://worldofwarcraft.com/en-us/game/pvp/leaderboards/3v3?page=6"),
    fetch("https://worldofwarcraft.com/en-us/game/pvp/leaderboards/3v3?page=7"),
    fetch("https://worldofwarcraft.com/en-us/game/pvp/leaderboards/3v3?page=8"),
    fetch("https://worldofwarcraft.com/en-us/game/pvp/leaderboards/3v3?page=9"),
    fetch(
      "https://worldofwarcraft.com/en-us/game/pvp/leaderboards/3v3?page=10"
    ),
  ]);
  return response;
}

async function parasePvpLeaderboardPage(page) {
  const html = await page.text();
  const $ = cheerio.load(html);

  const players = [];
  const rows = $(".SortTable-row");
  rows.each((i, row) => {
    const name = $(row).find(".Character-name").text();
    const character = $(row)
      .find(".Character-level")
      .text()
      .replace("120", "")
      .trim()
      .split(" ");
    const realm = $(row).find(".SortTable-col").eq(5).text();

    const spec = character[0];
    const klass = character.slice(1, character.length).join(" ");

    // console.log(name, spec, klass, realm);
    if (name) {
      players.push({
        spec: spec,
        class: klass,
        name: name,
        region: "US",
        realm: realm,
      });
    }
  });

  return players;
}

async function aggregatePvpBracket3() {
  const response3 = await get3v3Bracket();
  const threesPlayers = await Promise.all(
    response3.map(async (page) => {
      const players = await parasePvpLeaderboardPage(page);
      return players;
    })
  );

  const allThrees = _.flatten(threesPlayers);
  return allThrees;
}

async function writeData(threes) {
  const data = {
    pvp: {
      "3v3": threes,
    },
  };
  await fs.writeFile(
    __dirname + "/src/assets/data/test.json",
    JSON.stringify(data)
  );
}

(async () => {
  const threes = await aggregatePvpBracket3();
  // console.log(await pvp3page1.text());
  await writeData(threes);
})();
