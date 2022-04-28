import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

function StudentLogin(){
    const [name, setName] = useState('Použivateľ')
    const navigate = useNavigate();
    useEffect( () => {
        const alreadyLogin = () =>{

            if(localStorage.getItem('studentName')){
                navigate('/student')
            }
        }
        alreadyLogin()
    }, []);

    const studentName = () => {
        localStorage.setItem('studentName',name)
        navigate('/student')

    }
    return (
        <section>
            <div >
            <label>Meno</label>
                <input
                type="text"
                onChange={(e) => {
                    setName(e.target.value);
                }}
                />
                <button onClick={studentName}> Pokračovať </button>
            </div>
        </section>
    );
}

export default StudentLogin;