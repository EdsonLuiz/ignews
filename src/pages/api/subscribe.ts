import { NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { NextApiRequest } from "next-auth/internals/utils";
import { stripeCreateCheckoutSession, stripeCreateStripeCustomer } from "../../services/stripe";

const subscribe =  async (req: NextApiRequest, res: NextApiResponse) => {
  if(req.method === 'POST') {
    const session = await getSession({req})
    if(!session?.user?.email) {
      return
    }
    const stripeCustomer = await stripeCreateStripeCustomer({email: session.user.email})
    const stripeCheckoutSession = await stripeCreateCheckoutSession(stripeCustomer)

    return res.status(200).json({sessionId: stripeCheckoutSession.id})
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method not allowed')
  }
}

export default subscribe