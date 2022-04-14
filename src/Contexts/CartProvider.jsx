import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const [count, setCount] = useState(0)

    const getCount = () => {
        try {
            fetch("https://clinic-fake-server.herokuapp.com/scheduled")
                .then((res) => res.json())
                .then((data) => setCount(data.length))
                .catch(console.log);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <CartContext.Provider value={{ count, setCount, getCount }}>
            {children}
        </CartContext.Provider>
    )
}