import React, { useState } from "react";
import '../styles/tests.css'
import testIcon from '../styles/img/testIcon.png'
import close from '../styles/img/close.png'
import { Button } from "react-bootstrap";
import Axios from "axios"
import {useNavigate} from 'react-router-dom'


function TeacherTest(props){
    const navigate = useNavigate()
    let publicate = new Date(props.datum_publikacie)
    const [isDelete, setIsDelete] = useState(false)
    const deleteTest = () =>{
        Axios.post('http://localhost:3000/teacherdelete',({ id:props.id}))
        .then((res) => {
            if(res.data){
               setIsDelete(true)
            }
        }) 
    }

    
    return (
        <>
        {!isDelete?
            <div className="test">
                <img src={testIcon} style={{width: "25%"}}/>
                <div className="testCaption">
                <p className="testCaptionNazov">{props.nazov_testu}</p>
                    <p className="testCaptionPopis">Vypracoval: {props.meno_ucitela}</p>
                    <p className="testCaptionPopis">Publikované: {publicate.getDate()}.{publicate.getMonth()+1}.{publicate.getFullYear()}</p>
                </div>
                <div style={{width: "25%"}}>
                    <Button onClick={() => navigate('/addTest/'+(props.id))} className="greenButtons">Upraviť</Button>
                    <Button onClick={() => navigate('/teacherRating/'+(props.nazov_testu))} className="blueButtons" >Hodnotenie</Button>
                </div>
                    <img onClick={deleteTest} src={close} className="close"/>
            </div>
        :<></>}
        </>
        
    );
}

export default TeacherTest;