import React, { useEffect, useState } from "react";
import Axios from "axios"
import { useNavigate } from 'react-router-dom';
import teacherIcon from '../styles/img/teacherIcon.png'
import logOut from '../styles/img/logout.png'
import '../styles/StudentTeacher.css'
import {Link, Outlet} from 'react-router-dom';
import Test from './TeacherTest.js'
import {IoMdAddCircle} from 'react-icons/io'

function Teacher(){
    const [testsDB, setTestsDB] = useState([])
    const nameTeacher = localStorage.getItem('teacherName')
    Axios.defaults.withCredentials = true;
    const navigate = useNavigate();
    const logout = () => {
        Axios.delete('http://localhost:3000/teacher')
        .then((response)=> {
          if(response.data === "") {
            navigate("/");
          } else {
            console.log("Odhlásenie neúspešné!")
          }
        }).catch((err)=>{
            console.log(err)
        })
      }

      useEffect(()=>{
        Axios.post('http://localhost:3000/teacher',({name:nameTeacher}))
        .then((res) => {
            console.log(res.data)
            setTestsDB(res.data.rows)  
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


    return(
            <div className="background">
            <section className="mainBlock">
                <div className="mainCaption">
                    <div className="imgNavigation"> 
                    <Link to='/teacher' style={{textDecoration: 'none'}}>
                        <img className= "icon2" src={teacherIcon}/>
                    </Link>
                    </div>
                    <div>
                    <p className="captionText">Domov</p>
                    </div>
                    <div className="nameLogOut">
                        
                            <p className="captionText">{nameTeacher}</p>
                        
                        <img className="logOut" src={logOut} onClick={logout}/>
                    </div>
                </div>
                <div className="scroll" >
                    {test}
                    <div className="add--test">
                        <Link to="/addTest/new">
                            <IoMdAddCircle className="add--button"/>
                        </Link>
                    </div>
                </div>
                


            </section>
        </div>

    )
}
export default Teacher;