import React from "react"
import Axios from "axios"
import { useNavigate } from 'react-router-dom';
function Teacher(){
    const nameTeacher = localStorage.getItem('teacherName')
    Axios.defaults.withCredentials = true;
    const navigate = useNavigate();
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
    return(
        <div>
            <h1>dadasdasdasdasd asdasd ds asd asdas das</h1>
            <button onClick={logout}>Odhlásenie</button>
            <p>{nameTeacher}</p>
        </div>

    )
}
export default Teacher;