import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../styles/teacher.scss';
import { useNavigate } from 'react-router-dom';


function Teacher() {
    axios.defaults.withCredentials = true;
    useEffect(()=>{
        axios.get('http://localhost:3000/teacher').then((response) =>{
            if(response.data.loggedIn === true){
                navigate('/student')
            }
        })
    },[])
    const [inputs, setInputs] = useState({});
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


        axios.post('http://localhost:3000/teacher', inputs)
        .then((res) => {
            if(res.data){
                navigate('/student')
            }
            setLogin(res)})
        .catch(err => {
          console.error(err);
        });
        console.log(login.data)
    }




    return(
        <section>
            <div >
                <form onSubmit={handleSubmit}>
                    <label>Meno:
                        <input 
                            type="text" 
                            name="username" 
                            value={inputs.username || ""} 
                            onChange={handleChange}
                        />
                    </label>
                    <label>Heslo:
                        <input 
                        type="password" 
                        name="password" 
                        value={inputs.password || ""} 
                        onChange={handleChange}
                        />
                    </label>
                    <input type="submit"

                    />
                </form>
            </div>
        </section>
    );
}

export default Teacher;