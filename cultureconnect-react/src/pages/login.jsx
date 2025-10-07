import React from 'react';

export function Login() {
  return (
    <main className="container-fluid bg-secondary text-center">
      <section>
            <h2>Register</h2>
            <form id="register-from">   
                <label for="r-name">Userame</label>
                <input id="r-name"name="name" placeholder="Your username" required />
                <label for="r-email">email</label>
                <input id="r-email"name="email" placeholder="Your email" required />
                <label for="r-password">Password</label>
                <input id="r-password"name="password" placeholder="new password" required />
                <button type="submit">Create account (placeholder)</button>
            </form>
        </section>
        <section>
            <h2>Login</h2>
            <form id="login-from">   
                <label for="l-email">email</label>
                <input id="l-email"name="email" placeholder="Your email" required />
                <label for="l-password">Password</label>
                <input id="l-password"name="password" placeholder="password" required />
                <button type="submit">Login (placeholder)</button>
            </form>
        </section>
    </main>
  );
}