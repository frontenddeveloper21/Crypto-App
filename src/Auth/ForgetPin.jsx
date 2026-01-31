import React, { useState } from "react";
import sideImg from "../../public/Images/crypto_login_img.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { useForgetPinMutation } from "../service/userManagementApi";
import { decrypt, encyrpt } from "../utilites/crypto";
import ButtonCoinLoader from "./LoadingButton";

const ForgetPin = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(""); // ✅ for validation message
  const [loader, setLoader] = useState(false);

  const [forgetPin] = useForgetPinMutation();
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSendLink = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError(""); 
    setLoader(true);

    try {
      const data = { email: String(email) };
      const payload = { data: encyrpt(JSON.stringify(data)) };

      const res = await forgetPin(payload).unwrap();
      const decryptData = decrypt(res?.data);
      const resultData = JSON.parse(decryptData);

      console.log(resultData);

      if (resultData?.statuscode === 200) {
        alert("Password reset link sent successfully!");
        navigate("/sign-in");
      } else {
        setError(resultData?.message || "Something went wrong. Try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to send reset link. Please try again later.");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="flex">
      <div className="lg:w-1/2 hidden lg:block xl:w-3/5 h-screen">
        <img
          className="w-full h-full object-cover object-center"
          alt="image"
          src={sideImg}
        />
      </div>

      <div
        className="flex items-center w-full lg:w-1/2 xl:w-2/5 justify-center min-h-screen bg-cover bg-center px-4"
        style={{
          backgroundImage: `url('../../../Images/login_img.jpeg')`,
          backgroundColor: "rgba(0,0,0,0.9)",
          backgroundBlendMode: "overlay",
        }}
      >
        <div className="backdrop-blur-md bg-white/10 rounded-2xl shadow-xl p-8 w-full max-w-md border border-white/20">
          <h2 className="text-3xl font-bold text-white text-center mb-6 tracking-wide">
            Forgot PIN
          </h2>

          <form onSubmit={handleSendLink} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Registered Email
              </label>
              <div className="border border-[#D5D5D5] mt-4 rounded-md">
                <input
                  type="text"
                  className="w-full bg-[transparent] rounded-md px-4 py-4 text-white focus:outline-none"
                  placeholder="Enter your registered email..."
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.10)" }}
                />
              </div>
              {error && (
                <p className="text-red-400 text-sm mt-2 font-medium">{error}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loader}
              className={`w-full bg-gradient-to-r from-[#004D61] to-[#00A6A6] text-white font-bold py-3 mt-8 rounded-md shadow-lg hover:opacity-90 transition-all duration-300 ${
                loader ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loader ? <span>
                  Sending Link... <ButtonCoinLoader />
              </span> : "Send Reset Link"}
            </button>
          </form>

          <div className="text-center mt-6 text-gray-300 text-sm">
            <p>
              Remembered your pin?{" "}
              <Link
                to="/sign-in"
                className="text-cyan-400 font-medium hover:underline hover:text-cyan-300 transition"
              >
                Go back to Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPin;
