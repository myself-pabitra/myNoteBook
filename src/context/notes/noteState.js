import React, { useState } from "react";

import NoteContext from "./noteContext";

const NoteState = (props)=>{
const notesInitial = [
    {
      "_id": "64645d5841d6db59303159e4",
      "user": "64632b8da0a50551099f4ea4",
      "title": "This is first note",
      "description": "This is the description about the first note",
      "tag": "Personal",
      "timeStamp": "2023-05-17T04:51:36.436Z",
      "__v": 0
    },
    {
      "_id": "646465e424637341f4b6924a",
      "user": "64632b8da0a50551099f4ea4",
      "title": "This is first note",
      "description": "This is the description about the first note",
      "tag": "Personal",
      "timeStamp": "2023-05-17T05:28:04.730Z",
      "__v": 0
    },
    {
      "_id": "64645d5841d6db59303159e4",
      "user": "64632b8da0a50551099f4ea4",
      "title": "This is first note",
      "description": "This is the description about the first note",
      "tag": "Personal",
      "timeStamp": "2023-05-17T04:51:36.436Z",
      "__v": 0
    },
    {
      "_id": "64645d5841d6db59303159e4",
      "user": "64632b8da0a50551099f4ea4",
      "title": "This is first note",
      "description": "This is the description about the first note",
      "tag": "Personal",
      "timeStamp": "2023-05-17T04:51:36.436Z",
      "__v": 0
    },
    {
      "_id": "64645d5841d6db59303159e4",
      "user": "64632b8da0a50551099f4ea4",
      "title": "This is first note",
      "description": "This is the description about the first note",
      "tag": "Personal",
      "timeStamp": "2023-05-17T04:51:36.436Z",
      "__v": 0
    },
    {
      "_id": "64645d5841d6db59303159e4",
      "user": "64632b8da0a50551099f4ea4",
      "title": "This is first note",
      "description": "This is the description about the first note",
      "tag": "Personal",
      "timeStamp": "2023-05-17T04:51:36.436Z",
      "__v": 0
    },
  ]
const [notes, setNotes] = useState(notesInitial)
return(
    <NoteContext.Provider value = {{notes,setNotes}}>
        {props.children}
    </NoteContext.Provider>
)
}

export default NoteState;