const data = require("./data.json");
const DECEMBER = 10;
const embedSize = video =>
  video.includes("bandcamp.com") ? { x: 340, y: 340 } : { x: 480, y: 270 };

function encode(r) {
  // eslint-disable-next-line no-control-regex
  return r.replace(/[\x26\x0A<>'"\s?()]/g, "");
}

const rss = (data, total, year) => `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:media="http://search.yahoo.com/mrss/" version="2.0">
  <channel>
      <title><![CDATA[24 Songs]]></title>
      <description><![CDATA[an advent calendar]]></description>
      <link>https://24songs.dsgn.it/</link>
      <image>
        <url>https://24songs.dsgn.it/logo96.png</url>
        <title>24 Songs</title>
        <link>https://24songs.dsgn.it/</link>
      </image>
      <generator>none</generator>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
      <atom:link href="https://24songs.dsgn.it/rss" rel="self" type="application/rss+xml" />
      <ttl>60</ttl>
      ${data.map(
        ({ title, artist, img, video }, i) => `<item>
          <title><![CDATA[${title} by ${artist}]]></title>
          <description></description>
          <link>https://24songs.dsgn.it/${year}/12/${total - i}</link>
          <guid isPermaLink="false">${encode(artist + title)}</guid>
          <dc:creator><![CDATA[cedmax]]></dc:creator>
          <pubDate>${new Date(year, 11, total - i).toUTCString()}</pubDate>
          <media:content url="https://24songs.dsgn.it/images/${img}" medium="image" />
          <content:encoded><![CDATA[<iframe width="${
            embedSize(video).x
          }" height="${embedSize(video).y}" src="${video.replace(
          "/watch?v=",
          "/embed/"
        )}?feature=oembed" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>]]></content:encoded>
      </item>`
      )}
  </channel>
</rss>
`;

exports.handler = async (event, context) => {
  let list;
  const now = new Date();
  let year = now.getFullYear();
  const month = now.getMonth();
  const day = now.getDate();

  const cloneData = { ...data };

  // current year available and current month Dec
  if (cloneData[year] && month === DECEMBER) {
    cloneData[year].length = day;
    list = cloneData[year];
  } else {
    year = year - 1;
    list = cloneData[year];
  }

  try {
    return {
      statusCode: 200,
      body: rss(list.reverse(), list.length, year)
    };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
};
