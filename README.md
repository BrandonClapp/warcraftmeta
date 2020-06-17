# WarcraftMeta

### What is this?

https://warcraftmeta.com is a project for helping new and returning players to World of Warcraft choose a class based on preferred playstyle and overall performance in different aspects of the game.

### What is "Meta"

Meta is an acronym that stands for "most effective tactics available". "Meta" refers to what top rated players in a competitive setting are doing, since their tactics reflect the most effective way to reach the tops of the competitive leaderboards.

### What data is this based off of?

Data from the top echelon of players is gathered at the end of each week, once players have had a chance to perform in their choice of content. At the end of the week, before the weekly realm reset, data is gathered for...

- The top 1000 players in the 2v2 PvP Arena bracket.
- The top 1000 players in the 3v3 PvP Arena bracket.
- All players from every realm for every +20 or greater Mythic Keystone dungeon.
- Raiding data coming soon.

### How are meta tiers calculated?

Based on the population sample mentioned above, _each spec in a given role_ is given a tier based on the representation makeup for that. Specs that are more frequently found in the data will be given a higher/better tier, while specs that are less frequently found in the data will be given a lower/worse tier.

The mean for a role is calculated based on the total specs in the game that are able to perform that role. For example, there are 6 total healer specs in the game, and as such would mean that in a perfect world where every class was equally represented, we would see 16.66% (repeating, of course). This number represents the mean and will be different for each role, since the total number of specs for each role differ.

The percentage makeup of a spec is compared to the mean as such...

- S-Tier: if the percentage makeup is greater than **mean + (mean / 2) + (mean / 4)**
- A-Tier: if the percentage makeup is between **mean + (mean / 2)** and S-Tier
- B-Tier: if the percentage makeup is between **mean - (mean / 2)** and A-Tier
- C-Tier: if the percentage makeup is between **mean + (mean/2) - (mean / 4)** and B-Tier
- D-Tier: if the percentage makeup is less than **mean + (mean/2) - (mean / 4)**
