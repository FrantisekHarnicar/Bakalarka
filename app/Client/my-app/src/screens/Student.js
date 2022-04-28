import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../styles/StudentTeacher.css'
import studentIcon from '../styles/img/studentIcon.png'
import logOut from '../styles/img/logout.png'

function Student(){
    const name = localStorage.getItem('studentName')
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('studentName')
        navigate('/')
    }
    return (
        <div className="background">
            <section className="mainBlock">
                <div className="mainCaption">
                    <img className= "icon2" src={studentIcon}/>
                    <p>Domov</p>
                    <div className="nameLogOut">
                        <div>
                            {name}
                        </div>
                        <img className="logOut" src={logOut} onClick={logout}/>
                    </div>
                </div>
                    
            </section>
        </div>
    );
}

export default Student;