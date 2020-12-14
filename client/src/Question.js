import { useEffect, useState } from 'react'
import uuid from 'react-uuid'
import { Button, Card, TextField, Checkbox } from '@material-ui/core'
import { green } from '@material-ui/core/colors'
import axios from 'axios'
import {
  useRouteMatch,
  useParams
} from "react-router-dom";

import QuestionEdit from './QuestionEdit.js'
import QuestionUser from './QuestionUser.js'

const Question = ({userid, courseid, examid}) => {
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

  return (userType === 'teacher' ? <QuestionEdit examid={examid} /> : <QuestionUser examid={examid} />)
} 

export default Question