import React, { useState, useEffect } from 'react'
import { Slide } from 'react-slideshow-image';
import { NavigateNext, NavigateBefore } from '@material-ui/icons';
import 'react-slideshow-image/dist/styles.css';
import styles from './Home.module.css'
import { IndClinicCard } from '../../Components/IndClinicCard/IndClinicCard';


export const Home = () => {

    const [slider, setSlider] = useState([])
    const [bookings, setBookings] = useState([])

    useEffect(() => {
        getSlider();
        getBookings();
    }, [])

    const properties = {
        canSwipe: false,
        autoPlay: true,
        indicators: true,
        prevArrow: <div className={styles.leftArrow}>
            <NavigateBefore style={{ color: 'black', fontSize: 35 }} />
        </div>,
        nextArrow: <div className={styles.rightArrow}>
            <NavigateNext style={{ color: 'black', fontSize: 35 }} />
        </div>
    }

    const getSlider = async () => {
        fetch("http://localhost:3000/slider", {
            method: "GET",
            headers: {
                "content-type": "application/json",
            }
        }).then((r) => r.json()
        ).then((d) => {
            setSlider(d);
        })
    }

    const getBookings = async () => {
        fetch("http://localhost:3000/bookings", {
            method: "GET",
            headers: {
                "content-type": "application/json",
            }
        }).then((r) => r.json()
        ).then((d) => {
            setBookings(d);
        })
    }

    return (
        <div>
            <div className={styles.sliderContainer}>
                <Slide easing="ease" {...properties}>
                    {slider.map(item => {
                        return (
                            <div className={styles.eachSlide}>
                                <div style={{ 'backgroundImage': `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${item.thumbnail})` }}>
                                </div>
                            </div>
                        )
                    })
                    }
                </Slide>
            </div>
            <div className={styles.clinicCardSection}>
                {bookings.map(item => {
                    return (
                        <IndClinicCard key={item.id} item={item} />
                    )
                })
                }
            </div>
        </div>
    )
}
