import { KeyRound, LucideMessageSquareQuote, Mail } from 'lucide-react'
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from 'react'
import { useAuthStore } from '../store/authStore';
import { toast } from 'react-toastify';

const ForgotPasswordPage = () => {

      const { sendForgotPasswordOtp, verifyForgotPasswordOtp } = useAuthStore();
    
      const [otpSent, setOtpSent] = useState(false);
      const [formData, setFormData] = useState({ email: "", otp: "" });
    
    const navigate = useNavigate()

      const handleSendOtp = async() =>{
        if(!formData.email) {
            toast.info("Please enter your email") 
            return
        }
        const res =  await sendForgotPasswordOtp({email: formData.email})
        // console.log(formData)
        // send otp code
        if(res)setOtpSent(true);
      }

      const handleConfirmOtp = async(e)=>{
        e.preventDefault();
        if(!formData.otp) {
            toast.info("Please enter your OTP") 
            return
        }
        const res =  await verifyForgotPasswordOtp(formData)
        // console.log(formData)
        if(res) navigate('/login')
      }




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
                CyberTalk
              </h1>
              <p className="text-base-content/60">
                Get started with your Cyber Chat
              </p>
            </div>
          </div>

          {/* form */}
          <form onSubmit={handleConfirmOtp} className="space-y-12">
            <div className={`form-control   ${!otpSent ? "block" : "hidden"}`}>
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <Mail className="size-5 text-base-content" />
                  </div>
                <input
                  className={"input input-bordered w-full pl-10 "}
                  type="email"
                  required={true}
                  name="email"
                  placeholder="happyCoder@chatterbox.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className={`form-control   ${otpSent ? "block" : "hidden"}`}>
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

            {!otpSent ? <button
              type="button"
              onClick={handleSendOtp}
              className="btn w-full  btn-accent text-lg rounded-xl"
            >
             Send Otp
            </button> :
            <button
              type="submit"
              className="btn w-full  btn-accent text-lg rounded-xl"
            >
             Confirm Otp
            </button>}
          </form>

          <div className="text-center">
            <p className="text-base-content/70 mb-2">
              {otpSent && <button type='button' onClick={handleSendOtp} className="link link-secondary">
                Resend Otp?
              </button>}
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

    </div>
  )
}

export default ForgotPasswordPage
