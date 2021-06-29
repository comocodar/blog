import styles from './styles.module.scss';

export function Loading() {
  return (
    <div className={styles.loadingContainer}>
      <h1>Loading...</h1>
    </div>
  );
}