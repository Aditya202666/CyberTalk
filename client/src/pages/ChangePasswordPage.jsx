import { ArrowLeft, Eye, EyeOff, KeyRound, Loader, LucideMessageSquareQuote, Mail, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/userStore";
import { isPasswordValid } from "../lib/validatePassword";
import { toast } from "react-toastify";


const ChangePasswordPage = () => {

  const navigate = useNavigate();

  const { isChangingPassword, changePassword } = useAuthStore();

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    conformPassword: "",
  });

  const validateFormData =() =>{
    const trimmedData = {
      oldPassword: formData.oldPassword.trim(),
      newPassword: formData.newPassword.trim(),
      conformPassword: formData.conformPassword.trim(),
    };
    
    if(trimmedData.newPassword!== trimmedData.conformPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    return trimmedData;
  }

  const handleRegister = async(e) => {
    e.preventDefault();
    const trimmedData = validateFormData();
    const check = isPasswordValid(trimmedData.newPassword);
    console.log(check)
    if(!check) return toast.error("Invalid Password. Only alphanumeric characters & underscores are allowed.")
      changePassword(trimmedData);
  };

  
  return (
    <div className="min-h-screen grid">
      {/* left side */}
      <div
        className="absolute top-4 md:top-8 lg:top-12 left-8 size-12 bg-accent/10 rounded-full flex items-center justify-center group hover:bg-secondary/20 transition-colors"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="size-7 text-accent group-hover:text-secondary animate-bounce" />
      </div>

      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col gap-2 items-center group">
              <div className="size-12 bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                <LucideMessageSquareQuote className="size-6 text-accent group-hover:text-secondary animate-bounce" />
              </div>

              <h1 className="font-semibold text-2xl hover:text-secondary  text-accent">
                Change Account Password
              </h1>
            </div>
          </div>

          {/* form */}
          <form onSubmit={handleRegister} className="space-y-4">

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium"> Old Password</span>
              </label>
              <div className="relative ">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <KeyRound className="size-5 text-base-content" />
                </div>
                <input
                  className={`input input-bordered  w-full pl-10 `}
                  type={"text" }
                  name="oldPassword"
                  required
                  minLength={6}
                  placeholder="*******"
                  value={formData.oldPassword}
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
                <span className="label-text font-medium">New Password</span>
              </label>
              <div className="relative ">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <KeyRound className="size-5 text-base-content" />
                </div>
                <input
                  className={`input input-bordered  w-full pl-10 `}
                  type={"text" }
                  name="newPassword"
                  required
                  minLength={6}
                  placeholder="*******"
                  value={formData.newPassword}
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
                <span className="label-text font-medium">Confirm Password</span>
              </label>
              <div className="relative ">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <KeyRound className="size-5 text-base-content" />
                </div>
                <input
                  className={`input input-bordered  w-full pl-10 `}
                  type={"text" }
                  name="conformPassword"
                  required
                  minLength={6}
                  placeholder="*******"
                  value={formData.conformPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isChangingPassword}
              className="btn w-full btn-accent text-lg rounded-full"
            >
              {isChangingPassword ? (
                <Loader className="size-5 animate-spin" />
              ) : (
                "Change Password"
              )}
            </button>
          </form>

        </div>
      </div>

    </div>
  );
};

export default ChangePasswordPage;
