import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

function Student(){
    const [name, setName] = useState('Použivateľ')
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('studentName')
        navigate('/')
    }
    return (
        <section>
            <div >
                adasdasdasddasd
            </div>
            <button onClick={logout}>Odhlásenie</button>
                
        </section>
    );
}

export default Student;