import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../styles/StudentTeacher.css'
import studentIcon from '../styles/img/studentIcon.png'
import Plus from '../styles/img/plus.png'
import Minus from '../styles/img/minus.png'
import logOut from '../styles/img/logout.png'
import {Link, Outlet} from 'react-router-dom';
import axios from 'axios';
import {useParams} from "react-router-dom"
import PicText from "./PicText";
import TestInfo from "./TestInfo";
import { Button } from "react-bootstrap";



function PageForStudentTest(){
    const name = localStorage.getItem('studentName')
    const [number, setNumber] = useState(0)
    const navigate = useNavigate();
    const [testsDB, setTestsDB] = useState([])
    const [jsonTest, setJsonTest] = useState([])
    let oneQuestion = []
    const logout = () => {
        localStorage.removeItem('studentName')
        navigate('/')
    }
    const params = useParams();
    useEffect(()=>{
        axios.post('http://localhost:3000/studentTest',({testID:params.id}))
        .then((res) => {
            setTestsDB(res.data.rows[0])
            setJsonTest(res.data.rows[0].test.test)
        })
        

        //startTimer()
  
    },[])

    const plus = () => {
        if(jsonTest.length-1 > number){
            setNumber(number+1)
        }
    }
    const minus = () => {
        if(number !== 0){
            setNumber(number-1)
        }
    }
    if(jsonTest[0] !== undefined){
        console.log(number)
        oneQuestion = jsonTest[number].content.map((item) => {
            return(
                <PicText
                    key={item.id}
                    pic={item.pic}
                    text={item.text}
                    typ={jsonTest[number].type}
                />
            )
        } )
    }

    const [seconds, setSeconds] = useState(0)
    const [minutes, setMinutes] = useState(0)
    
    const startTimer = () => {
            setInterval(() => {
                setSeconds(seconds => seconds + 0.5)
            }, 1000)
            if(seconds === 60){
                setMinutes(minutes+1)
                setSeconds(0)
            }
            const currentMinutes = minutes
            const currentSeconds = seconds
            return(
                <p>{currentMinutes} : {currentSeconds}</p>
            )
            
    }
    //startTimer();
    if(seconds === 60){
        setMinutes(minutes+1)
        setSeconds(0)
    }
    const currentMinutes = minutes
    const currentSeconds = seconds
 

    return (
        <div className="background">
            <section className="mainBlock" style={{backgroundColor: "white"}}>
                <div className="mainCaption">
                    <div className="imgNavigation"> 
                    <Link to='/student' style={{textDecoration: 'none'}}>
                        <img className= "icon2" src={studentIcon}/>
                    </Link>
                    </div>
                    <div>
                    <p className="captionText">{testsDB.nazov_testu}</p>
                    </div>
                    <div className="nameLogOut">
                            <p className="captionText">{name}</p>
                        <img className="logOut" src={logOut} onClick={logout}/>
                    </div>
                </div>
                <div className="testBackground" >
                    <div className="test--navigation">
                        <img className="sipkyMinus" src={Minus} onClick={minus}/>
                        <TestInfo
                            questionCount = {jsonTest.length}
                            currentQuestion = {number}
                        />
                        <img className="sipkyPlus" src={Plus} onClick={plus}/>
                    </div>
                    <div className="main--test">
                        <div className="scroll--question">
                            { oneQuestion }
                            { oneQuestion }
                            { oneQuestion }
                            { oneQuestion }
                            { oneQuestion }
                            { oneQuestion }
                            { oneQuestion }
                           
                        </div>
                        
                    </div>
                    <div className="timer">
                            <p>{currentMinutes} : {currentSeconds}</p>
                    </div>
                </div>

            </section>
        </div>
    );
}

export default PageForStudentTest;