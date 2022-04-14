import React from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './IndClinicCard.module.css';
import { LocationOn } from '@material-ui/icons';

export const IndClinicCard = ({ item }) => {
    const navigate = useNavigate();
    return (
        <div className={styles.indClinicCard} style={{ opacity: item.status ? 0.7 : 1 }}>
            <img src="http://cdn.onlinewebfonts.com/svg/img_491427.png" alt="" />
            <div className={styles.clinicCardContent}>
                <p className={styles.title}>{item.title}</p>
                <div className={styles.location}>
                    <LocationOn style={{ color: 'black', fontSize: 14, marginTop: 3 }} />
                    <p className={styles.city}>{item.location}</p>
                </div>
                <div className={styles.feesSection}>
                    <p className={styles.fees}>{item.fees}/- </p>
                    <p className={styles.span}>consulting fees</p>
                </div>
            </div>
            {!item.status ?
                <div className={styles.bookBtn} onClick={() => navigate(`/${item.id}`)}>
                    <p>Book An Appointment</p>
                </div>
                :
                <div className={styles.bookedBtn} onClick={() => navigate(`/scheduled`)}>
                    <p>See Your Appointment</p>
                </div>
            }
            {item.status &&
                <div className={styles.bookedText}>
                    <p>Appointment Booked</p>
                </div>
            }
        </div>

    )
}
