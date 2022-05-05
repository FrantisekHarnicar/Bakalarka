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
import { Button } from "react-bootstrap";
import PicText from "./PicText";
import DBImages from "./DBImages"

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
    let oneWord = []
    
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

    const addWord = () =>{
        console.log(mainTest)
        mainTest.test[number].content.push(
            {
                "id": id,
                "inputId": inputId,
                "pic": "addimage",
                "text": "Zadaj odpoveď"
            }
        )
        setInputId(inputId+1)
        setId(id+1)
        console.log(mainTest)
    }
    const plus = () => {
        if( questionCount-1 > number){ 
            setNumber(number+1)
        }
        setId(mainTest.test[number+1].content.length)
        setQuestionType(mainTest.test[number+1].type)
    }
    const minus = () => {
        if(number !== 0){
            setNumber(number-1)
        }
        setId(mainTest.test[number-1].content.length)
        setQuestionType(mainTest.test[number-1].type)
        
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



    if(mainTest !== undefined){
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
                /* toggleModal={toggleModal}
                picNameFromModal={picNameFromModal} */
                teacherAdd={true}
                deleteWord={deleteWord}
            />
        )
    } )
}

const searchImages = (event) =>{
    const inputValue = event.target.value;
    Axios.post('http://localhost:3000/searchPic',({input:inputValue}))
    .then((res)=>{
        setImagesFromDB(res.data.allImages.rows)
    })
}

const showSearchImages = imagesFromDB.map((item)=>{
    return(
        <DBImages
            key={item.id}
            imgName={item.nazov_piktogramu}
        />
    )
})








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
                        <input onChange={searchImages} className="search--input" type="text"/>

                    </div>
                    <div className="test--search">
                    <div className="scroll--add--test" >
                        <div className="buttons--editing">
                            <Button onClick={deleteQuestion}>
                                <p>Odstrániť otázku</p>
                            </Button>
                            {questionType?
                            <Button onClick={changeQuestionType}>
                                <p>Doplniť obrázok</p>
                            </Button>
                            :
                            <Button onClick={changeQuestionType}>
                                <p>Doplniť text</p>
                            </Button>
                            }
                            <Button onClick={addQuestion}>
                                <p>Pridať otázku</p>
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

            </section>
        </div>

    )
}
export default AddTest;