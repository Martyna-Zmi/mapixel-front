import {Field, Form, Formik} from "formik";
import React, {useState} from "react";
import {useRouter} from "next/navigation";
import * as Yup from "yup";

export default function PasswordForm(){
    const router = useRouter()
    const [passError, setPassError] = useState("")
    const RegisterSchema = Yup.object().shape({
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
    async function handlePasswordChange({password}) {
            try {
                const response = await fetch(`http://localhost:8080/users/password`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem("mapixelToken")}`
                    },
                    body: JSON.stringify({password}),
                });
                if (response.ok) {
                    localStorage.setItem('mapixelToken', "")
                    router.push('/login');
                } else if (response.status === 400) {
                    setPassError("Niepoprawne dane")
                }
                else {
                    setPassError("Błąd przy łączeniu z serwerem")
                }
            } catch (error) {
                setPassError("Błąd przy łączeniu z serwerem")
            }
    }
    return (
        <div className="flex flex-row justify-center m-1">
            <div className="border border-gray-300 p-5 w-80">
                <h1 className="font-semibold text-center">Zarejestruj się</h1>
                <Formik
                    initialValues={{email: '', username: '', password: '', repeatPassword: ''}}
                    validationSchema={RegisterSchema}
                    onSubmit={async (values, {setSubmitting, setErrors}) => {
                        await handlePasswordChange(values);
                    }}
                >
                    {({errors, touched, isSubmitting}) => (
                        <Form>
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
                            <p className="text-center">UWAGA! Po zmiane hasła zostaniesz wylogowany</p>
                            <div className="flex flex-row justify-center m-2">
                                <button
                                    type="submit" disabled={isSubmitting}
                                    className="text-white hover:bg-green-600 bg-green-700 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                                    Zmień hasło
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
                <p>{passError}</p>
            </div>
        </div>
    )
}