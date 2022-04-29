import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../styles/teacher.scss';
import { useNavigate } from 'react-router-dom';
import teacherIcon from '../styles/img/teacherIcon.png'
import { Button, Modal} from 'react-bootstrap';


function TeacherLogin() {

    const [show, setShow] = useState(true);

    const handleClose = () => {setShow(false); navigate('/')}

    axios.defaults.withCredentials = true;
    useEffect(()=>{
        axios.get('http://localhost:3000/teacherlogin').then((response) =>{
            if(response.data.loggedIn === true){
                navigate('/teacher')
            }
        })
    },[])
    const [inputs, setInputs] = useState({});
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [login, setLogin] = useState(false);
    const navigate = useNavigate();

    


    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputs);


        axios.post('http://localhost:3000/teacherlogin', inputs)
        .then((res) => {
            if(res.data.loggedIn){
                localStorage.setItem('teacherName', res.data.name.rows[0].meno)
                navigate('/teacher')
            }
            setLogin(res)})
        .catch(err => {
          console.error(err);
        });
        console.log(login.data)
    }




    return(
        <section>

            <Modal show={show} onHide={handleClose} centered={true} style={{borderRadius: '24px'}} >
                <Modal.Header closeButton onClick={handleClose} style={{paddingBottom: "5em", backgroundColor: "#393E46", border: '0px'}}>
                <Modal.Title className="iconPosition"><img className="icon1" src={teacherIcon}/></Modal.Title>
                </Modal.Header>
                <Modal.Body bsPrefix className="bodyModal">
                <div className="form__group field">
                    <input type="input" className="form__field" placeholder="Meno" name="username" id='name' 
                        value={inputs.username || ""}
                        onChange={handleChange}
                         />
                    <label  className="form__label">Meno</label>
                </div>
                <div className="form__group field">
                    
                    <input type="password" className="form__field" placeholder="Heslo" name="password" id='password' 
                        value={inputs.password || ""} 
                        onChange={handleChange}
                         />
                    <label  className="form__label">Heslo</label>
                </div>
                </Modal.Body>
                <Modal.Footer bsPrefix className="footerModal">
                <Button className="button-17" onClick={handleSubmit}>
                    Prihlásiť sa
                </Button>
                
                </Modal.Footer>
            </Modal>




        </section>
    );
}

export default TeacherLogin;