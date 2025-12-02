import "dotenv/config";
import { GraphQLClient } from "graphql-request";
import { gql } from "graphql-request";
import getExtendedData from "./lib/getExtendedData.js";
import customFilters from "./lib/customFilters.js";
import fs from "fs";
import chalk from "chalk";
import prettier from "prettier";

const { HASURA } = process.env;
const endpoint = `https://hasura.dsgn.it/v1/graphql`;

const initialYear = 2006;

export const client = await new GraphQLClient(endpoint, {
  headers: {
    "x-hasura-admin-secret": HASURA,
  },
});

export const topArtistsQuery = gql`
  query getTopArtists($year: Int!) {
    music_adventcalendar(args: { year: $year }) {
      artist
      count
      track
      image
    }
  }
`;

async function fetch(year, prev) {
  const { music_adventcalendar: data } = await client.request(topArtistsQuery, {
    year,
  });

  return getExtendedData(customFilters(data, prev));
}

(async () => {
  let prev = [];
  const all = [];
  for (let year = initialYear; year <= new Date().getFullYear(); year++) {
    console.log(chalk.hex(`#ff0`)(year));
    const fileName = `./src/data/${year}.json`;
    let data;
    if (!fs.existsSync(fileName)) {
      data = await fetch(year, prev);
    } else {
      data = await import(`../${fileName}`, {
        with: { type: "json" },
      });

      data = data.default.reverse();
    }

    data = data.map(({ id, title, artist, video, palette }) => ({
      id,
      title,
      artist,
      video,
      palette,
    }));

    prev = data;

    fs.writeFileSync(
      fileName,
      prettier.format(JSON.stringify(data.reverse()), {
        parser: "json",
        tabWidth: 4,
      }),
      "utf8"
    );
  }
})();
