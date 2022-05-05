import React from "react";
import '../styles/addTest.css'


function DBImages(props){


    return(
            <img className="searchImages" src={require(`../styles/img/pictograms/${props.imgName}.png`)}/>

    )
}
export default DBImages;