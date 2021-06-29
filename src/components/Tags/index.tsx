import styles from './styles.module.scss';

type Props = {
  tags: string[];
}

export function tags({ tags }: Props) {
  return (
    <div className={styles.tagsContainer}>
      {tags.map(tag => (
        <span>{tag}</span>
      ))}
    </div>
  );
}