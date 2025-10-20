import React, { useState, useEffect } from 'react';

export function Login() {
  
  return (
    <main >
      <section>
            <h2>Login</h2>
            <form id="login-from">   
                <label htmlFor="l-user">Username</label>
                <input id="l-user"name="username" placeholder="Your username" required />
                <label htmlFor="l-password">Password</label>
                <input id="l-password"name="password" type="password" placeholder="password" required />
                <button type="submit">Login</button>
            </form>
      </section>
      <p>Don't have an account? Register below!</p>
      <section>
            <h2>Register</h2>
            <form id="register-form">   
                <label htmlFor="r-name">Userame</label>
                <input id="r-name"name="name" placeholder="Your username" required />
                <label htmlFor="r-email">email</label>
                <input id="r-email"name="email" placeholder="Your email" required />
                <label htmlFor="r-password">Password</label>
                <input id="r-password"name="password" type="password" placeholder="new password" required />
                <button type="submit">Create account</button>
            </form>
        </section>
    </main>
  );
}