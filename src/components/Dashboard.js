import React, { useState, useEffect } from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';


export default function Dashboard() {
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState(''); // State to store the user's email
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.className = 'dashboard';
    async function fetchUserData() {
      const db = getFirestore();
      const usersCollection = collection(db, 'users');
      const q = query(usersCollection, where('uid', '==', currentUser.uid));

      try {
        const querySnapshot = await getDocs(q);

        if (querySnapshot.docs.length > 0) {
          const userData = querySnapshot.docs[0].data();
          setName(userData.name || '');
          setEmail(userData.email || '');
          
        } else {
          setError('User data not found');
        }
      } catch (error) {
        setError('Failed to fetch user data');
      }
    }

    fetchUserData();
  }, [currentUser.uid]);

  async function handleLogout() {
    setError('');
    try {
      await logout();
      navigate('/login');
    } catch {
      setError('Failed to logout');
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email: </strong> {email}
          <br />
          <strong>Name: </strong> {name}
          <br />
          
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  );
}
