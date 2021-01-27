import { useEffect, useState } from 'react'
import uuid from 'react-uuid'
import { Button, Card, TextField, Checkbox } from '@material-ui/core'
import { green } from '@material-ui/core/colors'
import axios from 'axios'
import {
  useRouteMatch,
  useParams
} from "react-router-dom"
import { FormattedMessage } from 'react-intl'

const QuestionEdit = ({ token, profile }) => {

  const [myToken, setMyToken] = useState(token)
  const [myProfile, setMyProfile] = useState(profile)

  useRouteMatch()
  const { examid } = useParams()

  const [question, setQuestion] = useState([]) 
  const [choice, setChoice] = useState([]) 
  const [refresh, setRefresh] = useState(false)

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



  const getQuestion = async () => {
    const data = {
      id: examid
    }
    await axios
      .put(`http://localhost:3001/user/teacher/question`, data, {
        headers: {
          'authorization': `${myToken}`
        }
      })
      .then(response => {
        setQuestion(response.data)
    })
  }

  const getChoice = async () => {
    const data = {
      id: examid
    }
    await axios
      .put(`http://localhost:3001/user/teacher/choice`, data, {
        headers: {
          'authorization': `${myToken}`
        }
      })
      .then(response => {
        setChoice(response.data)
    })
  }

  const deleteQuestion = async (id) => {
    await axios.delete(`http://localhost:3001/delete/question/${id}`)
    setRefresh(!refresh)
  }

  const deleteChoice = async (id) => {
    await axios.delete(`http://localhost:3001/delete/choice/${id}`)
    setRefresh(!refresh)
  }

  const addChoice = async (id) => {
    const data = {
      id: id,
      examid: examid
    } 
    await axios.put(`http://localhost:3001/edit/add/choice/`, data)
    setRefresh(!refresh)
  }

  const postQuestion = async () => {
    await axios.post(`http://localhost:3001/add/question/${examid}`)
    setRefresh(!refresh)
  }

  const putQuestion = async (id, value) => {
    const data = {
      id: id,
      name: value,
      examid: examid
    }
    await axios.put(`http://localhost:3001/edit/update/question/`, data)
    setRefresh(!refresh)
  }

  const putChoice = async (id, value) => {
    const data = {
      id: id,
      name: value,
      examid: examid
    }
    await axios.put(`http://localhost:3001/edit/update/choice/`, data)
    setRefresh(!refresh)
  }

  const putCorrect = async (id, value) => {
    const data = {
      id: id,
      correct: value,
      examid: examid
    }
    await axios.put(`http://localhost:3001/edit/update/correct/`, data)
    setRefresh(!refresh)
  } 
  useEffect(() => {
    getToken()
    getProfile()
  }, [])

  useEffect(() => {
    getToken()
    getProfile()
    getQuestion()
    getChoice()
    console.log(examid)
  }, [refresh, examid])

  //console.log('question length: ', question.length)
  
  if (question.length < 1) {
    return <></>
  }
  return (
    <>
      {question.map(q => 
        <Card className="kortti"> 
          <div className="sulkuNappi">
            <Button onClick={() => deleteQuestion(q.id)} color="secondary" >×</Button>
          </div>
          <TextField 
            defaultValue={q.question}
            style={ {width: '90%'} }
            onBlur={ (e) => putQuestion(q.id, e.target.value) } 
          />
          {choice.filter(filtered => (filtered.questionid === q.id && filtered.id !== null)).map(c => 
            <div> 
              <Checkbox
                //key={uuid()} 
                checked={c.correct}
                style={{ color: green[500] }}
                //id={uuid()}
                name={q.question + " " + q.id} 
                onChange={ (e) => putCorrect(c.id, e.target.checked) } 
              />
              <TextField 
                defaultValue={c.choice}
                style={ {width: '50%'} } 
                onBlur={ (e) => putChoice(c.id, e.target.value) } 
              />
              <Button onClick={() => deleteChoice(c.id)} color="secondary" >×</Button>
            </div>
          )}
          <Button onClick={() => addChoice(q.id)} color="primary" >+</Button>
        </Card>
      )}
      <><Button onClick={postQuestion} color="primary" > <FormattedMessage id="question.newquestion" /> </Button></>
    </>
  )  
} 

export default QuestionEdit
