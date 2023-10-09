import React, { ChangeEvent, FormEvent, useState } from "react";
import Button from "../components/button";
import TextInput from "../components/text-input";
import { useAccount } from "../lib/context/account-context";
import { PASSWORD_REGEX } from "../lib/constants";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/spinner";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { handleLogin } = useAccount();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    handleLogin({ email, password })
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-4xl mb-4 text-right">Login</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TextInput
          label="Email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
          required
          className="custom-input"
        />
        <TextInput
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={handlePasswordChange}
          required
          className="custom-input"
        />
        <Button
          label={isLoading ? <Spinner /> : "Login"}
          type="submit"
          className="custom-button"
        />
      </form>
      {error && <p className="text-red-500">{error}</p>}
      <p>
        Don't have an account?{" "}
        <a href="/register" className="text-blue-400 underline">
          Register
        </a>
      </p>
    </div>
  );
};

export default LoginPage;
