import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../styles/StudentTeacher.css'
import studentIcon from '../styles/img/studentIcon.png'
import logOut from '../styles/img/logout.png'
import {Link, Outlet} from 'react-router-dom';
import Test from './StudentTest.js'
import axios from 'axios';

function Student(){
    const name = localStorage.getItem('studentName')
    const navigate = useNavigate();
    const [testsDB, setTestsDB] = useState([])
    const logout = () => {
        localStorage.removeItem('studentName')
        navigate('/')
    }
    useEffect(()=>{
        axios.get('http://localhost:3000/student')
        .then((res) => {
            setTestsDB(res.data.rows) 
            console.log(res.data) 
        })

    },[])

    const test = testsDB.map((item)=>{
        return(
        <Test
            key={item.id}
            id={item.id}
            nazov_testu = {item.nazov_testu}
            meno_ucitela = {item.meno_ucitela}
            datum_publikacie = {item.datum_publikacie}
        />
        )
    }

    )


    return (
        <div className="background">
            <section className="mainBlock">
                <div className="mainCaption">
                    <div className="imgNavigation"> 
                    <Link to='/student' style={{textDecoration: 'none'}}>
                        <img className= "icon2" src={studentIcon}/>
                    </Link>
                    </div>
                    <div>
                    <p className="captionText">Domov</p>
                    </div>
                    <div className="nameLogOut">
                            <p className="captionText">{name}</p>
                        <img className="logOut" src={logOut} onClick={logout}/>
                    </div>
                </div>
                <div className="scroll" >
                   {test}
                    
                    
                </div>

            </section>
        </div>
    );
}

export default Student;