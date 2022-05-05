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
    const [studentTest, setStudentTest] = useState([])

    const [number, setNumber] = useState(0)
    let oneQuestion =[]

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
        if(studentTest.test.test.length-1 > number){ 
            setNumber(number+1)
        }
    }
    const minus = () => {
        if(number !== 0){
            setNumber(number-1)
        }
    }

    const showRating = (show, item) =>{
        setShow(show)
        setStudentTest(item)
        console.log(item)

    }
    if(studentTest.test !== undefined){
        oneQuestion = studentTest.test.test[number].content.map((item) => {
            return(
                <PicText
                    key={item.inputId}
                    inputId={item.inputId}
                    id={item.id}
                    pic={item.pic}
                    text={item.text}
                    typ={studentTest.test.test[number].type}
                    isTeacher={true}
                />
            )
        } ) 
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
                <div className="scroll" style={{height: "100%"}}>
                    {show?
                    <div className="testBackground" >
                        <div className="test--navigation">
                            <img className="sipkyMinus" src={Minus} onClick={minus}/>
                            <TestInfo
                                questionCount = {studentTest.test.test.length}
                                currentQuestion = {number}
                            />
                            <img className="sipkyPlus" src={Plus} onClick={plus}/>
                        </div>
                        <div className="main--test">
                            <div className="scroll--question">
                                { oneQuestion }
                            </div>
                        </div>
                        <div className="timer">
                            <div className="timer--items">
                                <p>{studentTest.cas_riesenia}</p>
                                <Button style={{width: "40%"}} onClick={() => setShow(false)}  className="greenButtons">Ukončiť prehľad</Button>
                            </div>
                        </div> 
                    </div>
                    :
                    <>
                    <div className="button--endTest">
                        <Button style={{width: "25%"}} onClick={() => navigate("/teacher")} className="blueButtons">Ukončiť prehľad</Button>
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