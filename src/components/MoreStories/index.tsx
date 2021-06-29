import { PostPreview } from '../PostPreview';

import { IncrementedPostType } from '@/types/IncrementedPostType';

import styles from './styles.module.scss';

type Props = {
  posts: IncrementedPostType[]
}

export function MoreStories({ posts }: Props) {
  return (
    <section className={styles.moreStoriesContainer}>
      <h2>
        More Stories
      </h2>
      <div>
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.isoDate}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
          />
        ))}
      </div>
    </section>
  );
};
