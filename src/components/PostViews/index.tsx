import styles from './styles.module.scss';

type Props = {
  children?: React.ReactNode;
};

export function PostViews({ children }: Props) {
  return (
    <small className={styles.postViewsContainer}>{children}</small>
  );
};
