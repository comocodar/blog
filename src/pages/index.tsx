import Head from 'next/head';
import { GetStaticProps } from 'next';

import { Layout } from '@/components/Layout';
import { HeroPost } from '@/components/HeroPost';
import { MoreStories } from '@/components/MoreStories';

import mediumRss from '@/services/mediumRss';

import { FeedType } from '@/types/FeedType';
import { IncrementedPostType } from '@/types/IncrementedPostType';

type HomeProps = {
  feed: FeedType & { posts: IncrementedPostType[] };
}

export default function Home({ feed }: HomeProps) {
  const { posts, ...feedDetails } = feed;
  const [heroPost, ...otherPosts] = posts;

  return (
    <Layout>
      <Head>
        <title>Home | Blog Como Codar</title>
      </Head>
      {heroPost && (
        <HeroPost
          title={heroPost.title}
          coverImage={heroPost.coverImage}
          date={heroPost.isoDate}
          author={{
            name: heroPost.creator,
            picture: '/assets/blog/authors/comocodar.png'
          }}
          slug={heroPost.slug}
          excerpt={heroPost.excerpt}
        />
      )}
      {otherPosts.length > 0 && <MoreStories posts={otherPosts} />}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const feed = await mediumRss.getFeed();

  return {
    props: {
      feed,
    },
    revalidate: 60 * 60 * 8,
  };
}