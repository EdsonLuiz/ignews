import {signIn, useSession} from 'next-auth/client'
import { api } from '../../services/http'
import { getStripeJs } from '../../services/stripe-js'
import styles from './styles.module.scss'

type Props = {
  priceId: string
}

export function SubscribeButton({priceId}: Props) {
  const [session] = useSession()

  async function handleClick() {
    if(!session) {
      signIn('github')
      return
    }

    try {
      const response = await api.post('/subscribe')
      const {sessionId} = response.data
      const stripe = await getStripeJs()
      await stripe?.redirectToCheckout({sessionId})
    } catch (error) {
      alert(error.message)
    }

  }
  return (
    <button className={styles.subscribeButton} 
            type="button"
            onClick={handleClick}>
      Subscribe now
    </button>
  )
}