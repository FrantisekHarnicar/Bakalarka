import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../styles/StudentTeacher.css'
import studentIcon from '../styles/img/studentIcon.png'
import Plus from '../styles/img/plus.png'
import Minus from '../styles/img/minus.png'
import logOut from '../styles/img/logout.png'
import {Link} from 'react-router-dom';
import axios from 'axios';
import {useParams} from "react-router-dom"
import PicText from "./PicText";
import TestInfo from "./TestInfo";
import InputModal from "./InputModal";
import { Button, Modal } from "react-bootstrap";
import Table from "./Table"
import { useStopwatch } from 'react-timer-hook';


function PageForStudentTest(){
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const name = localStorage.getItem('studentName')
    const [number, setNumber] = useState(0)
    const navigate = useNavigate();
    const [testsDB, setTestsDB] = useState([])
    const [jsonTest, setJsonTest] = useState([])
    const [jsonAnswer, setJsonAnswer] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isSaved, setIsSaved] = useState(false)
    const [tableSolution, setTableSolution] = useState([])
    const [modalImages, setModalImages] = useState([])

    const [isModalOpened, setIsModalOpened] = useState(false);
    const [ modalPositions, setModalPositions ] = useState([])
    const [ picNameFromModal, setPicNameFromModal ] = useState('');
    const [ inputId, setInputId ] = useState();

    const toggleModal = (bottomPosition, leftPosition, inputId) => {
        setIsModalOpened(prevState => !prevState)
        setModalPositions([leftPosition, bottomPosition]);
        setInputId(inputId)
    }
    const {
        seconds,
        minutes,
      } = useStopwatch({ autoStart: true });
    

    let oneQuestion = []
    let solutionArray = []
    const logout = () => {
        localStorage.removeItem('studentName')
        navigate('/')
    }
    
    const randomModalImages = (array, index)=>{
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        let uniqueChars = [];
        array.forEach((c) => {
          if (!uniqueChars.includes(c)) {
              uniqueChars.push(c);
          }
        });
        modalImages[index].content = uniqueChars
      }
    const params = useParams();
    useEffect(()=>{
        axios.post('http://localhost:3000/studentTest',({testID:params.id}))
        .then((res) => {
            setTestsDB(res.data.rows[0])
            setJsonAnswer(JSON.parse(JSON.stringify(res.data.rows[0].test)))
            setJsonTest(JSON.parse(JSON.stringify(res.data.rows[0].test.test)))
            setModalImages(JSON.parse(JSON.stringify(res.data.rows[0].test.test)))
            setIsLoading(false)
        })

    },[])
    if(isLoading){
        return(
            <div className="background">
                <section className="mainBlock" style={{backgroundColor: "white"}}>

                </section>
            </div>
        )
    }
    

    const deleteAnswers = () =>{
        if(jsonAnswer !== undefined){
            if(jsonAnswer.test !== undefined){
                for(let i = 0; i < jsonAnswer.test.length; i++){
                    if(jsonAnswer.test[i].type === false){
                        for(let x = 0; x < jsonAnswer.test[i].content.length; x++){
                            jsonAnswer.test[i].content[x].text = "Zadaj odpoveď"
                            jsonAnswer.isDeleteAnswer = true
                        }
                    }else{
                        for(let x = 0; x < jsonAnswer.test[i].content.length; x++){
                            jsonAnswer.test[i].content[x].pic = "addimage"
                            jsonAnswer.isDeleteAnswer = true
                        }
                        randomModalImages(modalImages[i].content, i)
                    }
                }
            }
        }
    }
    
    const handleChange = (id, inputValue) => {
        solutionArray[id] = inputValue  
        jsonAnswer.test[number].content[id].text = inputValue
        console.log(jsonAnswer.test)

        }
    

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
        oneQuestion = jsonAnswer.test[number].content.map((item) => {
            
            if(!jsonAnswer.isDeleteAnswer){
                deleteAnswers()
                console.log("deleteAnswer")
            }
            return(
                <PicText
                    key={item.inputId}
                    inputId={item.inputId}
                    id={item.id}
                    pic={item.pic}
                    text={item.text}
                    typ={jsonTest[number].type}
                    handleChange={handleChange}
                    answer={jsonAnswer.test[number].content[item.id].text}
                    toggleModal={toggleModal}
                    picNameFromModal={picNameFromModal}
                />
            )
        } )
    }
    const currentMinutes = minutes
    const currentSeconds = seconds
    const secondString = currentSeconds.toString()
    const minutesString = currentMinutes.toString()

    const rightAnswer = () =>{
        let counter = 0
        let totalQuestion = 0
        for(let i = 0; i < jsonAnswer.test.length; i++){
            for(let x = 0; x < jsonAnswer.test[i].content.length; x++){
                totalQuestion += 1
                if(jsonAnswer.test[i].type === false){
                    if(jsonAnswer.test[i].content[x].text === jsonTest[i].content[x].text){
                        counter +=1
                    }
                }else{
                    if(jsonAnswer.test[i].content[x].pic === jsonTest[i].content[x].pic){
                        counter +=1
                    }
                }
            }
        }
        const answerPercent = Math.round((100/totalQuestion)*counter)
        //const answer = counter.toString().concat("/", totalQuestion.toString())
        return answerPercent
    }
    const saveTest = () => {
        handleClose()
        const date = new Date();
        let year = date.getFullYear().toString()
        let mounth = date.getMonth()+1
        let day = date.getDate().toString()
        const saveDate = day.concat('.',mounth.toString(),'.',year)
        const time = minutesString.concat(":",secondString.toString())
        axios.post('http://localhost:3000/studentSaveTest',({
            json:jsonAnswer,
            studentName:name,
            time:time,
            date:saveDate,
            rightAnswer: rightAnswer(),
            testName: testsDB.nazov_testu,
        }))
        .then((res) => {
            setIsSaved(res.data.saved)
            if(res.data.saved){
                const element = document.getElementById("mainBlock")
                element.style.backgroundColor = "rgba(255, 255, 255, 0.8)"
            }
            setTableSolution(JSON.parse(JSON.stringify(res.data.allSolution)))
        })
    }


    
    const getPicNameIdFromModal = (name, id) => {
        setPicNameFromModal([name, id])
        jsonAnswer.test[number].content[id].pic = name
    }
    

    return (
        <div className="background">
            <section id="mainBlock" className="mainBlock" style={{backgroundColor: "white"}}>
                {isModalOpened?
                    <InputModal  
                    piktogramList={modalImages[number].content}
                    isModalOpened={isModalOpened}
                    toggleModal={toggleModal}
                    modalPositions={modalPositions}
                    getPicNameIdFromModal={getPicNameIdFromModal}
                    inputId={inputId}
                    
                    />:<></>
                }
                <div className="mainCaption">
                    <div className="imgNavigation"> 
                    <Link to='/student' style={{textDecoration: 'none'}}>
                        <img className= "icon2" src={studentIcon}/>
                    </Link>
                    </div>
                    <div className="captionCaption">
                    <p className="captionText">{testsDB.nazov_testu}</p>
                    </div>
                    <div className="nameLogOut">
                            <p className="captionText">{name}</p>
                        <img className="logOut" src={logOut} onClick={logout}/>
                    </div>
                </div>
                {isSaved?
                <div className="scroll">
                    <div className="button--endTest">
                        <Button style={{width: "25%"}} onClick={() => navigate("/student")} className="blueButtons">Ukončiť prehľad</Button>
                    </div>
                    <Table
                        tableSolution={tableSolution}
                        isTeacher={false}
                    />
                </div>
                :
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
                        </div>
                    </div>
                    <div className="timer">
                        <div className="timer--items">
                            <div>
                            <span>{minutes}</span> : <span>{seconds}</span>
                            </div>
                            <Button onClick={handleShow} className="greenButtons">Odovzdať</Button>
                        </div>
                    </div>
                </div>
                }
                <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered={true}
                >
                <Modal.Header closeButton className="informationModal">
                    <Modal.Title>Odovzdať test?</Modal.Title>
                </Modal.Header>
                <Modal.Body className="informationModal">
                    Po stlačení tlačidla <b>Odovzdať test</b> sa test vyhodnoti.
                    Prajete si odovzdať test?
                </Modal.Body>
                <Modal.Footer className="informationModal">
                    <Button className="delete--style" variant="secondary" onClick={handleClose}>
                    Zavrieť
                    </Button>
                    <Button className="add--style" onClick={saveTest} variant="primary">Odovzdať test</Button>
                </Modal.Footer>
                </Modal>

            </section>
        </div>
    );
}

export default PageForStudentTest;