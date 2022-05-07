import React from "react";
import '../styles/addTest.css'



function DBImages(props){
    

    return(
            <img className="searchImages" onClick={()=> props.addPicFromSearch(props.imgName)}  
            src={require(`../styles/img/pictograms/${props.imgName}.png`)}/>
    )
}
export default DBImages;