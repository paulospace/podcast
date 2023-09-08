import { XMLParser } from "fast-xml-parser";

const CORS_PROXY_URL = "https://cors-proxy-pink.vercel.app/api/corsProxy";
const ITUNES_SEARCH_URL = "https://itunes.apple.com/search";

const fetchPodcastFeedRSS = async (feedURL) => {
  const xmlParserOptions = {
    ignoreAttributes: false,
  };
  const xmlParser = new XMLParser(xmlParserOptions);

  // some rss feeds have CORS so wrap the request into a cors proxy
  const url = `${CORS_PROXY_URL}?url=${feedURL}`;

  try {
    const res = await fetch(url)
      .then((data) => data.text())
      .then((data) => xmlParser.parse(data));

    return parsePodcastFeed(res.rss.channel, feedURL);
  } catch (error) {
    return error;
  }
};

const fetchItunesSearchPodcast = async (query) => {
  const itunesURL = new URL(`${ITUNES_SEARCH_URL}?term=${query}&media=podcast`);
  const res = await (await fetch(itunesURL)).json();

  return res;
};

export const stringToHex = (string) => {
  let hex,
    result = "";

  for (var i = 0; i < string.length; i++) {
    hex = string.charCodeAt(i).toString(16);
    result += hex;
  }

  return result;
};

export const parsePodcastFeed = (rss, url) => {
  const feed = {
    id: stringToHex(rss.title),
    title: rss.title,
    description: rss.description,
    copyright: rss.copyright,
    image: rss.image,
    link: rss.link,
    author: rss["itunes:owner"]["itunes:name"] || null,
    episodes: [],
    url: url,
  };

  let episodes = rss.item.toReversed();
  episodes.forEach((item, i) => {
    feed.episodes[i] = parsePodcastEpisode(item, url, i);
  });

  return feed;
};

const parsePodcastEpisode = (item, podcastUrl, id) => {
  const episode = {
    id: stringToHex(item.guid["#text"]),
    title: item.title,
    description: item.description,
    content: item.enclosure,
    image: item["itunes:image"]["@_href"] || null,
    pubDate: item.pubDate,
    explicit: item["itunes:explicit"] == "yes" ? true : false,
    time: item["itunes:duration"] || null,
    url: `/podcast?url=${podcastUrl}&ep=${id}`,
  };

  return episode;
};

export { fetchPodcastFeedRSS, fetchItunesSearchPodcast };
