import Img from 'next/image'
import { ActiveLink } from '../ActiveLink'
import { SignInButton } from '../SignInButton'
import styles from './styles.module.scss'

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Img src="/images/logo.svg" alt="ig news" width="110" height="31" />
        <nav className={styles.navigation}>
          <ActiveLink activeClassName={styles.active} href="/">
            <a>Home</a>
          </ActiveLink>
          <ActiveLink activeClassName={styles.active} href='/posts'>
            <a>Posts</a>
          </ActiveLink>
        </nav>
        <SignInButton />
      </div>
    </header>
  )
}