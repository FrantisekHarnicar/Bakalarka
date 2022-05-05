import React, { useEffect } from 'react';
import '../styles/App.css';
import { CgClose } from "react-icons/cg";

const InputModal = (props) => {
  console.log(props)

    
  useEffect(() => {
    const elem = document.getElementById("input--modal");
    const size = getWindowDimensions()
    
    if(elem){
      elem.style.display = 'initial'
      if (props.modalPositions[1] + 250 > size.height){
        elem.style.left = `${props.modalPositions[0] - 75}px`;
        elem.style.top = `${props.modalPositions[1] - 380}px`;
      } else {
        elem.style.left = `${props.modalPositions[0] - 185}px`;
        elem.style.top = `${props.modalPositions[1] - 20}px`;
      }
    }

  }, [])

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }

  let picCounter = 0
  const piktogramList = props.piktogramList.map(item => {
    return (
      picCounter += 1,
      <img  
            key={picCounter}
            className='input--modal--img' 
            src={require(`../styles/img/pictograms/${item.pic}.png`)} 
            onClick={
              () => {
                props.getPicNameIdFromModal(item.pic, props.inputId);
                props.toggleModal()
              }
            }
          />
    )
  } )
  
  
  return (
    <>
    { 
      <div className='input--modal' id='input--modal'>
        <div className='input--modal--header'>
          <CgClose className='x--button' onClick={props.toggleModal}/>
        </div>
        <div className='input--modal--imgs'>
          {piktogramList}
        </div> 
      </div>
    }
    </>
  )
}

export default InputModal