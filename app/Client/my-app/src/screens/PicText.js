import React, { useEffect, useState } from "react";
import '../styles/PicText.css'
import indian from '../styles/img/indian.png'




function PicText(props){

    //true: pic to text
    //false: text to pic
    return (
        <>{props.typ?
            <div className="question">
                <img className="question--obr" src={indian}/>
                <p>{props.text}</p>
            </div>
        :
        <div className="question">
                <img className="question--obr" src={indian}/>
                <input className="question--input" type="input"/>
            </div>
        }</>
    );
}

export default PicText;