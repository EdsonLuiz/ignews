import {GetStaticProps} from 'next'
import Img from 'next/image'
import Head from 'next/head'
import styles from '../styles/home.module.scss'
import { SubscribeButton } from '../components/SubscribeButton'
import { stripe } from '../services/stripe'


type Product = {
  priceId: string;
  amount: number;
}

type HomeProps = {
  product: Product
}


export default function Home({product}: HomeProps) {
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
            <span className={`${styles.highlight} ${styles.highlightPrice}`}>
              for {product.amount} month
            </span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>
        <Img src="/images/avatar.svg" alt="Girls coding" width="334" height="520" />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1JhczKAWlvJPQ0yWk6m8avgk')

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price.unit_amount! / 100)
  }

  return {
    props: {product},
    revalidate: 60 * 60 * 24 // 24 hours 
  }
}