"use client"
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {useState} from "react";

export default function Page(){
    const [registerError, setRegisterError] = useState("")

    const RegisterSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        username: Yup.string()
            .required('Name is required')
            .min(3)
            .max(20),
        password: Yup.string()
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/,
                'Password must be 6-40 characters long, include upper and lower case letters, and at least one number'
            )
            .required('Password is required'),
        repeatPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Please confirm your password'),
    });
    async function handleRegister({email, username, password}) {
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
                //TODO: redirect to main page
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
    return(
        <div>
            <Formik
                initialValues={{email: '', username: '', password: '', repeatPassword: ''}}
                validationSchema={RegisterSchema}
                onSubmit={async (values, {setSubmitting, setErrors}) => {
                    await handleRegister(values);
                }}
            >
                {({errors, touched, isSubmitting}) => (
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
                                name="username"
                                type="text"
                                placeholder="username..."
                            />
                            {errors.username && touched.username ? (
                                <div>{errors.username}</div>
                            ) : null}
                        </div>
                        <div>
                            <Field
                                name="password"
                                type="password"
                                placeholder="password..."
                            />
                            {errors.password && touched.password ? (
                                <div style={{color: 'red'}}>{errors.password}</div>
                            ) : null}
                        </div>
                        <div>
                            <Field
                                name="repeatPassword"
                                type="password"
                                placeholder="repeat password..."
                            />
                            {errors.repeatPassword && touched.repeatPassword ? (
                                <div>{errors.repeatPassword}</div>
                            ) : null}
                        </div>
                        {errors.general && (
                            <div>{errors.general}</div>
                        )}
                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Registering...' : 'Register!'}
                        </button>
                    </Form>
                )}
            </Formik>
            <p>{registerError}</p>
        </div>
    )
}