import Link from 'next/link';
import Image from 'next/image';

import styles from './styles.module.scss';

type Props = {
  title: string
  src: string
  slug?: string
}

export function CoverImage({ title, src, slug }: Props) {
  const image = (
    <Image
      src={src}
      width={570}
      height={320}
      objectFit="cover"
      alt={`Cover Image for ${title}`}
    />
  );

  return (
    <div className={styles.coverImage}>
      {slug ? (
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  )
}
