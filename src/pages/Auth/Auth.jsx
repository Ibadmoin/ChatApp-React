import React, { useState } from "react";
import "./auth.css";
import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import OtpInput from "otp-input-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css"
function Auth() {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP,setShowOTP]= useState(false);
  const [user,setUser]= useState(null)
// testing
  return (
    <section className="authSection">
      <div>
        {user ? (

        <h2 className="Heading">
            👍 Login Success
        </h2>
        ) : (
        <div className="Wrapper">
          <h1 className="Heading">
            Welcome to <br />
            CODE A PROGRAM
          </h1>
          {showOTP ? 
          <>
            <div className="detailWrapper">
              <BsFillShieldLockFill size={30} />
            </div>
            <label htmlFor="otp" className="ph-label">
              Enter your OTP
            </label>
            <OtpInput
              value={otp}
              onChange={setOtp}
              OTPLength={6}
              otpType="number"
              disabled={false}
              autoFocus
              className="opt-container"
            ></OtpInput>
            <button className="verifyBtn">
              {loading && (
                <CgSpinner size={20} className="animate-spin spinner" />
              )}
              <span>Verify OTP</span>
            </button>
          </> :

          <>
            <div className="detailWrapper">
              <BsTelephoneFill size={30} />
            </div>
            <label htmlFor="" className="ph-label">
              Verify your phone number
            </label>
            <PhoneInput  country={"pk"} value={ph} onChange={setPh} className="ph-container"/>
            <button className="verifyBtn">
              {loading && (
                <CgSpinner size={20} className="animate-spin spinner" />
              )}
              <span>Send code via SMS</span>
            </button>
          </>
          }
        </div>
        )}
      </div>
    </section>
  );
}

export default Auth;
