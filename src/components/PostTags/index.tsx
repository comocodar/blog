import styles from './styles.module.scss';

type Props = {
  tags: string[];
}

export function PostTags({ tags }: Props) {
  return (
    <div className={styles.tagsContainer}>
      {tags.map(tag => (
        <span key={tag}>{tag}</span>
      ))}
    </div>
  );
}