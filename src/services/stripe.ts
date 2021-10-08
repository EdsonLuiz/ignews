import Stripe from 'stripe'
import packageInfo from '../../package.json'

export const stripe = new Stripe(
  process.env.STRIPE_API_KEY as string,
  {
    apiVersion: '2020-08-27',
    appInfo: {
      name: 'ignews',
      version: packageInfo.version
    }
  }
)

type User = {
  email: string;
}

export async function stripeCreateStripeCustomer({email}: User){
  const stripeCustomer = await stripe.customers.create({
    email
  })
  return stripeCustomer
}

export async function stripeCreateCheckoutSession(stripeCustomerParam: Stripe.Response<Stripe.Customer>) {
  const checkoutSession = await stripe.checkout.sessions.create({
    customer: stripeCustomerParam.id,
    payment_method_types: ['card'],
    billing_address_collection: 'required',
    line_items: [
      {price: 'price_1JhczKAWlvJPQ0yWk6m8avgk', quantity: 1}
    ],
    mode: 'subscription',
    allow_promotion_codes: true,
    success_url: process.env.STRIPE_SUCCESS_URL as string,
    cancel_url: process.env.STRIPE_CANCEL_URL as string
  })

  return checkoutSession
}