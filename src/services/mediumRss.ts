import Parser from 'rss-parser';

import { slugify } from '@/utils/remove-accents';

import { FeedType } from '@/types/FeedType';
import { PostType } from '@/types/PostType';
import { IncrementedPostType } from '@/types/IncrementedPostType';
import { AuthorType } from '@/types/AuthorType';

function convertTitleToSlug(title: string) {
  const slug = slugify(title)
    .toLocaleLowerCase()
    .replace(/[^a-z0-9\s]/gi, '')
    .split(' ')
    .join('-');

  return slug;
}

function getSubtitleFromContentEncoded(content: string) {
  const indexOfH4TagOpen = content.lastIndexOf('<h4>');
  const indexOfH4TagClose = content.indexOf('</h4>');

  const subtitle = content.substring(indexOfH4TagOpen + 4, indexOfH4TagClose);

  return subtitle;
}

function getCoverSrcFromContentEncoded(content: string) {
  const indexOfAltText = content.indexOf('alt="Cover"');

  const substringBeforeAltText = content.substring(0, indexOfAltText);
  const substringAfterAltText = content.substring(indexOfAltText, content.length);

  const indexOfCoverImagTagOpen = substringBeforeAltText.lastIndexOf('<img');
  const indexOfCoverImagTagClose = substringAfterAltText.indexOf('/>') + substringBeforeAltText.length;

  const coverImage = content.substring(indexOfCoverImagTagOpen, indexOfCoverImagTagClose);

  const regex = /<img.*?src="(.*?)"/;
  const src = regex.exec(coverImage)[1];

  return src;
}

async function getFeed() {
  const parser = new Parser<FeedType, PostType>();

  const feed = await parser.parseURL('https://comocodar.medium.com/feed');

  const { items, ...feedInfo } = feed;

  const feedWithSlug = {
    ...feedInfo,
    posts: items.map(post => ({
      ...post,
      slug: convertTitleToSlug(post.title),
      subtitle: getSubtitleFromContentEncoded(post['content:encoded']),
      coverImage: getCoverSrcFromContentEncoded(post['content:encoded']),
      author: {
        name: post.creator,
        picture: '/assets/blog/authors/comocodar.png',
      },
      excerpt: post['content:encodedSnippet'].split('\n')[0],
    }))
  };

  return feedWithSlug;
}


type GetPostBySlugParams = {
  slug: string;
  fields: Array<keyof IncrementedPostType>;
}

async function getPostBySlug({ slug, fields }: GetPostBySlugParams) {
  const feed = await getFeed();
  
  const post = feed.posts.find(post => post.slug === slug);

  type Items = {
    [key: string]: string | string[] | AuthorType;
  }

  const items: Items = {};

  fields.forEach(field => {
    if (post[field]) {
      items[field] = post[field]
    }
  });

  return post;
}

async function getAllPostsSlug() {
  const feed = await getFeed();

  const slugs = feed.posts.map(post => post.slug);

  return slugs;
}

export default {
  getFeed,
  getPostBySlug,
  getAllPostsSlug,
}
