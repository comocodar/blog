import { Avatar } from '../Avatar';
import { DateFormatter } from '../DateFormatter'
import { CoverImage } from '../CoverImage';
import { PostViews } from "../PostViews";

import { AuthorType } from '@/types/AuthorType';

import styles from './styles.module.scss';

type Props = {
  title: string;
  subtitle: string;
  coverImage: string;
  slug: string;
  date: string;
  author: AuthorType;
  views: number;
}

export function PostHeader({ title, subtitle, coverImage, slug, date, author, views }: Props) {
  return (
    <>
      <header className={styles.postHeaderContainer}>
        <h1>{title}</h1>
        <h2>{subtitle}</h2>      
      </header>
      <div className={styles.postDetails}>
        <Avatar name={author.name} picture={author.picture} />
        <DateFormatter dateString={date} />
        <div className={styles.dotSeparator} />
        <PostViews>{`${views >= 0 ? views : "..."} views`}</PostViews>
      </div>
    </>
  );
}
