import React, { useContext, useState, useEffect } from 'react';
import { auth, firestore } from '../firebase';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    function signup(email, password, name) {
        return auth.createUserWithEmailAndPassword(email, password)
            .then(async (userCredential) => {
                // After successful signup, send verification email
                await userCredential.user.sendEmailVerification();
                
                // Add user data to Firestore
                await addUserToFirestore(userCredential.user.uid, name, email);
                
                return userCredential.user;
            });
    }

    async function addUserToFirestore(userId, name, email) {
        try {
            const usersRef = firestore.collection('users');
            await usersRef.doc(userId).set({
                uid: userId,
                name: name,
                email: email,
            });
            console.log('User added to Firestore successfully');
        } catch (error) {
            console.error('Error adding user to Firestore:', error);
            throw error; // Rethrow the error to handle it appropriately
        }
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }

    function logout() {
        return auth.signOut();
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email);
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email);
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password);
    }

    useEffect(() => {
        const unsubcribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubcribe;
    }, []);

    const value = {
        currentUser,
        login,
        signup,
        logout,
        resetPassword,
        updateEmail,
        updatePassword
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
