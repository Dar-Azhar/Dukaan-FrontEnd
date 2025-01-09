import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { createContext, useState, useEffect, useContext } from 'react';
import { auth } from '../firebase/firebase.config';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    //Register user
    const registerUser = async (email, password) => {
        return await createUserWithEmailAndPassword(auth, email, password);
    }

    //Login user
    const loginUser = async (email, password) => {
        return await signInWithEmailAndPassword(auth, email, password);
    }

    //signIn with google
    const signInWithGoogle = async () => {
        const googleProvider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, googleProvider);
            // console.log("Google Sign-In successful!", result);
        } catch (error) {
            console.error("Google Sign-in failed!", error);
            if (error.code === 'auth/cancelled-popup-request') {
                alert("Google sign-in cancelled. Please close any other popups and try again.");
            } else if (error.code === 'auth/popup-blocked') {
                alert("Popup blocked. Please enable popups for this site and try again.");
            } else if (error.message.includes("Cross-Origin")) {
                alert("Cross-Origin error occurred. Please ensure your browser settings allow popups for this site.");
            } else {
                alert("An unknown error occurred during Google sign-in.");
            }
        }
    };


    // const signInWithGoogle = async () => {
    //     try {
    //         console.log("Starting Google Sign-In...");
    //         await signInWithGoogle();
    //         console.log("Google Sign-In successful!");
    //         alert("Login successful!");
    //         navigate("/");
    //     } catch (error) {
    //         console.error("Google Sign-in failed!", error); // Log the full error object
    //         if (error.code === 'auth/cancelled-popup-request') {
    //             alert("Google sign-in cancelled.  Please check your popup blocker.");
    //         } else {
    //             alert("Google sign in failed!");
    //         }
    //     }
    // };

    //Logout user
    const logoutUser = async () => {
        return await signOut(auth);
    }

    //manage user 
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);

            if (user) {

                const { email, displayName, photoURL } = user;
                const userData = {
                    email, username: displayName, photo: photoURL
                }
            }
        })

        return () => unsubscribe();
    }, [])

    const value = {
        currentUser,
        loading,
        registerUser,
        loginUser,
        signInWithGoogle,
        logoutUser
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}