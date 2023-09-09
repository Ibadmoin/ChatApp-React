import React, { useEffect, useState } from "react";
import "./auth.css";
import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import OtpInput from "otp-input-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css"
import { auth, RecaptchaVerifier} from '../../Firebase.config'
import { signInWithPhoneNumber, onAuthStateChanged } from "firebase/auth";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
function Auth() {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP,setShowOTP]= useState(false);
  const [user,setUser]= useState(null)
  const [otpComplete, setOtpComplete] = useState(true);
  const navigate = useNavigate();
  useEffect(()=>{
    otp.length >= 6 ? setOtpComplete(false) : setOtpComplete(true)
  console.log(auth)

  }, [otp])
const handleSubmit = ()=>{
  setShowOTP(!showOTP)
  toast.error("toast khul gaya")
  // 
}

// change auth stated here 

const otpSubmit = ()=>{
  if(confirmationResult){
    confirmationResult.confirm(otp).then(async(res)=>{
      console.log(res);
      setUser(res.user)
      setLoading(false);
    }).catch((err)=>{
      console.log(err);
      toast.error("OTP is not Correct!");
    })
  }
  // setLoading(true)
  // setOtpComplete(true)
  // console.log('ibad')
}

function onCaptchVerify(){
  if(!window.recaptchaVerifier){
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {
        onSignUp();
        
       
      },
      'expired-callback': () => {

      }
    });
  }
}

async function onSignUp (){
  setLoading(true);
  await onCaptchVerify();

  const appVerifier = window.recaptchaVerifier;
  const formatPhone = '+' + ph;
 await signInWithPhoneNumber(auth, formatPhone, appVerifier)
    .then((confirmationResult) => {
      
      window.confirmationResult = confirmationResult;
      setLoading(false);
      setShowOTP(true);
      setOtpComplete(true);
      toast.success("OTP has Successfully Sended!");
      window.recaptchaVerifier = null;
      
    }).catch((error) => {
      console.log("error araha hai"+error);
      setLoading(false);
      toast.error("Too many Request, Please wait for 1 hour!");


    });

}




  return (
  
    
    <section className="authSection">
      <div>
       <Toaster 
   toastOptions={{duration: 4000,}}/>
        <div id="recaptcha-container"></div>
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
            <div className="OTPHeadingWrapper"><label htmlFor="otp" className="OTP-label">
              Enter your OTP
            </label></div>
            <OtpInput
              value={otp}
              onChange={setOtp}
              OTPLength={6}
              otpType="number"
              disabled={false}
              autoFocus
              className="opt-container"
            ></OtpInput>
            <button disabled ={otpComplete} onClick = {otpSubmit}  className="verifyBtn">
              {loading && (
                <CgSpinner size={20} className="animate-spin spinner" />
              )}
              <span>Verify OTP</span>
            </button>
            <div className="WrongnumberWrapper">
            <button onClick={handleSubmit}  className="wrongNumber"><span>Wrong Number, Correct it</span></button>
            </div>
          </> :

          <>
            <div className="detailWrapper">
              <BsTelephoneFill size={30} />
            </div>
            <label htmlFor="" className="ph-label">
              Verify your phone number
            </label>
            <PhoneInput  country={"pk"} value={ph} onChange={setPh} className="ph-container"/>
            <button onClick = {onSignUp} className="verifyBtn">
              {loading && (
                <CgSpinner size={20} className="animate-spin spinner" />
              )}
              <span>Send code via SMS</span>
            </button>
            <button onClick={handleSubmit}>Otp screen</button>

          </>
          }
        </div>
        )}
      </div>
    </section>

  
  );
}

export default Auth;
