"use client"
import {useState} from "react";
import PasswordForm from "@/app/me/passwordForm";

export default function ChangePassword(){
    const [displayForm, setDisplayForm] = useState(false)
    return(
        <div>
            <div className="flex flex-row justify-center mt-2">
                <button type="button"
                        onClick={() => setDisplayForm(!displayForm)}
                        className="text-white hover:bg-green-600 bg-green-700 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                    Zmień hasło
                </button>
            </div>
            {displayForm ? <PasswordForm/> : <span></span>}
        </div>
    )
}