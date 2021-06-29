import { useRouter } from 'next/router';
import ErrorPage from 'next/error';

import { Layout } from '@/components/Layout';
import { Loading } from '@/components/Loading';
import { PostHeader } from '@/components/PostHeader';
import { PostBody } from '@/components/PostBody';

import Head from 'next/head'

import { useFetch } from "@/lib/fetcher";
import mediumRss from "@/services/mediumRss";

import { IncrementedPostType } from '@/types/IncrementedPostType';

import styles from './post.module.scss';

type Props = {
  post: IncrementedPostType
  morePosts: IncrementedPostType[]
  preview?: boolean
}

const Post = ({ post, morePosts, preview }: Props) => {
  const router = useRouter()
  if (!router.isFallback && !post.slug) {
    return <ErrorPage statusCode={404} />
  }

  const { data } = useFetch(`/api/page-views?id=${post.slug}`);

  return (
    <Layout>
      {router.isFallback ? (
        <Loading />
      ) : (
        <section className={styles.postContainer}>
          <aside />
          <article>
            <Head>
              <title>
                {post.title} | Blog da Como Codar
              </title>
              <meta property="og:image" content={post.coverImage} />
              <meta name="keywords" content={post.categories.join(', ')} />
            </Head>
            <PostHeader
              title={post.title}
              subtitle={post.subtitle}
              date={post.isoDate}
              author={post.author}
              views={data?.total}
            />
            <PostBody content={post['content:encoded']} />
          </article>
          <aside />
        </section>
        
      )}
    </Layout>
  )
}

export default Post

type Params = {
  params: {
    slug: string
  }
}

export async function getStaticProps({ params }: Params) {
  const post = await mediumRss.getPostBySlug({
    slug: params.slug,
    fields: [
      'slug',
      'subtitle',
      'coverImage',
      'content:encoded',
      'creator',
      'isoDate',
      'categories',
    ],
  });

  return {
    props: {
      post,
    },
  }
}

export async function getStaticPaths() {
  const slugs = await mediumRss.getAllPostsSlug();

  return {
    paths: slugs.map(slug => ({
      params: {
        slug,
      },
    })),
    fallback: false,
  };
}
