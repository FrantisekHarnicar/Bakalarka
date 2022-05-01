import React, { useEffect, useState } from "react";
import '../styles/tests.css'
import testIcon from '../styles/img/testIcon.png'
import { Button } from "react-bootstrap";
import {useNavigate} from 'react-router-dom'



function StudentTest(props){
    const navigate = useNavigate()
    let publicate = new Date(props.datum_publikacie)
    const clic = () =>{
        navigate('/studentTest/'+(props.id))
    }

    return (
        
                <div className="test">
                    <img src={testIcon} style={{width: "23%"}}/>
                    <div className="testCaption">
                        <p className="testCaptionNazov">{props.nazov_testu}</p>
                        <p className="testCaptionPopis">Vypracoval: {props.meno_ucitela}</p>
                        <p className="testCaptionPopis">Publikované: {publicate.getDate()}.{publicate.getMonth()+1}.{publicate.getFullYear()}</p>
                    </div>
                    <Button onClick={clic} className="greenButtons">Vypracovať</Button>
                </div>
        
    );
}

export default StudentTest;