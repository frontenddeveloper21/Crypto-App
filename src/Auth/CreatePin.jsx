import React, { useState } from 'react'
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import OTPInput from "react-otp-input";
import LoadingButton from "../Auth/LoadingButton";
import { useCreatePinMutation } from '../service/userManagementApi';
import { decrypt, encyrpt } from '../utilites/crypto';
import Password from 'antd/es/input/Password';
import { ToastSuccess } from '../utilites/toast';

const CreatePin = () => {
    const [newPin, setNewPin] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const [createPin] = useCreatePinMutation();
    const { url } = useParams();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (newPin.length !== 6 || confirmPassword.length !== 6) {
            alert("Please enter a 6-digit PIN in both fields.");
            return;
        }

        if (newPin !== confirmPassword) {
            alert("PINs do not match!");
            return;
        }

        setLoader(true);
        setTimeout(() => {
            setLoader(false);
            navigate("/sign-in");
        }, 2000);


    };

    const createNewPin = async (e) => {

        e.preventDefault();

        if (newPin.length !== 6 || confirmPassword.length !== 6) {
            alert("Please enter a 6-digit PIN in both fields.");
            return;
        }

        if (newPin !== confirmPassword) {
            alert("PINs do not match!");
            return;
        }

        setLoader(true);
        const data = {
            password: String(newPin),
            url: String(url),
        }
        console.log(data);

        const payload = {
            data: encyrpt(JSON.stringify(data))
        }

        try {
            const res = await createPin(payload).unwrap()
            let decryptData = decrypt(res?.data)
            const resultData = JSON.parse(decryptData)
            console.log(resultData);
            if (resultData?.statuscode === 200) {
                  navigate("/sign-in");
                  ToastSuccess(resultData?.message)
            }
        } catch (err) {
            console.log(err)
        } finally {
             setLoader(false);
        }
    }

    return (
        <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-[#020617] overflow-hidden">
            {/* Background Blurs */}
            <div className="absolute w-[350px] h-[350px] bg-blue-500/10 rounded-full blur-3xl top-10 left-10 animate-pulse" />
            <div className="absolute w-[450px] h-[450px] bg-indigo-400/10 rounded-full blur-3xl bottom-0 right-10 animate-pulse" />

            {/* Main Card */}
            <div className="relative z-10 backdrop-blur-2xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-10 w-full max-w-md">
                <h2 className="text-4xl font-bold text-center text-white mb-8 tracking-wide">
                    Create Pin
                </h2>

                <form onSubmit={createNewPin} className="space-y-6">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-white">New Pin</label>
                        <OTPInput
                            value={newPin}
                            onChange={setNewPin}
                            numInputs={6}
                            inputType="password"
                            shouldAutoFocus
                            inputStyle={{
                                width: "48px",
                                height: "48px",
                                border: "1px solid #D5D5D5",
                                backgroundColor: "rgba(255, 255, 255, 0.30)",
                                borderRadius: "16px",
                                outline: "none",
                                color: "#fff",
                                fontSize: "18px",
                                textAlign: "center"
                            }}
                            containerStyle={{
                                display: "flex",
                                alignItems: "center",
                                flexWrap: "wrap",
                                gap: "12px",
                                justifyContent: "center"
                            }}
                            renderInput={(props) => (
                                <input
                                    {...props}
                                    autoComplete="off"
                                    name="new-pin"
                                    spellCheck="false"
                                    onKeyDown={(e) => {
                                        if (!/[0-9]/.test(e.key) && e.key !== "Backspace" && e.key !== "Tab" && e.key !== "ArrowLeft" && e.key !== "ArrowRight") {
                                            e.preventDefault();
                                        }
                                    }}
                                    onInput={(e) => {
                                        // Remove non-numeric characters (for pasted values)
                                        e.target.value = e.target.value.replace(/[^0-9]/g, "");
                                    }}
                                />
                            )}
                        />

                    </div>

                    {/* Confirm PIN */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-white">Confirm New Pin</label>
                        <OTPInput
                            value={confirmPassword}
                            onChange={setConfirmPassword}
                            numInputs={6}
                            inputType="password"
                            inputStyle={{
                                width: "48px",
                                height: "48px",
                                border: "1px solid #D5D5D5",
                                backgroundColor: "rgba(255, 255, 255, 0.30)",
                                borderRadius: "16px",
                                outline: "none",
                                color: "#fff",
                                fontSize: "18px",
                                textAlign: "center"
                            }}
                            containerStyle={{
                                display: "flex",
                                alignItems: "center",
                                flexWrap: "wrap",
                                gap: "12px",
                                justifyContent: "center"
                            }}
                            renderInput={(props) => (
                                <input
                                    {...props}
                                    autoComplete="off"
                                    name="confirm-pin"
                                    spellCheck="false"
                                    onKeyDown={(e) => {
                                        if (!/[0-9]/.test(e.key) && e.key !== "Backspace" && e.key !== "Tab" && e.key !== "ArrowLeft" && e.key !== "ArrowRight") {
                                            e.preventDefault();
                                        }
                                    }}
                                    onInput={(e) => {
                                        e.target.value = e.target.value.replace(/[^0-9]/g, "");
                                    }}
                                />
                            )}
                        />

                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loader}
                        className={`w-full py-3 font-bold rounded-lg shadow-lg text-white transition-all duration-300 ${loader
                                ? "bg-gradient-to-r from-[#004D61] to-[#00A6A6] cursor-not-allowed"
                                : "bg-gradient-to-r from-[#004D61] to-[#00A6A6] cursor-pointer text-white"
                            }`}
                    >
                        {loader ? (
                            <span className="flex items-center justify-center gap-2">
                                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                <LoadingButton />
                            </span>
                        ) : (
                            "Submit"
                        )}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-300 mt-6">
                    Remembered your password?{" "}
                    <span
                        onClick={() => navigate("/sign-in")}
                        className="text-[#00A6A6] hover:underline cursor-pointer"
                    >
                        Go back to Sign In
                    </span>
                </p>
            </div>
        </div>
    );
};

export default CreatePin;
