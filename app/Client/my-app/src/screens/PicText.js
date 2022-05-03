import React, { useEffect, useState } from "react";
import '../styles/PicText.css'
import indian from '../styles/img/indian.png'




function PicText(props){

    const getInputValue = (event)=>{
        const inputValue = event.target.value;
        props.handleChange(props.id, inputValue);
      };
      const pictogram = props.pic

    
    //true: text do obrazkov
    //false: obrazky do textu
    return (
        <>{props.typ?
            <div className="question">
                <img className="question--obr" src={indian}/>
                <p>{props.text}</p>
            </div>
        :
        <div className="question">
                <img className="question--obr" src={require(`../styles/img/pictograms/${pictogram}.png`)}/>
                <input 
                id={props.inputId}
                onChange={getInputValue} 
                placeholder={props.answer} 
                className="question--input" 
                type="input"/>
            </div>
        }</>
    );
}

export default PicText;