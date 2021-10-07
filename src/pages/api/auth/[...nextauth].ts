import {query as q} from 'faunadb'
import NextAuth from "next-auth"
import Providers from "next-auth/providers"
import { FaUnderline } from 'react-icons/fa'
import {fauna} from '../../../services/fauna'

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      scope: 'read:user'
    }),
  ],
  jwt: {
    signingKey: process.env.JWT_SIGNING_PRIVATE_KEY as string,
  },
  callbacks: {
    async signIn(user, account, profile) {
      const {email} = user

      try {
        await fauna.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(
                  q.Index('user_by_email'),
                  q.Casefold(email as string)
                )
              )
            ), // Not
            q.Create(
              q.Collection('users'),
              {data: {email}}
            ), // Create
            q.Get(
              q.Match(
                q.Index('user_by_email'),
                q.Casefold(email as string)
              )
            ) // Get
          )
        )
        return true
      } catch (error) {
        return false
      }

    }
  }
})