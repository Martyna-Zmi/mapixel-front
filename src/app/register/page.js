"use client"
import {Field, Form, Formik} from 'formik';
import * as Yup from 'yup';
import React, {useState} from "react";
import {useRouter} from "next/navigation";
import Link from "next/link";


export default function Page(){
    const [registerError, setRegisterError] = useState("")
    const router = useRouter();
    const RegisterSchema = Yup.object().shape({
        email: Yup.string()
            .email('Nieprawidłowy format email')
            .required('Email jest wymagany'),
        username: Yup.string()
            .required('Nazwa użytkownika jest wymagana')
            .min(3, "Nazwa użytkownika powinna mieć co najmniej 3 znaki")
            .max(20, "Nazwa użytkownika nie powinna być dłuższa niż 20 znaków"),
        password: Yup.string()
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/,
                'Hasło powinno mieć od 6 do 40 znaków, zawierać duże i małe litery oraz conajmniej jedną liczbę'
            )
            .required('Hasło jest wymagane'),
        repeatPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Hasła muszą być takie same')
            .required('Proszę potwierdzić hasło'),
    })
    async function checkIsEmailInUse(emailToCheck) {
        try {
            const response = await fetch(`http://localhost:8080/users/emailfree`,{
                method: 'GET',
                    headers: {
                    'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem("mapixelToken")}`
                },
                body: JSON.stringify({email: emailToCheck})
            });
            if (response.ok) {
                const data = await response.json();
                return data.inUse;
            } else if (response.status === 400) {
                setRegisterError("Niepoprawne dane")
            } else {
                setRegisterError("Błąd przy łączeniu z serwerem")
            }
        } catch (error) {
            setRegisterError("Błąd przy łączeniu z serwerem")
        }
    }
    async function handleRegister({email, username, password}) {
        const isInUse = await checkIsEmailInUse(email)
        if(isInUse === null || isInUse) setRegisterError("Podany email jest już przypisany do innego konta")
        else {
            try {
                const response = await fetch(`http://localhost:8080/users/create`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({email, password, username, isBanned: false, maps:[]}),
                });
                if (response.ok) {
                    const data = await response.json();
                    localStorage.setItem('mapixelToken', data.token)
                    router.push('/main');
                } else if (response.status === 400) {
                    setRegisterError("Niepoprawne dane")
                }
                else {
                    setRegisterError("Błąd przy łączeniu z serwerem")
                }
            } catch (error) {
                setRegisterError("Błąd przy łączeniu z serwerem")
            }
        }
    }
    return(
        <div className="flex flex-row justify-center m-10">
            <div className="border border-gray-300 p-5 w-80">
                <h1 className="font-semibold text-center">Zarejestruj się</h1>
                <Formik
                    initialValues={{email: '', username: '', password: '', repeatPassword: ''}}
                    validationSchema={RegisterSchema}
                    onSubmit={async (values, {setSubmitting, setErrors}) => {
                        await handleRegister(values);
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
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 w-60"
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
                                Nazwa użytkownika
                            </label>
                            <div>
                                <Field
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 w-60"
                                    name="username"
                                    type="text"
                                    placeholder="nazwa użytkownika..."
                                />
                                {errors.username && touched.username ? (
                                    <div>{errors.username}</div>
                                ) : null}
                            </div>
                            <label htmlFor="large-input"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white pt-2">
                                Hasło
                            </label>
                            <div>
                                <Field
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 w-60"
                                    name="password"
                                    type="password"
                                    placeholder="hasło..."
                                />
                                {errors.password && touched.password ? (
                                    <div className="text-center">{errors.password}</div>
                                ) : null}
                            </div>
                            <label htmlFor="large-input"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white pt-2">
                                Powtórz hasło
                            </label>
                            <div>
                                <Field
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 w-60"
                                    name="repeatPassword"
                                    type="password"
                                    placeholder="powtórz hasło..."
                                />
                                {errors.repeatPassword && touched.repeatPassword ? (
                                    <div>{errors.repeatPassword}</div>
                                ) : null}
                            </div>
                            {errors.general && (
                                <div>{errors.general}</div>
                            )}
                            <div className="flex flex-row justify-center m-2">
                                <button
                                    type="submit" disabled={isSubmitting}
                                    className="text-white hover:bg-green-600 bg-green-700 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                                    {isSubmitting ? 'Rejestracja...' : 'Zarejestruj się!'}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
                <p>{registerError}</p>
                <p className="text-center">Masz już konto?</p>
                <div className="flex flex-row justify-center">
                <Link className="text-green-800 font-bold underline" href="/register">Zaloguj się!</Link>
                </div>
            </div>
        </div>
    )
}