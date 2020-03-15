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
            default: 
                return null
        }
    }

    const [state, dispatch] = useReducer(reducer, {picture: 0})

    const previousButton = state.picture === 0 
                        ? <button disabled onClick={() => dispatch({type: 'PREVIOUS'})}><BsArrowLeft></BsArrowLeft></button>
                        : <button onClick={() => dispatch({type: 'PREVIOUS'})}><BsArrowLeft></BsArrowLeft></button>
            
    const nextButton = state.picture === props.images.length - 1 
                        ? <button disabled onClick={() => dispatch({type: 'NEXT'})}><BsArrowRight></BsArrowRight></button>
                        : <button onClick={() => dispatch({type: 'NEXT'})}><BsArrowRight></BsArrowRight></button>
            
    const pictures = props.images.length === 0 ? 'There are no media elements' : props.images[state.picture]

    const buttons = props.images.length === 0 ? null : <div id="slideshow-buttons">{previousButton}{nextButton}</div>

    return (
    <div id="slideshow-container">
        <div id="slideshow-photos">
            {pictures}
            {buttons}
           
        </div>
        
    </div>
    )
}

export default Slideshow