import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../CartContext";
import googleIcon from "../assets/google.png";
import emailIcon from "../assets/email.png";
import mockImage from "../assets/blg.png";
import pass from "../assets/padlock.png";
import user from "../assets/user.png";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const { login, user } = useCart(); // Move useCart to top level

  const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  console.log("Login API_BASE_URL:", API_BASE_URL);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Sending login payload:", { email, password });
    try {
      const success = await login(email, password);
      console.log("Login success:", success);
      console.log("User after login:", user); // Use the user from useCart
      console.log("Token in localStorage:", localStorage.getItem("token"));
      navigate("/");
    } catch (err) {
      console.error("Login error:", err.message);
      setError(err.message);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const payload = { username, email, password };
    console.log("Sending sign-up payload:", payload);
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Sign-up failed");

      // Auto-login after signup
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (err) {
      console.error("Sign-up error:", err);
      setError(err.message);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-side">
        <div className="my-form__wrapper">
          <div className="login-welcome-row">
            <h1>Welcome back 👏</h1>
          </div>
          <form
            className="my-form"
            onSubmit={isSignUp ? handleSignUp : handleLogin}
            aria-labelledby="login-title"
          >
            <fieldset>
              <div className="socials-row">
                <a
                  href="google"
                  title="Use Google"
                  aria-label="Log in with Google"
                >
                  <img src={googleIcon} alt="Google" />
                  Log in with Google
                </a>
              </div>
              <div className="divider">
                <div className="divider-line"></div>
                Or
                <div className="divider-line"></div>
              </div>
              {isSignUp && (
                <div className="text-field">
                  <label htmlFor="username">Username:</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Your Username"
                    autoComplete="username"
                    aria-required="true"
                    required
                  />
                  <img alt="user Icon" title="user Icon" src={user} />
                </div>
              )}
              <div className="text-field">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email"
                  autoComplete="email"
                  aria-required="true"
                  required
                />
                <img alt="Email Icon" title="Email Icon" src={emailIcon} />
              </div>
              <div className="text-field">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your Password"
                  autoComplete="current-password"
                  aria-required="true"
                  required
                />
                <img alt="password Icon" title="password Icon" src={pass} />
              </div>
              {error && <p style={{ color: "red" }}>{error}</p>}
              <button
                type="submit"
                className="my-form__button"
                aria-label="Submit login form"
              >
                {isSignUp ? "Sign Up" : "Login"}
              </button>
              <div className="my-form__actions">
                <div className="my-form__row">
                  <span>Did you forget your password?</span>
                  <a
                    href="google"
                    title="Reset Password"
                    aria-label="Reset your password"
                  >
                    Reset Password
                  </a>
                </div>
                <div className="my-form__signup">
                  <span>
                    {isSignUp ? "Already have an account?" : "Need an account?"}
                  </span>
                  <a
                    href="google"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsSignUp(!isSignUp);
                      setError("");
                    }}
                    title={isSignUp ? "Login" : "Sign Up"}
                    aria-label={
                      isSignUp ? "Switch to Login" : "Switch to Sign Up"
                    }
                  >
                    {isSignUp ? "Login" : "Sign Up"}
                  </a>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
      <div className="info-side">
        <img src={mockImage} alt="Mock" className="mockup" aria-hidden="true" />
        <div className="welcome-message">
          <h2>BSPoke Shop!</h2>
          <p>Your ultimate destination for unique, custom-made products.</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
