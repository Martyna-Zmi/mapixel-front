"use client"
import React, {useState} from "react";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {useRouter} from "next/navigation";
import Link from "next/link";


export default function Page(){
    const router = useRouter();
    const [loginError, setLoginError] = useState("");

    const LoginSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
    });

    async function handleLogin({email, password}) {
        try {
            const response = await fetch(`http://localhost:8080/users/authorize`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('mapixelToken', data.token)
                router.push('/main');
            } else if (response.status === 401 || response.status === 400) {
                setLoginError("Niepoprawny login lub hasło")
            } else {
                setLoginError("Błąd przy łączeniu z serwerem. Przepraszamy")
            }
        } catch (err) {
            setLoginError("Błąd przy łączeniu z serwerem. Przepraszamy")
        }
    }
    return (
        <div className="flex flex-row justify-center m-10">
            <div className="border border-gray-300 w-fit p-5">
                <h1 className="font-semibold text-center">Zaloguj się</h1>
                <Formik
                    initialValues={{email: '', password: ''}}
                    validationSchema={LoginSchema}
                    onSubmit={async (values, {setSubmitting, setErrors}) => {
                        await handleLogin(values)
                    }}
                >
                    {({errors, touched, isSubmitting}) => (
                        <Form>
                            <label htmlFor="large-input"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white pt-2">
                                Adres e-mail
                            </label>
                            <div>
                                <Field
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
                                    name="email"
                                    type="email"
                                    placeholder="email..."
                                />
                                {errors.email && touched.email ? (
                                    <div>{errors.email}</div>
                                ) : null}
                            </div>
                            <label htmlFor="large-input"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white pt-2">
                                Hasło
                            </label>
                            <div>
                                <Field
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
                                    name="password"
                                    type="password"
                                    placeholder="hasło..."
                                />
                                {errors.password && touched.password ? (
                                    <div>{errors.password}</div>
                                ) : null}
                            </div>
                            <div className="flex flex-row justify-center m-2">
                                <button
                                    className="text-white hover:bg-green-600 bg-green-700 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                                    type="submit"
                                    disabled={isSubmitting}>
                                    Zaloguj się!
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
                <p className="text-center">{loginError}</p>
                <p className="text-center">Nie masz jeszcze konta?</p>
                <div className="flex flex-row justify-center">
                    <Link className="text-green-800 font-bold underline" href="/register">Zarejestruj się!</Link>
                </div>
            </div>
        </div>
    )
}