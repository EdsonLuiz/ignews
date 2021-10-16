import { GetServerSideProps } from "next"
import { getSession } from "next-auth/client"
import Head from "next/head"
import { RichText } from "prismic-dom"
import { ParsedUrlQuery } from 'querystring'
import { prismicClient } from "../../services/prismic"
import styles from './post.module.scss'


interface IParams extends ParsedUrlQuery {
  slug: string
}

type Post =  {
  slug: string;
  title: string;
  content: string;
  updatedAt: string;
}

type PostProps ={
  post: Post
}

export default function Post({post}: PostProps) {
  const {content, slug, title, updatedAt} = post
  return (
    <>
      <Head>
        <title>{title} | ignews</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{title}</h1>
          <time>{updatedAt}</time>
          <div className={styles.postContent} dangerouslySetInnerHTML={{__html: content}} />
        </article>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({req, params}) => {
  const session = await getSession({req})
   const {slug} = params as IParams

   const response = await prismicClient.getByUID('post', slug, {})

   const post = {
     slug,
     title: RichText.asText(response.data.title),
     content: RichText.asHtml(response.data.content),
     updatedAt: new Date(response.last_publication_date as string).toLocaleDateString('pt-BR', {
       day: '2-digit',
       month: 'long',
       year: 'numeric'
     })
    }

  return {
    props: {post}
  }
}