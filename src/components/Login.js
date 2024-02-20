import React, { useRef, useState,useEffect } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

import './Login.css';


export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const linkStyle={
    textDecoration: 'none',color: isHovered ? 'black' : '#92e3a9',
  }
  useEffect(() => {
    document.body.className = 'login';
  }, []);
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);

      await login(emailRef.current.value, passwordRef.current.value);
          navigate('/dashboard');      
    } catch (error) {
      setError('Failed to log in');
    }

    setLoading(false);
  }

  return (
    <>
      <Card className="card" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)',boxShadow: '1px 16px 186px -44px rgba(0,0,0,0.4)',color:'#2f102c', 
      height: '400px', 
      width: '370px',
      borderRadius:'26px'
       }}>
        <Card.Body className='card-body' >
          <h2 className='text-center mb-4' style={{color:'#253439'}}>Login</h2>

          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit} style={{marginTop:'20px'}} >
            <Form.Group id="email">
              <Form.Label style={{color:'#273238'}}>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required className='input' style={{backgroundColor:'rgba(255,255,255,0.5)',color:'#969997'}}/>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label style={{color:'#273238'}}>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required style={{backgroundColor:'rgba(255,255,255,0.7)'}} />
            </Form.Group>
            <br /><br></br>
            <Button disabled={loading} className="w-100 button" type="submit" style={{backgroundColor:'#253439',border:'0',fontSize:'16px',color:'#dff7e7' }}>
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className=" text-center mt-2" style={{ color:'#616865',marginRight:'30px'}}>
        Need an account? <Link to="/signup" style={linkStyle}  onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}>Sign Up</Link>
      </div>
    </>
  );
}
