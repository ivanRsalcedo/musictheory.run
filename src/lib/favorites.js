import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
import { db } from './firebase'

export async function getUserFavorites(user) {
    if (!user) {
        return []
    }

    const userRef = doc(db, 'users', user.uid)
    const userSnapshot = await getDoc(userRef)

    if (!userSnapshot.exists()) {
        return []
    }

    const userData = userSnapshot.data()
    return userData.favorites || []
}

export async function addFavorite(user, chordId) {
    if (!user || !chordId) {
        return
    }

    const userRef = doc(db, 'users', user.uid)

    await updateDoc(userRef, {
        favorites: arrayUnion(chordId),
    })
}

export async function removeFavorite(user, chordId) {
    if (!user || !chordId) {
        return
    }

    const userRef = doc(db, 'users', user.uid)

    await updateDoc(userRef, {
        favorites: arrayRemove(chordId),
    })
}