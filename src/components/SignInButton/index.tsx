import {signIn, signOut, useSession} from 'next-auth/client'
import {FaGithub} from 'react-icons/fa'
import {FiX} from 'react-icons/fi'
import styles from './styles.module.scss'

export function SignInButton() {
  const [session] = useSession()
  const isUserLoggedIn = false

  const buttonMetadata = session 
    ? {message: session.user?.name, color: '#84d361'} 
    : {message: 'Sign in with github', color: '#eba417'}

  function handleClick() {
    if(session) {
      signOut()
      return
    }
    signIn('github')
  }
  
  return (
    <button type="button"
            onClick={handleClick}
            className={styles.signInButton}>
      <FaGithub color={buttonMetadata.color} />
      {buttonMetadata.message} 
      {session && (
        <FiX color="#737380" className={styles.closeIcon} />
      )}
    </button>
  )
}