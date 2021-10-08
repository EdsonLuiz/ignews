import {signIn, useSession} from 'next-auth/client'
import styles from './styles.module.scss'

type Props = {
  priceId: string
}

export function SubscribeButton({priceId}: Props) {
  const [session] = useSession()

  function handleClick() {
    if(!session) {
      signIn('github')
      return
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