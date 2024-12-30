"use client"
import React, {useState} from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {useRouter} from "next/navigation";

export default function Page(){
    const router = useRouter()

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
            });
            if (response.ok) {
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
    async function fetchUserId() {
        try {
            const response = await fetch(`http://localhost:8080/users/extract`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("mapixelToken")}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                return data.userId;
            }
            else {
                router.push('/login')
            }
        } catch (error) {
            router.push('/login')
        }
    }
    async function handleCreate({mapName, dimension, template}){
        const userId = await fetchUserId()
        let dimensionX = 0
        let dimensionY = 0
        switch (dimension){
            case '1':
                dimensionX = 10
                dimensionY = 10
                break
            case '2':
                dimensionX = 10
                dimensionY = 15
                break
            case '3':
                dimensionX = 15
                dimensionY = 20
                break
            case '4':
                dimensionX = 20
                dimensionY = 20
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
        console.log(mapToSend)
        await fetchCreateMap(mapToSend)
    }

    return (
        <div>
            <Formik
                initialValues={{mapName: '', dimension: '', template: ''}}
                validationSchema={MapCreationSchema}
                onSubmit={async (values, {setSubmitting, setErrors}) => {
                    await handleCreate(values)
                }}
            >
                {({errors, touched, isSubmitting}) => (
                    <Form>
                        <div>
                            <Field
                                name="mapName"
                                type="text"
                                placeholder="nazwa mapy..."
                            />
                            {errors.mapName && touched.mapName ? (
                                <div style={{color: 'red'}}>{errors.mapName}</div>
                            ) : null}
                        </div>

                        <div>
                            <label>Wybierz wymiary mapy:</label>
                            <Field as="select" name="dimension">
                                <option value="">Wybierz...</option>
                                <option value="1">Mała - 10 x 10</option>
                                <option value="2">Średnia - 10 x 15</option>
                                <option value="3">Duża - 15 x 20</option>
                                <option value="4">Giga - 20 x 20</option>
                            </Field>
                            {errors.dimension && touched.dimension ? (
                                <div style={{color: 'red'}}>{errors.dimension}</div>
                            ) : null}
                        </div>

                        <div>
                            <label>Wybierz szablon:</label>
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
                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Creating...' : 'Stwórz!'}
                        </button>
                    </Form>
                )}
            </Formik>
            <p>{mapError}</p>
        </div>
    )
}