import {
  Eye,
  EyeOff,
  KeyRound,
  Loader,
  LucideMessageSquareQuote,
  User,
} from "lucide-react";
import React, { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { Link } from "react-router-dom";

const LoginPage = () => {

  const { isFormLoading, login } = useAuthStore();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ userName: "", password: "" });


  const handleLogin = async (e) => {
    e.preventDefault();
    await login(formData);
  };

  return (
    <div className="min-h-screen grid">
      {/* left side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col gap-2 items-center group">
              <div className="size-12 bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                <LucideMessageSquareQuote className="size-6 text-accent group-hover:text-secondary animate-bounce" />
              </div>

              <h1 className="font-semibold text-2xl hover:text-secondary  text-accent">
                Welcome Back
              </h1>
              <p className="text-base-content/60">
                Get started with your Cyber Chat
              </p>
            </div>
          </div>

          {/* form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Username</span>
              </label>
              <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <User className="size-5 text-base-content" />
                  </div>
                <input
                  className={"input input-bordered w-full pl-10 "}
                  type="text"
                  required={true}
                  minLength={6}
                  name="userName"
                  placeholder="happyCoder"
                  value={formData.userName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative ">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <KeyRound className="size-5 text-base-content" />
                </div>
                <input
                  className={`input input-bordered  w-full pl-10 `}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  minLength={6}
                  placeholder="*******"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <Eye className="size-5 text-base-content" />
                  ) : (
                    <EyeOff className="size-5 text-base-content" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isFormLoading}
              className="btn w-full btn-accent text-lg rounded-full"
            >
              {isFormLoading ? (
                <Loader className="size-5 animate-spin" />
              ) : (
                "Login"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/70 mb-2">
              <Link to={"/forgotPassword"} className="link link-secondary">
                Forgot Password?
              </Link>
            </p>
            <p className="text-base-content/70">
              Don't have an account?{" "}
              <Link to={"/register"} className="link link-accent">
                {" "}
                Register{" "}
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* right side */}
      {/* <ImagePattern
      title={"Join out community"}
      subtitle={"Connect with friends, share moments, and stay in touch with others"}
      /> */}
    </div>
  );
};

export default LoginPage;
