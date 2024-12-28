"use client"
import {useState} from "react";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
export default function Page(){
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
                //TODO: redirect to main page
            } else if (response.status === 401 || response.status === 400) {
                setLoginError("Niepoprawny login lub hasło")
            } else {
                setLoginError("Błąd przy łączeniu z serwerem")
            }
        } catch (error) {
            setLoginError("Błąd przy łączeniu z serwerem")
        }
    }
    return (
        <div>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={LoginSchema}
                onSubmit={async (values, { setSubmitting, setErrors }) => {
                    await handleLogin(values)
                }}
            >
                {({ errors, touched, isSubmitting }) => (
                    <Form>
                        <div>
                            <Field
                                name="email"
                                type="email"
                                placeholder="email..."
                            />
                            {errors.email && touched.email ? (
                                <div>{errors.email}</div>
                            ) : null}
                        </div>
                        <div>
                            <Field
                                name="password"
                                type="password"
                                placeholder="hasło..."
                            />
                            {errors.password && touched.password ? (
                                <div>{errors.password}</div>
                            ) : null}
                        </div>
                        <button type="submit" disabled={isSubmitting}>
                            Zaloguj się!
                        </button>
                    </Form>
                )}
            </Formik>
            <p>{loginError}</p>
        </div>
    );
}