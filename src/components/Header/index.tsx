import Link from 'next/link';

import styles from './styles.module.scss';

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <img src="/assets/logo.svg" alt="Como Codar" />
      <h2>
        <Link href="/">
          <a>Como Codar - Blog</a>
        </Link>
      </h2>
      <nav className={styles.headerMenu}>
        <ul>
          <li>Home</li>
        </ul>
      </nav>
    </header>    
  )
}
