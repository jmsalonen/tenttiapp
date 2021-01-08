import { useEffect, useState } from 'react'
import axios from 'axios'

import QuestionEdit from './QuestionEdit.js'
import QuestionUser from './QuestionUser.js'

const Question = ({ userid, courseid, examid }) => {
  const [userType, setUserType] = useState("")

  const getUser = async () => {
    await axios
      .get(`http://localhost:3001/user/${userid}`)
      .then(response => {
        setUserType(response.data[0].usertype)
      })
  }

  useEffect(() => { 
    console.log("examid: ", examid)
    getUser()
  }, [])  

  return (
    userType === 'teacher' 
    ? <QuestionEdit examid={examid} userid={userid} /> 
    : <QuestionUser examid={examid} userid={userid} />
  )
}

export default Question