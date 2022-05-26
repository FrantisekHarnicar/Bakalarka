import React, { useEffect, useState } from "react";
import Axios from "axios"
import { useNavigate } from 'react-router-dom';
import teacherIcon from '../styles/img/teacherIcon.png'
import logOut from '../styles/img/logout.png'
import '../styles/addTest.css'
import {Link} from 'react-router-dom';
import {SiAddthis} from 'react-icons/si'
import Plus from '../styles/img/plus.png'
import Minus from '../styles/img/minus.png'
import TestInfo from "./TestInfo";
import { Button, Modal } from "react-bootstrap";
import PicText from "./PicText";
import DBImages from "./DBImages"
import testIcon from '../styles/img/testIcon.png'
import {useParams} from "react-router-dom"
import {BiSearchAlt2} from 'react-icons/bi'



function AddTest(){
    const nameTeacher = localStorage.getItem('teacherName')
    const [number, setNumber] = useState(0)
    const [questionCount, setQuestionCount] = useState(1)
    const [questionType, setQuestionType] = useState(false)
    const [inputId, setInputId] = useState(0)
    const [id, setId] = useState(0)
    const [imagesFromDB, setImagesFromDB] = useState([])
    Axios.defaults.withCredentials = true;
    const navigate = useNavigate();
    const[wordFromSearch ,setWordFromSearch] =useState("")
    const [saveTest, setSaveTest] = useState(false)
    let oneWord = []
    const [idToWrite, setIdToWrite] = useState(0)
    const [saveDate, setSaveDate] = useState(0)
    const [testName, setTestName] = useState("")
    const [loadedTestEditing, setLoadedTestEditing] = useState(false)
    const [counter, setCounter] = useState(0);

    const params = useParams();
    if(params.id !== "new"){
        if(!loadedTestEditing){
            Axios.post('http://localhost:3000/testEditing',({id:params.id}))
            .then((res)=>{
                let json = JSON.parse(JSON.stringify(res.data.testForEditing.rows[0].test))
                setInputId(3000)
                //setInputId(json.test[json.test.length-1].content[json.test[json.test.length-1].content.length-1].inputId)
                setId(json.test[0].content.length)
                setMainTest(json)
                setLoadedTestEditing(true)
                console.log(res.data.testForEditing.rows[0].test.length)
                setQuestionCount(res.data.testForEditing.rows[0].test.test.length)
                setTestName(res.data.testForEditing.rows[0].nazov_testu)
                
                
            })
        }
    }
    
    const [mainTest, setMainTest] = useState({
        "isDeleteAnswer":false,
        "test":[{
            "type": questionType,
            "content":[]
        }]
    })
    

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
    const postToBackend =(inputValue)=>{
        Axios.post('http://localhost:3000/searchPic',({input:inputValue}))
        .then((res)=>{
        setImagesFromDB(res.data.allImages.rows)
    })
    }
    

    const addWord = () =>{
        if(imagesFromDB[0] === undefined){
            postToBackend('')
        }
        console.log(mainTest)
        mainTest.test[number].content.push(
            {
                "id": id,
                "inputId": inputId,
                "pic": "addimage",
                "text": "Zadaj odpoveď"
            }
        )
        
        setIdFromPic(id)
        setInputId(inputId+1)
        setId(id+1)
        console.log(mainTest)
    }
    const plus = () => {
        if( questionCount-1 > number){ 
            setNumber(number+1)
            setId(mainTest.test[number+1].content.length)
            setQuestionType(mainTest.test[number+1].type)
        }
        
    }
    console.log(idToWrite)
    const minus = () => {
        if(number !== 0){
            setNumber(number-1)
            setId(mainTest.test[number-1].content.length)
            setQuestionType(mainTest.test[number-1].type)
        }
        
        
    }
    console.log(questionType)
    const addQuestion = ()=>{
        setQuestionCount(questionCount+1)
        setNumber(number+1)
        mainTest.test.push(
            {
                "type": questionType,
                "content":[]
            }
        )
        setId(0)
        console.log(mainTest)


    }
    const deleteQuestion = ()=>{
        if(number !== 0)
        setNumber(number-1)
        setQuestionCount(questionCount-1)
        delete mainTest.test[number]
        var filtered = mainTest.test.filter(function (el) {
            return el != null;
          });
        mainTest.test = filtered
        console.log(mainTest)
    }
    
    const changeQuestionType = ()=>{
        if(questionType){
            setQuestionType(false)
            mainTest.test[number].type = false
        }else{
            setQuestionType(true)
            mainTest.test[number].type = true
        }
        console.log(mainTest)
    }
    const deleteWord = (idex) =>{
        delete mainTest.test[number].content[idex]
        var filtered = mainTest.test[number].content.filter(function (el) {
            return el != null;
          });
        
        for(let i = 0; i < filtered.length; i++){
            filtered[i].id = i
        }
        setId(id-1)
        console.log(filtered)
        mainTest.test[number].content = filtered
        
    }
    console.log(mainTest)

    const handleChange = (id, inputValue) => {
        mainTest.test[number].content[id].text = inputValue
        console.log(mainTest.test)

    }
    const setIdFromPic = (id) =>{
        setIdToWrite(id)
    }
    const addPicFromSearch = (name) =>{
        setCounter(counter+1)
        setWordFromSearch(name)
        if( mainTest.test[number].content[idToWrite] !== undefined){
            mainTest.test[number].content[idToWrite].pic = name
            mainTest.test[number].content[idToWrite].text = name
        }
        
    }
    console.log(wordFromSearch)


    if(mainTest.test[number] !== undefined){
    oneWord = mainTest.test[number].content.map((item) => {
        
        return(
            <PicText
                key={item.inputId}
                inputId={item.inputId}
                id={item.id}
                pic={item.pic}
                text={item.text}
                typ={mainTest.test[number].type}
                handleChange={handleChange}
                answer={mainTest.test[number].content[item.id].text}
                setIdFromPic={setIdFromPic}
                teacherAdd={true}
                deleteWord={deleteWord}
            />
        )
    } )
    }

    const searchImages = (event) =>{
        const inputValue = event.target.value;
        postToBackend(inputValue)
        
    }

    const showSearchImages = imagesFromDB.map((item)=>{
        return(
            <DBImages
                key={item.id}
                id={item.id}
                imgName={item.nazov_piktogramu}
                addPicFromSearch={addPicFromSearch}
            />
        )
    })
    const saveTestToDB = () =>{
        let itsOK = false
        if(testName === ""){
            const element = document.getElementById("name")
            element.style.border = "3px solid #ff0000"
        }else{
            const element = document.getElementById("name")
            element.style.border = "3px solid #43C140"
            itsOK = true
        }
        if(saveDate === 0){
            const element = document.getElementById("date")
            element.style.border = "3px solid #ff0000"
        }else{
            const element = document.getElementById("date")
            element.style.border = "3px solid #43C140"
            itsOK = true
        }
        if(itsOK){
            let counter = 0
            for(let i = 0; i < mainTest.test.length; i++){
                for(let x = 0; x < mainTest.test[i].content.length; x++){
                    mainTest.test[i].content[x].inputId = counter
                    counter += 1
                }
            }
            Axios.post('http://localhost:3000/teacherAddTest',{
                nazov_testu:testName,
                meno_ucitela:nameTeacher,
                datum_publikacie:saveDate,
                test:mainTest,
                editing:loadedTestEditing,
                id:params.id
            }).then((res)=>{
                console.log("dasdasdasddsad")
                console.log(res.data.saved)
                if(res.data.saved){
                    navigate('/teacher')
                }
            }).catch(error => {
                console.log(error.response)
            });
        }
        
    }




    return(
            <div className="background">
            <section className="mainBlock">
                <div className="mainCaption">
                    <div className="imgNavigation"> 
                    <Link to='/teacher' style={{textDecoration: 'none'}}>
                        <img className= "icon2" src={teacherIcon}/>
                    </Link>
                    </div>
                    <div className="captionCaption">
                    <p className="captionText">Zostavovanie testu</p>
                    </div>
                    <div className="nameLogOut">
                        <p className="captionText">{nameTeacher}</p>
                        <img className="logOut" src={logOut} onClick={logout}/>
                    </div>
                </div>
                <div className="add--test--block">
                    <div className="navigation--search" >
                        <div className="test--navigation" style={{width: "70%"}}>
                            <img className="sipkyMinus" src={Minus} onClick={minus}/>
                            <TestInfo
                                questionCount = {questionCount}
                                currentQuestion = {number}
                            />
                            <img className="sipkyPlus" src={Plus} onClick={plus}/>
                        </div>
                        <div className="input--search">
                            <input placeholder="Hľadať..." onChange={searchImages} className="search--input" type="text"/>
                        </div>
                    </div>
                    <div className="test--search">
                    <div className="scroll--add--test" >
                        <div className="buttons--editing">
                            <Button className="buttons--editing--style delete--style" onClick={deleteQuestion}>
                                <p>Odstrániť otázku</p>
                            </Button>
                            {questionType?
                            <Button className="buttons--editing--style change--question" onClick={changeQuestionType}>
                                <p>Doplniť obrázok</p>
                            </Button>
                            :
                            <Button className="buttons--editing--style change--question" onClick={changeQuestionType}>
                                <p>Doplniť text</p>
                            </Button>
                            }
                            <Button className="buttons--editing--style add--style" onClick={addQuestion}>
                                <p>Pridať otázku</p>
                            </Button>
                            <Button className="buttons--editing--style add--style" onClick={() => setSaveTest(true)}>
                                <p>Uložiť test</p>
                            </Button>
                        </div>
                        
                        <div className="test--additing">
                            {oneWord}
                            <SiAddthis onClick={addWord} className="add--pic--button"/>
                        </div>
                    </div>
                    <div className="scroll--search--images" >
                        {showSearchImages}
                    </div>
                    </div>

                </div>

                <Modal show={saveTest} onHide={()=> setSaveTest(false)} centered={true} style={{borderRadius: '24px'}} >
                    <Modal.Header closeButton onClick={()=> setSaveTest(false)} style={{backgroundColor: "#393E46", border: '0px'}}>
                    <Modal.Title className="iconPosition"><div className="circle--icon4"><img className="icon4" src={testIcon}/></div></Modal.Title>
                    </Modal.Header>
                    <Modal.Body bsPrefix className="bodyModal--addTest">
                    <div className="label--input">
                        <label  className="lable--addTest">Názov testu</label>
                        <input id="name" type="input" className="input--addTest"  
                           onChange={(e)=>setTestName(e.target.value)}
                           value={testName}
                            />
                    </div>
                    <div className="label--input">
                    <label  className="lable--addTest">Dátum publikacie</label>
                        <input id="date" type="date" className="input--addTest" 
                           onChange={(e)=>setSaveDate(e.target.value)}
                            />
                        
                    </div>
                    </Modal.Body>
                    <Modal.Footer bsPrefix className="footerModal">
                    <Button onClick={saveTestToDB} className="button-17 greenEfect" >
                        Uložiť test
                    </Button>
                    
                    </Modal.Footer>
                </Modal>

            </section>
        </div>

    )
}
export default AddTest;