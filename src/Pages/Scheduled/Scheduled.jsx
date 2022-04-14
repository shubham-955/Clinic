import React, { useState, useEffect, useContext } from 'react'
import { CartContext } from '../../Contexts/CartProvider'
import styles from "./Scheduled.module.css"
export const Scheduled = () => {

    useEffect(() => {
        getScheduled()
    }, [])

    const [scheduled, setScheduled] = useState([])
    const { getCount } = useContext(CartContext);

    const getScheduled = async () => {
        fetch("http://localhost:3000/scheduled", {
            method: "GET",
            headers: {
                "content-type": "application/json",
            }
        }).then((r) => r.json()
        ).then((d) => {
            setScheduled(d);
        })
    }

    const handleDelete = (item) => {
        let newScheduled = scheduled.filter(e => {
            if (e.id !== item.id) {
                return e;
            }
        })
        setScheduled(newScheduled);
        try {
            fetch(`http://localhost:3000/bookings/${item.id}`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    ...item,
                    status: false,
                }),
            })
                .then((r) => {
                    console.log(r)
                    r.json()
                })
                .then((d) => {
                    console.log(d)
                    confirmDelete(item.id)
                })
        } catch (error) {
            console.log(error)
        }
    }

    const confirmDelete = (id) => {
        try {
            fetch(`http://localhost:3000/scheduled/${id}`, {
                method: "DELETE",
                headers: {
                    "content-type": "application/json",
                }
            }).then((r) => r.json()
            ).then((d) => {
                console.log(d);
                getCount()
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={styles.scheduledContainer}>
            <div className={styles.scheduledTitle}>
                <p>Scheduled Appointments</p>
            </div>
            <div className={styles.scheduledSection}>
                {scheduled.length === 0 ?
                    <p className={styles.noAppoint}>No Appointments to show</p>
                    :
                    <>
                        {scheduled.map(item => {
                            return (
                                <div className={styles.scheduledCard}>
                                    <div>
                                        <p className={styles.title}>{item.title}</p>
                                        <p className={styles.location}>City: {item.location}</p>
                                        <p className={styles.fees}>Fees: {item.fees}/-</p>
                                        <p className={styles.value}>Date: {item.bookedDate}</p>
                                        <p className={styles.bookedTime}>Time: {item.bookedTime}</p>
                                    </div>
                                    <p className={styles.cancel} onClick={() => handleDelete(item)}>Cancel Appointment</p>
                                </div>
                            )
                        })
                        }
                    </>
                }
            </div>
        </div>
    )
}
