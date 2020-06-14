const fetch = require("node-fetch");
const cheerio = require("cheerio");
const _ = require("lodash");
const fs = require("fs").promises;

async function getPvpBracket(bracket) {
  const urls = [];
  for (let page = 1; page <= 10; page++) {
    urls.push(
      `https://worldofwarcraft.com/en-us/game/pvp/leaderboards/${bracket}?page=${page}`
    );
  }

  const response = await Promise.all(
    urls.map((url) => {
      return fetch(url);
    })
  );
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

    let spec = character[0];
    let klass = character.slice(1, character.length).join(" ");

    if (spec === "Beast") spec = "Beast Mastery";
    if (klass === "Mastery Hunter") klass = "Hunter";

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

async function aggregatePvpBracket(bracket) {
  const responses = await getPvpBracket(bracket);
  const players = await Promise.all(
    responses.map(async (page) => {
      const players = await parasePvpLeaderboardPage(page);
      return players;
    })
  );

  const allPlayers = _.flatten(players);
  return allPlayers;
}

async function writeData(fileName, threes) {
  await fs.writeFile(
    __dirname + `/src/assets/data/${fileName}.json`,
    JSON.stringify(threes)
  );
}

(async () => {
  const threes = await aggregatePvpBracket("3v3");
  const twos = await aggregatePvpBracket("2v2");
  // console.log(await pvp3page1.text());
  await writeData("3v3", threes);
  await writeData("2v2", twos);
})();
