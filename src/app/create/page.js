"use client"
import React, {useState} from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {useRouter} from "next/navigation";
import fetchUserId from "@/app/utils/fetchUserId";

export default function Page(){
    const router = useRouter()
    const [creating, setCreating] = useState(false)

    const grassId = "676db9320c30e67151090580"
    const waterId = "676db8e70c30e6715109057d"
    const sandId = "676db9090c30e6715109057f"
    const [mapError, setMapError] = useState("")

    const MapCreationSchema = Yup.object().shape({
        mapName: Yup.string()
            .required('Nazwa mapy jest wymagana'),
        dimension: Yup.number()
            .required('Wymiary mapy są wymagane')
            .min(1, "Wybierz opcję z listy")
            .max(4, "Wybierz opcję z listy")
            .integer("Wybierz opcję z listy"),
        template: Yup.number()
            .required('Szablon mapy jest wymagany')
            .min(1, "Wybierz opcję z listy")
            .max(3, "Wybierz opcję z listy")
            .integer("Wybierz opcję z listy"),
    });
    async function fetchCreateMap(mapData) {
        try {
            const response = await fetch(`http://localhost:8080/maps`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("mapixelToken")}`
                },
                body: JSON.stringify(mapData)
            })
            if (response.ok) {
                setCreating(true)
                const data = await response.json();
                router.push(`/map/${data.id}`)
            } else if (response.status === 400) {
                setMapError("Niepoprawne dane")
            } else {
                setMapError("Błąd przy łączeniu z serwerem")
            }
        } catch (error) {
            setMapError("Błąd przy łączeniu z serwerem")
        }
    }

    async function handleCreate({mapName, dimension, template}){
        const userId = await fetchUserId(router)
        let dimensionX = 0
        let dimensionY = 0
        switch (dimension){
            case '1':
                dimensionX = 10
                dimensionY = 10
                break
            case '2':
                dimensionX = 15
                dimensionY = 10
                break
            case '3':
                dimensionX = 20
                dimensionY = 10
                break
            case '4':
                dimensionX = 20
                dimensionY = 15
                break
            default:
                setMapError("niepoprawne dane")
        }
        let fieldId = []
        switch (template){
            case '1':
                fieldId.push(grassId)
                break
            case '2':
                fieldId.push(waterId)
                break
            case '3':
               fieldId.push(sandId)
                break
            default:
                setMapError("niepoprawne dane")
        }
        const mapToSend = {name: mapName, userId, dimensionX, dimensionY, fields: fieldId}
        await fetchCreateMap(mapToSend)
    }

    return (
        <div className="flex flex-row justify-center m-10">
            <div className="border border-gray-300 w-fit p-5">
                <h1 className="font-semibold text-center">Stwórz nową mapę</h1>
                <Formik
                    initialValues={{mapName: '', dimension: '', template: ''}}
                    validationSchema={MapCreationSchema}
                    onSubmit={async (values, {setSubmitting, setErrors}) => {
                        await handleCreate(values)
                    }}
                >
                    {({errors, touched, isSubmitting}) => (
                        <Form>
                            <label htmlFor="large-input"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Nazwa mapy
                            </label>
                            <div>
                                <Field
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 w-full"
                                    name="mapName"
                                    type="text"
                                    placeholder="nazwa mapy..."
                                />
                                {errors.mapName && touched.mapName ? (
                                    <div style={{color: 'red'}}>{errors.mapName}</div>
                                ) : null}
                            </div>
                            <label htmlFor="large-input"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Wybierz rozmiar mapy:
                            </label>
                            <div
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 w-full">
                                <Field as="select" name="dimension">
                                    <option value="">Wybierz...</option>
                                    <option value="1">Mała - 10 x 10</option>
                                    <option value="2">Średnia - 15 x 10</option>
                                    <option value="3">Duża - 20 x 10</option>
                                    <option value="4">Giga - 20 x 15</option>
                                </Field>
                                {errors.dimension && touched.dimension ? (
                                    <div style={{color: 'red'}}>{errors.dimension}</div>
                                ) : null}
                            </div>
                            <label htmlFor="large-input"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Wybierz szablon:
                            </label>
                            <div
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5">
                                <Field as="select" name="template">
                                    <option value="">Wybierz...</option>
                                    <option value="1">Łąka</option>
                                    <option value="2">Ocean</option>
                                    <option value="3">Pustynia</option>
                                </Field>
                                {errors.template && touched.template ? (
                                    <div style={{color: 'red'}}>{errors.template}</div>
                                ) : null}
                            </div>

                            {errors.general && (
                                <div style={{color: 'red'}}>{errors.general}</div>
                            )}
                            <div className="flex flex-row justify-center m-2">
                                <button
                                    className="text-white hover:bg-green-600 bg-green-700 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                                    type="submit" disabled={isSubmitting}>
                                    {creating ? 'Tworzenie w toku...' : 'Stwórz!'}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
                <p>{mapError}</p>
                <h3>Od stworzenia własnego świata dzieli Ciebie tylko kilka kliknięć!</h3>
            </div>
        </div>
    )
}