import React from "react";

const QuestionSection = (props) => {
    return ( 
        <div>
        <h1>{props.questionText}</h1>
        {props.shortDesc ?
          <div class="shortDesc"><p>{props.shortDesc}</p></div>
        :
          <></>
        }
        {props.longDesc ? 
          <div class="longDesc"><details><summary>Learn more about this question</summary>{props.longDesc}</details></div>
        :
          <></>
        }
        <br />
        {props.children}
        </div>
        
    );
}

export default QuestionSection;