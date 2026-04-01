import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { auth } from './firebase'
import { ensureUserDocument } from './users'

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account",
});

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

    await ensureUserDocument(user)

    return user
}

export async function logOut() {
    await signOut(auth)
}