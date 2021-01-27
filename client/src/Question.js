import { useEffect, useState } from 'react'
import axios from 'axios'

import QuestionEdit from './QuestionEdit.js'
import QuestionUser from './QuestionUser.js'
import { useParams } from 'react-router-dom'

const Question = ({ token, profile }) => {
  const [myToken, setMyToken] = useState(token)
  const [myProfile, setMyProfile] = useState(profile)
//  const [examId, setExamId] = useState(examid)
  const { examid } = useParams()


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
    if (!myToken)
      getToken()
    if (!myProfile)
      getProfile()
  }, [myToken, myProfile])
  
  return (
    myProfile.usertype === 'teacher' 
    ? <QuestionEdit token={myToken} profile={myProfile} /> 
    : <QuestionUser token={myToken} profile={myProfile} examid={examid} userid={myProfile.id} />
  )
}

export default Question