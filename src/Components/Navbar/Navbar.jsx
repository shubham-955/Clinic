import React, { useState } from 'react';
import { Link } from "react-router-dom"
import '../Navbar.css'

export const Navbar = () => {

    const [visible, setVisible] = useState(false)

    return (
        <>
            <nav className="navbar">
                <div className={styles.mainTitle}>
                    <Link className="navbar-brand" to="/">AROGYAM</Link>
                </div>
                <div className={styles.cart}>

                </div>
            </nav>
        </>
    );
};
