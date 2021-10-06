import type { NextPage } from 'next'
import Img from 'next/image'
import Head from 'next/head'
import styles from '../styles/home.module.scss'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>ig.news | Home</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>
            News about<br />
            the <span className={styles.highlight}>React</span> world
          </h1>
          <p className={styles.subtitle}>
            Get acess to all the publications <br />
            <span className={`${styles.highlight} ${styles.highlightPrice}`}>for $9.90 month</span>
          </p>
        </section>
        <Img src="/images/avatar.svg" alt="Girls coding" width="334" height="520" />
      </main>
    </>
  )
}

export default Home
