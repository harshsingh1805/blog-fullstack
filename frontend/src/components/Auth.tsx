import { ChangeEvent, useState } from "react";
import { Spinner } from "./Spinner";
import { Link, useNavigate } from "react-router-dom";
import { SignupInput } from "@harshsingh19005/medium-common";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        username: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);

    async function sendRequest() {
        setLoading(true);
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
            const jwt = response.data;
            localStorage.setItem("token", jwt);
            // Store name for avatar initial
            if (type === "signup") {
                localStorage.setItem("name", postInputs.name || "User");
            } else {
                // For signin, ideally backend should return user info, but fallback to username part before @
                let name = postInputs.username || "User";
                if (name.includes("@")) name = name.split("@")[0];
                localStorage.setItem("name", name);
            }
            navigate("/blogs");
        } catch(e) {
            alert("Error while signing up")
        } finally {
            setLoading(false);
        }
    }

    return <div className="min-h-screen flex justify-center items-center px-2 sm:px-0">
        <div className="flex justify-center w-full">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-4 sm:p-10">
                <div className="mb-6">
                    <div className="text-2xl sm:text-3xl font-extrabold text-center">
                        Create an account
                    </div>
                    <div className="text-slate-500 text-center mt-2">
                        {type === "signin" ? "Don't have an account?" : "Already have an account?" }
                        <Link className="pl-2 underline" to={type === "signin" ? "/signup" : "/signin"}>
                            {type === "signin" ? "Sign up" : "Sign in"}
                        </Link>
                    </div>
                </div>
                <div className="pt-2">
                    {type === "signup" ? <LabelledInput label="Name" placeholder="Harsh Singh..." onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            name: e.target.value
                        })
                    }} /> : null}
                    <LabelledInput label="Username" placeholder="harsh@gmail.com" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            username: e.target.value
                        })
                    }} />
                    <LabelledInput label="Password" type={"password"} placeholder="123456" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            password: e.target.value
                        })
                    }} />
                    <button
                        onClick={sendRequest}
                        type="button"
                        className="mt-8 w-full flex justify-center items-center gap-2 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                        disabled={loading}
                    >
                        {loading ? <Spinner /> : (type === "signup" ? "Sign up" : "Sign in")}
                    </button>
                </div>
            </div>
        </div>
    </div>
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
    return <div>
        <label className="block mb-2 text-sm text-black font-semibold pt-4">{label}</label>
        <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
    </div>
}