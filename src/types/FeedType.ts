export type FeedType = {
  title: string;
  description: string;
  link: string;
  image: {
    url: string;
    title: string;
    link: string;
  };
  generator: string; 
  lastBuildDate: string;
  feedUrl: string;
  webMaster: string;
};
