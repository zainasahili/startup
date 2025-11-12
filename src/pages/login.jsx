import React, { useState, useEffect } from 'react';

export function Login() {
  const [loginMessage, setLoginMessage] = useState('');
  const [registerMessage, setRegisterMessage] = useState('');
  const [username, setUsername] = useState('');

  async function handleLogin(event){
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({username, password}),
      });

      const data = await res.json();

      if (!res.ok) {
        setLoginMessage(data.message || 'Login failed');
        return;
      }

      setUsername(data.username);
      setLoginMessage(`Welcome Back, ${data.username}!`);
    } catch (err) {
      console.error('Loging Error', err);
      setLoginMessage('Error connecting to server');
    }
  }

  async function handleRegister(event){
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({username, password}),
      });

      const data = await res.json();

      if (!res.ok) {
        setRegisterMessage(data.message || 'Registeration failed');
        return;
      }

      setRegisterMessage(`Account created for ${username}. You can now log in!`);

    } catch (err) {
      console.error('Registeration Error', err);
      setRegisterMessage('Error connecting to server');
    }
  }
  async function handleLogout() {
    try {
      const res = await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include',
      });

      const data = await res.json();
      setUsername('');
      setLoginMessage(data.message);
    } catch (err) {
      console.error('Logout error:', err);
      setLoginMessage('Error logging out.');
    }
  }

  return (
    <main>
      {!username? (
        <>
          <section>
            <h2>Login</h2>
            <form id="login-from" onSubmit={handleLogin}>   
                <label htmlFor="l-user">Username</label>
                <input id="l-user" name="username" placeholder="Your username" required />
                <label htmlFor="l-password">Password</label>
                <input id="l-password" name="password" type="password" placeholder="password" required />
                <button type="submit">Login</button>
            </form>
            <p>{loginMessage}</p>
      </section>
      <p>Don't have an account? Register below!</p>
      <section>
            <h2>Register</h2>
            <form id="register-form" onSubmit={handleRegister}>   
                <label htmlFor="r-username">Userame</label>
                <input id="r-username" name="username" placeholder="Your username" required />
                <label htmlFor="r-password">Password</label>
                <input id="r-password" name="password" type="password" placeholder="new password" required />
                <button type="submit">Create account</button>
            </form>
            <p>{registerMessage}</p>
        </section>
        </>
      ): (
        <section>
          <h2>Welcome, {username}!</h2>
          <button style={{width: "20%"}} onClick={handleLogout}>Logout</button>
          <p>{loginMessage}</p>
        </section>
      )}
    </main>
  );
}
