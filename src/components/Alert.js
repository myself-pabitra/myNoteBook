import React from "react";

export default function Alert(props) {


    const Capitalize = (word)=>{
      if(word === "danger"){
        word = "Error";
      }
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
  return (
    <div className="col-12 mx-auto" style = {{height : '50px',width:'50%'}}>
   {
      props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
      <strong>{Capitalize(props.alert.type)}</strong> : {props.alert.msg}
      </div>
    }
    </div>
 
  );
}
