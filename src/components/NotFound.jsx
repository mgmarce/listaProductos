// src/components/NotFound.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function NotFound() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/');
        }, 3000);
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div>
            <h1>Error 404</h1>
            <p>Página no encontrada. Serás redirigido al inicio en unos segundos...</p>
        </div>
    );
}

export default NotFound;
