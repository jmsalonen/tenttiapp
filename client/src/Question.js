import { useEffect, useState } from 'react'
import axios from 'axios'

import QuestionEdit from './QuestionEdit.js'
import QuestionUser from './QuestionUser.js'

const Question = ({ token, profile, examid }) => {
  const [myToken, setMyToken] = useState(token)
  const [myProfile, setMyProfile] = useState(profile)
  const [examId, setExamId] = useState(examid)


  const getToken = async () => {
    setMyToken(localStorage.getItem('token'))
  }

  const getProfile = async () => {
    await axios
      .get(`http://localhost:3001/user/profile`, {
        headers: {
          'authorization': `${myToken}`
        }
      })
      .then(response => {
        setMyProfile(response.data)
    })
  }

  useEffect(() => {
    if (!token)
      getToken()
    if (!profile)
      getProfile()
    if (!examId)
      setExamId(localStorage.getItem('exam'))
  }, [myToken, myProfile])
  
  return (
    myProfile.usertype === 'teacher' 
    ? <QuestionEdit examid={examId} /> 
    : <QuestionUser examid={examId} userid={myProfile.id} />
  )
}

export default Question