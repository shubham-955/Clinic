import React, { useContext } from 'react';
import { Link, useNavigate } from "react-router-dom"
import styles from './Navbar.module.css'
import { Work } from '@material-ui/icons';
import { CartContext } from '../../Contexts/CartProvider';

export const Navbar = () => {

    const navigate = useNavigate();
    const { count } = useContext(CartContext);

    return (
        <>
            <nav className={styles.navbar}>
                <div>
                    <Link className={styles.mainTitle} to="/">CLINIC</Link>
                </div>
                <div className={styles.cart} onClick={() => navigate("/scheduled")}>
                    <Work style={{ color: '#0E2737', fontSize: 25 }} />
                    {count !== 0 &&
                        <div className={styles.count}>
                            <p>{count}</p>
                        </div>
                    }
                </div>
            </nav>
        </>
    );
};
