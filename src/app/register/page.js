"use client"
import {Field, Form, Formik} from 'formik';
import * as Yup from 'yup';
import {useState} from "react";
import {useRouter} from "next/navigation";


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
    });
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
                                placeholder="nazwa użytkownika..."
                            />
                            {errors.username && touched.username ? (
                                <div>{errors.username}</div>
                            ) : null}
                        </div>
                        <div>
                            <Field
                                name="password"
                                type="password"
                                placeholder="hasło..."
                            />
                            {errors.password && touched.password ? (
                                <div style={{color: 'red'}}>{errors.password}</div>
                            ) : null}
                        </div>
                        <div>
                            <Field
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
                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Rejestracja...' : 'Zarejestruj się!'}
                        </button>
                    </Form>
                )}
            </Formik>
            <p>{registerError}</p>
        </div>
    )
}