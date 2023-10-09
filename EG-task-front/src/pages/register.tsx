import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/button";
import Spinner from "../components/spinner";
import TextInput from "../components/text-input";
import { PASSWORD_REGEX } from "../lib/constants";
import { useAccount } from "../lib/context/account-context";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { handleRegister } = useAccount();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const state: { [key: string]: string } = {};
    formData.forEach((value, key) => {
      state[key] = value as string;
    });
    setIsLoading(true);
    handleRegister({
      email: state.email,
      password: state.password,
      fullName: state.fullName,
    })
      .then(() => {
        navigate("/home");
      })
      .catch((err: string) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-4xl mb-4 text-right">Register</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TextInput
          label="Full name"
          name="fullName"
          placeholder="Enter your Full name"
          required
          className="custom-input"
        />
        <TextInput
          label="Email"
          name="email"
          type="email"
          placeholder="Enter your email"
          required
          className="custom-input"
        />
        <TextInput
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your password"
          required
          pattern={PASSWORD_REGEX}
          className="custom-input"
          title="Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number."
        />
        <Button
          label={isLoading ? <Spinner /> : "Register"}
          type="submit"
          className="w-full h-12"
          disabled={isLoading}
        />
        <p>
          Already have an account?{" "}
          <a href="/login" className="text-blue-400 underline">
            Login
          </a>
        </p>
      </form>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default RegisterPage;
