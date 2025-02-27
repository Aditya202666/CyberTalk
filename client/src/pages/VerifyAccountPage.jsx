import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { ArrowLeft, KeyRound, LucideMessageSquareQuote } from "lucide-react";

const VerifyAccountPage = () => {
  const { sendEmailVerificationOtp, verifyEmailOtp } = useAuthStore();

  const [formData, setFormData] = useState({ otp: "" });
  const [otpSent, setOtpSent] = useState(false);

  const navigate = useNavigate();

  const handleSendOtp = async () => {
    sendEmailVerificationOtp();
    // console.log(formData)
    // send otp code
  };

  const handleConfirmOtp = async (e) => {
    e.preventDefault();
    if (!formData.otp) {
      toast.info("Please enter your OTP");
      return;
    }
    const res = await verifyEmailOtp(formData);
    // console.log(formData)
    if(res) {
        window.location.reload();
    }
  };

  useEffect(() => {
    sendEmailVerificationOtp();
    setOtpSent(true);
  }, []);

  return (
    <div className="min-h-screen grid">
      <div
        className="absolute top-4 md:top-8 lg:top-12 left-8 size-12 bg-accent/10 rounded-full flex items-center justify-center group hover:bg-secondary/20 transition-colors"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="size-7 text-accent group-hover:text-secondary animate-bounce" />
      </div>

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
                Verify your CyberTalk Account
              </h1>
            </div>
          </div>

          {/* form */}
          <form onSubmit={handleConfirmOtp} className="space-y-12">
            <div className={`form-control `}>
              <label className="label">
                <span className="label-text font-medium">OTP</span>
              </label>
              <div className="relative ">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <KeyRound className="size-5 text-base-content" />
                </div>
                <input
                  className={`input input-bordered  w-full pl-10 `}
                  type={"text"}
                  name="otp"
                  required
                  minLength={6}
                  maxLength={6}
                  placeholder="******"
                  value={formData.otp}
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
              className="btn w-full  btn-accent text-lg rounded-xl"
            >
              Confirm Otp
            </button>
          </form>

          <div className="text-center">
            {otpSent && (
              <p className="text-base-content/70 mb-2">
                Didn't Received OTP?{" "}
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="link link-secondary"
                >
                  Resend Otp!
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyAccountPage;
