import Prismic from '@prismicio/client'

const accessToken = process.env.PRISMIC_ACCESS_TOKEN
const apiEndpoint = process.env.PRISMIC_ENDPOINT ?? ''

export const prismicClient = Prismic.client(
  apiEndpoint, 
  { accessToken }
)