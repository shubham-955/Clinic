import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './Appointment.module.css';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import { Modal } from '@material-ui/core';
import moment from 'moment';
import { v4 } from 'uuid';
import { CartContext } from '../../Contexts/CartProvider';

export const Appointment = () => {

    const [booking, setBooking] = useState({});
    const [bookedTime, setBookedTime] = useState("");
    const [value, onChange] = useState(new Date());
    const [open, setOpen] = useState(false);
    const { getCount } = useContext(CartContext);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (params.id) {
            getIndData();
        }
    }, [params.id])

    const getIndData = async () => {
        try {
            fetch(`http://localhost:3000/bookings/${params.id}`)
                .then((res) => res.json())
                .then((d) => {
                    setBooking(d)
                })
                .catch((err) => {
                    console.log(err)
                })
        } catch (error) {
            console.log(error)
        }
    }

    const handleConfirm = () => {
        try {
            fetch(`http://localhost:3000/bookings/${booking.id}`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    ...booking,
                    status: true,
                }),
            })
                .then((r) => {
                    console.log(r)
                    r.json()
                })
                .then((d) => {
                    console.log(d)
                    postBooking()
                })
        } catch (error) {
            console.log(error)
        }
    }

    const postBooking = () => {
        try {
            const data = {
                "id": booking.id,
                "title": booking.title,
                "location": booking.location,
                "fees": booking.fees,
                "bookedDate": moment(value.toString()).format("DD-MM-YYYY"),
                "bookedTime": bookedTime
            }
            fetch(`http://localhost:3000/scheduled`, {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then((res) => res.json())
                .then((d) => {
                    console.log(d);
                    getCount()
                    setOpen(true)
                })
                .catch((err) => {
                    console.log(err)
                })
        } catch (error) {
            console.log(error)
        }
    }

    const handleClose = () => {
        setOpen(false)
    }

    const minDate = new Date()

    return (
        <div className={styles.newAppContainer}>
            <div className={styles.datePicker}>
                <Calendar onChange={onChange} value={value} minDate={minDate} />
                <div className={styles.slotContainer}>
                    {(booking?.availability ?? []).map(item => {
                        return (
                            <div className={styles.indSlot}
                                key={item.id}
                                style={{
                                    opacity: item === "0" ? 0.5 : 1, backgroundColor:
                                        bookedTime === item ? "green" : "red"
                                }}
                                onClick={() => setBookedTime(item)}
                            >
                                <p>{item === "0" ? "Not Available" : item}</p>
                            </div>
                        )
                    })
                    }
                </div>
            </div>
            <div className={styles.buttonContainer}>
                <div className={styles.button} onClick={() => handleConfirm()}>
                    <p>Confirm Booking</p>
                </div>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                onTouchCancel={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div className={styles.screenView}>
                    <div className={styles.modalView}>
                        <p className={styles.title}>{booking.title}</p>
                        <p className={styles.location}>City: {booking.location}</p>
                        <p className={styles.fees}>Fees: {booking.fees}/-</p>
                        <p className={styles.value}>Date: {moment(value.toString()).format("DD-MM-YYYY")}</p>
                        <p className={styles.bookedTime}>Time: {bookedTime}</p>
                        <div className={styles.btn} onClick={() => navigate("/")}>
                            <p>Go to Home</p>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

