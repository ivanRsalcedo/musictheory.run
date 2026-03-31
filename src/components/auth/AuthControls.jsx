import { useState } from 'react'
import { signInWithGoogle, logOut } from '../../lib/auth'
import styles from './AuthControls.module.css'
import useAuth from '../../hooks/useAuth'

export default function AuthControls() {
    const { user, loading } = useAuth()
    const firstName = user?.displayName?.split(' ')[0] || user?.email?.split('@')[0] || 'Account'
    const [isSigningIn, setIsSigningIn] = useState(false)

    async function handleSignIn() {
        setIsSigningIn(true)

        try {
            await signInWithGoogle()
        } catch (error) {
            alert(error.message || 'Sign-in failed.')
        } finally {
            setIsSigningIn(false)
        }
    }

    async function handleSignOut() {
        try {
            await logOut()
        } catch (error) {
            alert(error.message || 'Sign-out failed.')
        }
    }

    if (loading) {
        return null
    }

    if (!user) {
        return (
            <div className={styles.wrapper}>
                <button
                    type='button'
                    className={styles.button}
                    onClick={handleSignIn}
                    disabled={isSigningIn}>
                    {isSigningIn ? 'Signing in...' : 'Rutgers sign in'}
                </button>
            </div>
        )
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.auth}>
                <span className={styles.identity}>{firstName}</span>
                <span className={styles.dot}>·</span>
                <button
                    type='button'
                    className={styles.signOut}
                    onClick={handleSignOut}
                >
                    Logout
                </button>
            </div>
        </div>
    )
}