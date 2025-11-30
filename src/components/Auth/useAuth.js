import { useState, useEffect } from 'react'
import { 
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile
} from 'firebase/auth'
import { auth } from '../../firebase'

export const useAuth = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Always have a usable username
  const username = user?.displayName || user?.email?.split('@')[0] || null

  const googleProvider = new GoogleAuthProvider()

  // ========================= GOOGLE LOGIN =========================
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const user = result.user

      const isNewUser = result?._tokenResponse?.isNewUser

      if (isNewUser) {
        // Optional: set display name if missing
        await updateProfile(user, {
          displayName: user.displayName || user.email.split('@')[0]
        })
      }

      return { success: true, user, isNewUser }

    } catch (error) {
      console.error('Google sign-in error:', error)

      let errorMessage = 'Failed to sign in with Google'

      if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Sign-in was cancelled'
      } else if (error.code === 'auth/popup-blocked') {
        errorMessage = 'Popup was blocked by your browser'
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = 'Network error. Please check your connection.'
      }

      return { success: false, error: errorMessage }
    }
  }

  // ========================= LOGOUT =========================
  const logout = async () => {
    try {
      await signOut(auth)
      return { success: true }
    } catch (error) {
      console.error('Logout error:', error)
      return { success: false, error: 'Failed to logout' }
    }
  }

  // ========================= AUTH STATE =========================
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  return {
    user,
    username,
    loading,
    loginWithGoogle,
    logout
  }
}
