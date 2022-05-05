import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../styles/StudentTeacher.css'
import teacherIcon from '../styles/img/teacherIcon.png'
import Plus from '../styles/img/plus.png'
import Minus from '../styles/img/minus.png'
import logOut from '../styles/img/logout.png'
import {Link, Outlet} from 'react-router-dom';
import axios from 'axios';
import {useParams} from "react-router-dom"
import PicText from "./PicText";
import TestInfo from "./TestInfo";
import { Button } from "react-bootstrap";
import Table from "./Table"




function TeacherRating(){
    const navigate = useNavigate();
    const params = useParams();
    const nameTeacher = localStorage.getItem('teacherName')
    const [isLoading, setIsLoading] = useState(true)
    const [show, setShow] = useState(false)
    const [studentRating, setStudentRating] = useState([])
    const [studentName, setStudentName] = useState([])

    const [number, setNumber] = useState(0)

    const logout = () => {
        axios.delete('http://localhost:3000/teacher')
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
        axios.post('http://localhost:3000/studentRating',({id:params.id}))
        .then((res)=>{
            setStudentRating(JSON.parse(JSON.stringify(res.data.allRating)))
            console.log(studentRating)
            setIsLoading(false)
        })
      },[])

      if(isLoading){
        return(
            <div className="background">
                <section className="mainBlock" >

                </section>
            </div>
        )
    }

    const plus = () => {
        if(studentRating.rows[0].length-1 > number){ 
            setNumber(number+1)
        }
    }
    const minus = () => {
        if(number !== 0){
            setNumber(number-1)
        }
    }

    const showRating = (show, studentName) =>{
        setShow(show)
        setStudentName(studentName)
        
    }


    return (
        <div className="background">
            <section id="mainBlock" className="mainBlock">
                <div className="mainCaption">
                    <div className="imgNavigation"> 
                    <Link to='/teacher' style={{textDecoration: 'none'}}>
                        <img className= "icon2" src={teacherIcon}/>
                    </Link>
                    </div>
                    <div>
                    <p className="captionText">Hodnotenie</p>
                    </div>
                    <div className="nameLogOut">
                            <p className="captionText">{nameTeacher}</p>
                        <img className="logOut" src={logOut} onClick={logout}/>
                    </div>
                </div>
                <div className="scroll">
                    {show?
                    <div className="testBackground" >
                        <div className="test--navigation">
                            <img className="sipkyMinus" src={Minus} onClick={minus}/>
                            <TestInfo
                                questionCount = {studentRating.rows[0].length}
                                currentQuestion = {number}
                            />
                            <img className="sipkyPlus" src={Plus} onClick={plus}/>
                        </div>
                        {/* <div className="main--test">
                            <div className="scroll--question">
                                { oneQuestion }
                            </div>
                        </div>
                        <div className="timer">
                            <div className="timer--items">
                                <Button onClick={saveTest} className="greenButtons">Odovzdať</Button>
                            </div>
                        </div> */}
                    </div>
                    :
                    <>
                    <div className="button--endTest">
                        <Button style={{width: "25%"}} onClick={() => navigate("/student")} className="blueButtons">Ukončiť prehľad</Button>
                    </div>
                    <Table
                        tableSolution={studentRating}
                        showRating={showRating}
                        isTeacher={true}
                    />
                    </>}
                </div>
                
            </section>
        </div>
    );
}

export default TeacherRating;