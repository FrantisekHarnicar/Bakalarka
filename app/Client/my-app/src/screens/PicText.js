import React, { useEffect, useState } from "react";
import '../styles/PicText.css'
import { CgClose } from "react-icons/cg";




function PicText(props){
    
    const getInputValue = (event)=>{
        const inputValue = event.target.value;
        props.handleChange(props.id, inputValue);
    };

    const handle = () => {
        const elem = document.getElementsByClassName("question");//.getElementById("input--comp1");
        let rect = elem[props.id].getBoundingClientRect();
        props.toggleModal(rect.bottom, rect.left, props.id)
    
    }
    const deletePic = () =>{
        props.deleteWord(props.id)
    }

    
    //true: text do obrazkov
    //false: obrazky do textu
    return (
        <>{props.teacherAdd?
            <div className="question--add" style={{backgroundColor: "white"}}>
                <div className="close--button--pictext">
                    <CgClose onClick={deletePic} className="close--button"/>
                </div>
                <img onClick={handle} className="question--obr--add--add" src={require(`../styles/img/pictograms/${props.pic}.png`)}/>
                <input 
                id={props.inputId}
                onChange={getInputValue} 
                placeholder={props.answer} 
                className="question--input" 
                type="input"/>
            </div>
            :
            <>{props.isTeacher?
                <>{props.typ?
                <div className="question" style={{backgroundColor: "white"}}>
                    <img className="question--obr--border" src={require(`../styles/img/pictograms/${props.pic}.png`)}/>
                    <p>{props.text}</p>
                </div>:
                <div className="question" style={{backgroundColor: "white"}}>
                    <img className="question--obr" src={require(`../styles/img/pictograms/${props.pic}.png`)}/>
                    <p className="border">{props.text}</p>
                </div>
                }</>
                :<>
            {props.typ?
                <div className="question">
                    <img onClick={handle} className="question--obr--add" src={require(`../styles/img/pictograms/${props.pic}.png`)}/>
                    <p>{props.text}</p>
                </div>
            :
            <div className="question">
                    <img className="question--obr" src={require(`../styles/img/pictograms/${props.pic}.png`)}/>
                    <input 
                    id={props.inputId}
                    onChange={getInputValue} 
                    placeholder={props.answer} 
                    className="question--input" 
                    type="input"/>
                </div>
            }</>}
            </>
        }</>
    );
}

export default PicText;