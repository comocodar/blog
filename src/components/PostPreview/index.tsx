import Link from 'next/link';

import { Avatar } from '../Avatar';
import { DateFormatter } from '../DateFormatter';
import { CoverImage } from '../CoverImage';
import { PostViews } from '../PostViews';

import { useFetch } from "@/lib/fetcher"
import { AuthorType } from '@/types/AuthorType';

import styles from './styles.module.scss';

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author: AuthorType;
  slug: string;
}

export function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) {

  const { data } = useFetch(`/api/page-views-preview?id=${slug}`, true);

  const views = data?.total;

  return (
    <div className={styles.postPreviewContainer}>
      <CoverImage slug={slug} title={title} src={coverImage} />      
      <div className={styles.postDescription}>
        <h3 className={styles.postTitle}>
          <Link as={`/posts/${slug}`} href="/posts/[slug]">
            <a>{title}</a>
          </Link>
        </h3>
        <div className={styles.postDetails}>
          <Avatar name={author.name} picture={author.picture} imageSize={24} />
          <DateFormatter dateString={date} />
          <div className={styles.dotSeparator} />
          <PostViews>{`${views >= 0 ? views : "..."} views`}</PostViews>
        </div>
        <p>{excerpt}</p>  
      </div>
    </div>
  )
}
