import React, { useState, useEffect } from "react";
import ViadeModal from "../modal/Modal.js";
import { connect } from "react-redux";
import "../comments/Comments.css"
export  function Comments(props) {

    const [state, setState] = useState({});
        
    const CommentButtonText =<span data-testid="Leave-Cooment-text">Leave a comment</span>;
    const handleOpen = () => {
        setState( {...state, 
            theRoute: props.selectedRoute.name
        })
    }
    const handleOnSave = () =>{
        if(state.comment != null && state.comment!="")
        {
        //Call whatever function to save the comment
        // The comment is save in state.comment
        }

    }
    const handlerTextArea = (event) =>{
        //Call whatever function to save the comment
        setState({ ...state, comment: event.target.value})
    }

    return(
        <div className="GeneralComponent" data-testid="general-component">
            <ViadeModal data-testid="Modal-component"
             disabled={false}
             toggleText="Comment"
             title={"Write a comment for "+ state.theRoute + " route"}
             closeText="Close"
             onOpen={handleOpen}
             handleClose={() => {}}
             saveText={CommentButtonText}
             onSave={handleOnSave}
             
            >
                <form id="myForm" data-testid="form-component">
                    <label data-testid="label-component">
                        Comment:<br></br>
                        <textarea id="myTextArea" data-testid="textarea-component"onChange={handlerTextArea}></textarea>
                    </label>
                </form>
            </ViadeModal>
        </div>
    );

}

const mapStateToProps = theState => {
    return {
      selectedRoute: theState.route.selectedRoute
    };
  };
  
 
  export default connect(mapStateToProps)(Comments);
  
