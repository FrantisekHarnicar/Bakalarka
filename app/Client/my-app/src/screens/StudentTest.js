import React, { useEffect, useState } from "react";
import '../styles/tests.css'
import testIcon from '../styles/img/testIcon.png'
import {useNavigate} from 'react-router-dom'
import {Modal, Button} from "react-bootstrap"


function StudentTest(props){
    const navigate = useNavigate()
    let publicate = new Date(props.datum_publikacie)
    const clic = () =>{
        navigate('/studentTest/'+(props.id))
    }
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        
        <div className="test">
            <img src={testIcon} style={{width: "23%"}}/>
            <div className="testCaption">
                <p className="testCaptionNazov">{props.nazov_testu}</p>
                <p className="testCaptionPopis">Vypracoval: {props.meno_ucitela}</p>
                <p className="testCaptionPopis">Publikované: {publicate.getDate()}.{publicate.getMonth()+1}.{publicate.getFullYear()}</p>
            </div>
            <Button onClick={handleShow} className="greenButtons">Vypracovať</Button>
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
                    Po stlačení tlačidla <b>spustiť test</b> sa otvorí test a spusti časomiera.
                    Prajete si spustiť test?
                </Modal.Body>
                <Modal.Footer className="informationModal">
                    <Button className="delete--style" variant="secondary" onClick={handleClose}>
                    Zavrieť
                    </Button>
                    <Button className="add--style" onClick={clic} variant="primary">Spustiť test</Button>
                </Modal.Footer>
                </Modal>
        </div>
        
    );
}

export default StudentTest;