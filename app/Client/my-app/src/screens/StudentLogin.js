import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Button, Modal} from 'react-bootstrap';
import '../styles/modalStyle.scss'
import studentIcon from '../styles/img/studentIcon.png'

function StudentLogin(){
    const [show, setShow] = useState(true);

    const handleClose = () => {setShow(false); navigate('/')}
    const [name, setName] = useState('Použivateľ')
    const navigate = useNavigate();
    useEffect( () => {
        const alreadyLogin = () =>{

            if(localStorage.getItem('studentName')){
                navigate('/student')
            }
        }
        alreadyLogin()
    }, []);

    const studentName = () => {
        localStorage.setItem('studentName',name)
        navigate('/student')

    }
    return (
        <section>

            <Modal show={show} onHide={handleClose} centered={true} style={{borderRadius: '24px'}} >
                <Modal.Header style={{paddingBottom: "5em", backgroundColor: "#393E46", border: '0px'}}>
                <Modal.Title className="iconPosition"><img className="icon1" src={studentIcon}/></Modal.Title>
                </Modal.Header>
                <Modal.Body bsPrefix className="bodyModal">
                <div className="form__group field">
                    <input type="input" className="form__field" placeholder="Zadaj meno" name="name" id='name' required
                        onChange={(e) => {
                        setName(e.target.value);
                    }} />
                    <label  className="form__label">Zadaj meno</label>
                </div>
                </Modal.Body>
                <Modal.Footer bsPrefix className="footerModal">
                <Button className="button-17" onClick={studentName}>
                    Pokračovať
                </Button>
                </Modal.Footer>
            </Modal>
    
        </section>
    );
}

export default StudentLogin;