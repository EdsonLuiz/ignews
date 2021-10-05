import Img from 'next/image'
import styles from './styles.module.scss'

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Img src="/images/logo.svg" alt="ig news" width="110" height="31" />
        <nav className={styles.navigation}>
          <a className={styles.active}>Home</a>
          <a >Posts</a>
        </nav>
      </div>
    </header>
  )
}