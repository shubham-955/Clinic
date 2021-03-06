import React, { useState, useEffect, useContext } from 'react'
import { Slide } from 'react-slideshow-image';
import { NavigateNext, NavigateBefore } from '@material-ui/icons';
import 'react-slideshow-image/dist/styles.css';
import styles from './Home.module.css'
import { IndClinicCard } from '../../Components/IndClinicCard/IndClinicCard';
import { CartContext } from '../../Contexts/CartProvider';


export const Home = () => {

    const [slider, setSlider] = useState([])
    const [bookings, setBookings] = useState([])
    const { getCount } = useContext(CartContext)

    useEffect(() => {
        getSlider();
        getBookings();
        getCount();
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
        fetch("https://clinic-fake-server.herokuapp.com/slider", {
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
        fetch("https://clinic-fake-server.herokuapp.com/bookings", {
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
                                    <p className={styles.sliderTitle}>{item.title}</p>
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
