import { PostType } from './PostType';
import { AuthorType } from './AuthorType';

export type IncrementedPostType = PostType & {
  slug: string;
  subtitle: string;
  coverImage: string;
  author: AuthorType;
  excerpt: string;
};
