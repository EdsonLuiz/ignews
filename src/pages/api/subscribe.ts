import { NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { NextApiRequest } from "next-auth/internals/utils";
import { queryOnFauna, saveOnFauna } from "../../services/fauna";
import { stripeCreateCheckoutSession, stripeCreateStripeCustomer } from "../../services/stripe";

type User = {
  ref: {
    id: string
  }
  data: {
    stripe_customer_id: string
  }
}

const subscribe =  async (req: NextApiRequest, res: NextApiResponse) => {
  if(req.method === 'POST') {
    const session = await getSession({req})
    if(!session?.user?.email) {
      return
    }

    const userFromFaunaDb = await queryOnFauna<User>('user_by_email', session.user.email)

    let customerId = userFromFaunaDb.data.stripe_customer_id
    if(!customerId) {
      const stripeCustomer = await stripeCreateStripeCustomer({email: session.user.email})
      await saveOnFauna('users', userFromFaunaDb.ref.id, stripeCustomer.id)
      customerId = stripeCustomer.id
    }


    const stripeCheckoutSession = await stripeCreateCheckoutSession(customerId)

    return res.status(200).json({sessionId: stripeCheckoutSession.id})
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method not allowed')
  }
}

export default subscribe