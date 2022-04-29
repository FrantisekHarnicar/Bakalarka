import React, { useEffect, useState } from "react";
import '../styles/tests.css'
import testIcon from '../styles/img/testIcon.png'
import { Button } from "react-bootstrap";



function StudentTest(props){
    let publicate = new Date(props.datum_publikacie)
    

    return (
        
                <div className="test">
                    <img src={testIcon} style={{width: "23%"}}/>
                    <div className="testCaption">
                        <p className="testCaptionNazov">{props.nazov_testu}</p>
                        <p className="testCaptionPopis">Vypracoval: {props.meno_ucitela}</p>
                        <p className="testCaptionPopis">Publikované: {publicate.getDate()}.{publicate.getMonth()+1}.{publicate.getFullYear()}</p>
                    </div>
                    <Button className="greenButtons">Vypracovať</Button>
                </div>
        
    );
}

export default StudentTest;