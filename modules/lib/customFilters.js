import slugify from "slugify";

const exclusions = [
  "locas-in-love-bushaltestelle-the-bus-stop-song",
  "the-beatles-revival-band-i-am-the-walrus-live",
];

const slugConfig = { remove: /[*+~./?()'"!:@#]/g };

export default function (data, prev) {
  data = data
    .map(item => ({
      id: (item.id =
        item.id ||
        `${slugify(item.artist, slugConfig)}-${slugify(
          item.track,
          slugConfig
        )}`.toLowerCase()),
      ...item,
    }))
    .filter(({ id }) => !exclusions.includes(id))
    .filter(item => !prev.find(i => i.id === item.id));

  data.length = 24;
  return data;
}
