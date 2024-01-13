import { createContext, useState, useContext } from 'react';

const userContext = createContext();

export function UserProvider({ children }) {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('login-user')));

    return (
        <userContext.Provider value={{ user, setUser, loading, setLoading }}>
            {children}
        </userContext.Provider>
    );
}

export function useUser() {
    return useContext(userContext); // Use userContext, not userProvider
}
