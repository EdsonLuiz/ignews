import { queryForFieldOnFauna, saveSubscriptionOnFauna, updateSubscriptionOnFauna } from "../../../services/fauna";
import { stripe } from "../../../services/stripe";

export async function saveSubscription(
  subscriptionId: string,
  customerId: string,
  createAction = false
) {
  // customerId is stripe_customer_id on FaunaDB

  const userRef = await queryForFieldOnFauna('user_by_stripe_customer_id', customerId, 'ref')

  const subscription = await stripe.subscriptions.retrieve(subscriptionId)

  const newSubscriptionData = {
    id: subscription.id,
    userId: userRef,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id
  }

  if(createAction) {
    await saveSubscriptionOnFauna('subscriptions', newSubscriptionData)
  } else {
    await updateSubscriptionOnFauna('subscription_by_id', subscriptionId, newSubscriptionData)
  }
  
}