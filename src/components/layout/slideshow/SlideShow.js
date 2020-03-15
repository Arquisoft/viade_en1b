import React, { useReducer } from 'react'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'
import './SlideShow.css'


const Slideshow = props => {
    const reducer = (state, action) => {
        switch(action.type){
            case 'NEXT':
                return {picture: state.picture + 1}
            case 'PREVIOUS':
                return {picture: state.picture - 1}
        }
    }

    const [state, dispatch] = useReducer(reducer, {picture: 0})


    return (
    <div id="slideshow-container">
        <div id="slideshow-photos">
            {props.images[state.picture]}
            <div id="slideshow-buttons">
            <button onClick={() => dispatch({type: 'PREVIOUS'})}><BsArrowLeft></BsArrowLeft></button>
            <button onClick={() => dispatch({type: 'NEXT'})}><BsArrowRight></BsArrowRight></button>
        </div>
           
        </div>
        
    </div>
    )
}

export default Slideshow