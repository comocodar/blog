import { Meta } from '../Meta';
import { Header } from '../Header';
import { Footer } from '../Footer';

import styles from './styles.module.scss';

type Props = {
  children: React.ReactNode;
}

export function Layout({ children }: Props) {
  return (
    <>
      <Meta />
      <Header />
      <div className={styles.container}>
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
}
