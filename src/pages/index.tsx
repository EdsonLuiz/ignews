import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/home.module.scss'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>ig.news | Home</title>
      </Head>
      <h1 className={styles.title}>Hello</h1>
    </>
  )
}

export default Home
