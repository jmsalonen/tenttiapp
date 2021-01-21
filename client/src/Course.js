import { useEffect, useState } from 'react'
import axios from 'axios'

import CourseEdit from './CourseEdit.js'
import CourseUser from './CourseUser.js'

const Course = ({ token, profile }) => {
  const [myToken, setMyToken] = useState(token)
  const [myProfile, setMyProfile] = useState(profile)

  const getToken = async () => {
    setMyToken(localStorage.getItem('token'))
  }

  const getProfile = async () => {
    axios
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

  if (myProfile === undefined)
    return <></>

  return (
    myProfile.usertype === 'teacher' 
    ? <CourseEdit token={myToken} profile={myProfile} /> 
    : <CourseUser token={myToken} profile={myProfile} />
  )
}

export default Course
