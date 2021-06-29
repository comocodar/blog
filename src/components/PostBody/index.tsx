import styles from './styles.module.scss';

type Props = {
  content: string
}

export function PostBody({ content }: Props) {
  return (
    <div
      className={styles.postBodyConrtainer}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}
