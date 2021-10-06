import styles from './styles.module.scss'

type Props = {
  priceId: string
}

export function SubscribeButton({priceId}: Props) {
  return (
    <button className={styles.subscribeButton} type="button">
      Subscribe now
    </button>
  )
}