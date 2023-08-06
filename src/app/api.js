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

    return res.rss.channel;
  } catch (error) {
    return {
      error: "could not fetch rss feed",
    };
  }
};

const fetchItunesSearchPodcast = async (query) => {
  const itunesURL = new URL(`${ITUNES_SEARCH_URL}?term=${query}&media=podcast`);
  const res = await (await fetch(itunesURL)).json();

  return res;
};

export { fetchPodcastFeedRSS, fetchItunesSearchPodcast };
