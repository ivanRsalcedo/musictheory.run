import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { auth } from './firebase'

const provider = new GoogleAuthProvider()

function isRutgersEmail(email) {
    return email.endsWith('@rutgers.edu') || email.endsWith('@scarletmail.rutgers.edu')
}

export async function signInWithGoogle() {
    const result = await signInWithPopup(auth, provider)
    const user = result.user

    if (!user.email || !isRutgersEmail(user.email)) {
        await signOut(auth)
        throw new Error('Only Rutgers email addresses are allowed.')
    }

    return user
}

export async function logOut() {
    await signOut(auth)
}