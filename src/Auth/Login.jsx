import React, { useState } from "react";

import sideImg from "../../public/Images/crypto_login_img.jpeg"

import OTPInput from "react-otp-input";
import { decrypt, encyrpt } from "../utilites/crypto";
import { useLoginMutation } from "../service/loginApi";
import { useDispatch } from "react-redux";
import { setLoginData } from "../Components/Features/LoginData";
import { Link, useNavigate } from "react-router-dom";
import ButtonCoinLoader from "./LoadingButton";
import { ToastError, ToastSuccess } from "../utilites/toast";
// import sideImg from "../../public/Images/loginSide_image.jpeg"

const Login = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [LoginSub] = useLoginMutation()

  const [formData, setFormData] = useState({
    signEmail: "",
    signPassword: ""
  })

  const [formDataError, setFormDataError] = useState({
    signEmail: "",
    signPassword: ""
  })

  const [loginLoader, setLoginLoader] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;

    const character = ["signEmail", "signPassword"];
    const regex = /^[^<>;]*$/

    if (character.includes(name)) {
      if (regex.test(value)) {
        setFormData({ ...formData, [name]: value });
        setFormDataError({ ...formDataError, [name]: "" });
      }
    } else {
      setFormData({ ...formData, [name]: value });
      setFormDataError({ ...formDataError, [name]: "" });
    }
  }

  const validateInput = () => {
    let valid = true
    const newError = {}

    if (!formData.signEmail) {
      valid = false
      newError.signEmail = "Email is required"
    }
    else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.signEmail)) {
      valid = false
      newError.signEmail = "Invalid Email Address"
    }

    if (!formData.signPassword) {
      valid = false
      newError.signPassword = "Password is required"
    }

    setFormDataError(newError)

    return valid
  }

  const submitLogin = async (e) => {
    e.preventDefault()

    if (!validateInput()) return

    const data = {
      email: formData.signEmail,
      password: formData.signPassword
    }
    console.log(data);

    const payload = {
      data: encyrpt(JSON.stringify(data))
    }

    console.log(payload);
   setLoginLoader(true)

    try {
      const res = await LoginSub(payload).unwrap()
      console.log(res);

      let decryptData = decrypt(res?.data)
      const resultData = JSON.parse(decryptData)
      console.log(resultData);
      if (resultData?.statuscode === 200) {
        dispatch(setLoginData(resultData))
        ToastSuccess(resultData?.message)
        navigate("/")
      }

    } catch (err) {
      console.log(err);
      ToastError(err?.data?.message)
    } finally { 
      setLoginLoader(false)
    }

  }

  return (
    <div className="flex">
      <div className="lg:w-1/2 hidden lg:block xl:w-3/5 h-screen">
              <img
                className="w-full h-full object-cover object-center"
                alt="Login Background"
                src={sideImg}
              />
            </div>
      <div
        className="login-page flex items-center w-full lg:w-1/2 xl:w-2/5 justify-center min-h-screen bg-cover bg-center px-4"
        style={{
          backgroundImage: `url('../../../Images/login_img.jpeg')`, // Use your image path
          backgroundColor: 'rgba(0,0,0,0.9)',
          backgroundBlendMode: 'overlay',
        }}
      >
        <div className="backdrop-blur-md bg-white/10 rounded-2xl shadow-xl p-8 w-full max-w-md border border-white/20">
          <h2 className="text-3xl font-bold text-white text-center mb-6 tracking-wide">
            Sign In
          </h2>
          <form onSubmit={submitLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-white mb-1">Email</label>
              <div className="border border-[#D5D5D5] mt-2 rounded-md">
                 <input
                  type="text"
                  name="fake_user"
                  autoComplete="username"
                  style={{ display: "none" }}
                  aria-hidden="true"
                />
                <input
                  type="email"
                  className="w-full bg-[transparent] rounded-md px-4 py-4 text-white focus:outline-none"
                  placeholder="Enter your email"
                  autoComplete="off"
                  name="signEmail"
                  value={formData.signEmail}
                  onChange={handleInput}
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.10)" }}
                /></div>
              {formDataError.signEmail && <span className="error__msg mt-2"> {formDataError.signEmail} </span>}
            </div>


            {/* Password */}
            <div>
              <label className="block mb-2 text-sm font-medium text-white">Password</label>
              <OTPInput
                value={formData.signPassword}
                onChange={(otp) => setFormData(prev => ({ ...prev, signPassword: otp }))}
                
                numInputs={6}
                inputType="password"

                                  inputStyle={{
                    width: "48px",
                    height: "48px",
                    border: "1px solid #D5D5D5",
                    backgroundColor: "rgba(255, 255, 255, 0.10)",
                    borderRadius: "16px",
                    outline: "none",
                    color: "#fff",
                    fontSize: "18px",
                    textAlign: "center",
                  }}
                  containerStyle={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "start",
                    gap: "18px",
                  }}
                renderInput={(props) => (
                    <input
                      {...props}
                      autoComplete="one-time-code"
                      name="otp-password"
                      spellCheck="false"
                      inputMode="numeric" // ✅ helps on mobile
                    />
                  )}
              />
              {formDataError.signPassword && <span className="error__msg mt-2"> {formDataError.signPassword} </span>}
            </div>

            {/* Login Button */}
            <button
              type="submit"
              // disabled={loginLoader}
              className="w-full bg-gradient-to-r from-[#004D61] to-[#00A6A6] text-white font-bold py-3 mt-10 rounded-md shadow-lg hover:opacity-90 transition-all duration-300 flex justify-center items-center "
            >
              {loginLoader ? (
                <>
                  Logging in...
                  <ButtonCoinLoader />
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="text-center mt-6 text-gray-300 text-sm">
            <p>
              Forgot your password?{" "}
              <Link
                to="/forget-pin"
                className="text-cyan-400 font-medium hover:underline hover:text-cyan-300 transition"
              >
                Reset it here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
