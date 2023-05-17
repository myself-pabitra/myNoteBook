import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
const About = () => {
  const a = useContext(noteContext)
  return (
    <div>
      <h1>This is About</h1>
      <p>{a.name}</p>
    </div>
  )
}

export default About
