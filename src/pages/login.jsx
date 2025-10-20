import React, { useState, useEffect } from 'react';

export function Login() {
  const [loginMessage, setLoginMessage] = useState('');
  const [registerMessage, setRegisterMessage] = useState('');

  function handleLogin(event){
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    const users = JSON.parse(localStorage.getItem('user'));

    if (users && users.username === username && users.password === password) {
      localStorage.setItem('loggedInUser', users.username);
      setLoginMessage(`Welcome back, ${users.username}!`);
    } else {
      setLoginMessage('Invalid username or password.');
    }
  }

  function handleRegister(event){
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const existingUser = users.find((u) => u.username === username);

    if (existingUser) {
      setRegisterMessage(`Username "${username}" already exists. Please choose another.`);
      return;
    }

    const newUser = { username, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    setRegisterMessage(`Account created for ${username}. You can now log in!`);
  }
  return (
    <main >
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
                <label htmlFor="r-email">email</label>
                <input id="r-email" name="email" placeholder="Your email" required />
                <label htmlFor="r-password">Password</label>
                <input id="r-password" name="password" type="password" placeholder="new password" required />
                <button type="submit">Create account</button>
            </form>
            <p>{registerMessage}</p>
        </section>
    </main>
  );
}