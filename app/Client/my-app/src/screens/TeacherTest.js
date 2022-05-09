import React, { useState } from "react";
import '../styles/tests.css'
import testIcon from '../styles/img/testIcon.png'
import close from '../styles/img/close.png'
import {Modal, Button} from "react-bootstrap"
import Axios from "axios"
import {useNavigate} from 'react-router-dom'



function TeacherTest(props){
    const navigate = useNavigate()
    let publicate = new Date(props.datum_publikacie)
    const [isDelete, setIsDelete] = useState(false)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const deleteTest = () =>{
        Axios.post('http://localhost:3000/teacherdelete',({ id:props.id}))
        .then((res) => {
            if(res.data){
               setIsDelete(true)
               setShow(false)
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
                    <img onClick={handleShow} src={close} className="close"/>
            </div>
        :<></>}
        <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered={true}
                >
                <Modal.Header closeButton className="informationModal">
                    <Modal.Title>Spustiť test?</Modal.Title>
                </Modal.Header>
                <Modal.Body className="informationModal">
                    Po stlačení tlačidla <b>Odstraniť test</b> sa test nenavratne odstrani.
                    Prajete si odstraniť test?
                </Modal.Body>
                <Modal.Footer className="informationModal">
                    <Button className="change--question" variant="secondary" onClick={handleClose}>
                    Zavrieť
                    </Button>
                    <Button className="delete--style" onClick={deleteTest} variant="primary">Odstraniť test</Button>
                </Modal.Footer>
                </Modal>
        </>
        
    );
}

export default TeacherTest;