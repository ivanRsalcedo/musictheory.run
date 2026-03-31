import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from './firebase'

export async function ensureUserDocument(user) {
    if (!user) {
        return
    }
    const userRef = doc(db, 'users', user.uid)
    const userSnapshot = await getDoc(userRef)

    if (!userSnapshot.exists()) {
        await setDoc(userRef, {
            email: user.email || '',
            displayName: user.displayName || '',
            createdAt: serverTimestamp(),
            lastLoginAt: serverTimestamp(),
        })
        return
    }

    // params: where, what, options
    await setDoc(userRef, { lastLoginAt: serverTimestamp() }, { merge: true })

}