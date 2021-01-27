import { useEffect, useState } from 'react'
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
      .put(`http://localhost:3001/user/teacher/get/question`, data, {
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
      .put(`http://localhost:3001/user/teacher/get/choice`, data, {
        headers: {
          'authorization': `${myToken}`
        }
      })
      .then(response => {
        setChoice(response.data)
    })
  }

  const addQuestion = async () => {
    const data = {
      id: examid
    } 
    await axios
      .put(`http://localhost:3001/user/teacher/add/question/`, data, {
        headers: {
          'authorization': `${myToken}`
        }
      })
      .then(response => {
        setRefresh(!refresh)
      })
  }

  const deleteQuestion = async (id) => {
    const data = {
      id: id
    }
    await axios.put(`http://localhost:3001/user/teacher/delete/question/`, data, {
      headers: {
        'authorization': `${myToken}`
      }
    })
    .then(response => {
      setRefresh(!refresh)
    })
  }

  const addChoice = async (id) => {
    const data = {
      id: id
    } 
    await axios
      .put(`http://localhost:3001/user/teacher/add/choice/`, data, {
        headers: {
          'authorization': `${myToken}`
        }
      })
      .then(response => {
        setRefresh(!refresh)
      })
  }

  const deleteChoice = async (id) => {
    const data = {
      id: id
    }
    await axios.put(`http://localhost:3001/user/teacher/delete/choice/`, data, {
      headers: {
        'authorization': `${myToken}`
      }
    })
    .then(response => {
      setRefresh(!refresh)
    })  
  }

  const updateQuestion = async (id, value) => {
    const data = {
      id: id,
      name: value
    }
    await axios.put(`http://localhost:3001/user/teacher/update/question/`, data, {
      headers: {
        'authorization': `${myToken}`
      }
    })
    .then(response => {
      setRefresh(!refresh)
    })  
  }

  const updateChoice = async (id, value) => {
    const data = {
      id: id,
      name: value
    }
    await axios.put(`http://localhost:3001/user/teacher/update/choice/`, data, {
      headers: {
        'authorization': `${myToken}`
      }
    })
    .then(response => {
      setRefresh(!refresh)
    })
  }

  const updateCorrect = async (id, value) => {
    const data = {
      id: id,
      correct: value
    }
    await axios.put(`http://localhost:3001/user/teacher/update/correct/`, data, {
      headers: {
        'authorization': `${myToken}`
      }
    })
    setRefresh(!refresh)
  }

  useEffect(() => {
    getToken()
    getProfile()
    getQuestion()
    getChoice()
  }, [refresh, examid])

  return (
    <>
      {question.map((q, index) => 
        <Card className="kortti" key={`questioncard${index}`}> 
          <div className="sulkuNappi">
            <Button onClick={() => deleteQuestion(q.id)} color="secondary" >×</Button>
          </div>
          <TextField 
            defaultValue={q.question}
            style={ {width: '90%'} }
            onBlur={ (e) => updateQuestion(q.id, e.target.value) } 
          />
          {choice.filter(filtered => (filtered.questionid === q.id && filtered.id !== null)).map((c, index) => 
            <div key={`choiceboxes${index}`}> 
              <Checkbox
                checked={c.correct}
                style={{ color: green[500] }}
                name={q.question + " " + q.id} 
                onChange={ (e) => updateCorrect(c.id, e.target.checked) } 
              />
              <TextField 
                defaultValue={c.choice}
                style={ {width: '50%'} } 
                onBlur={ (e) => updateChoice(c.id, e.target.value) } 
              />
              <Button onClick={() => deleteChoice(c.id)} color="secondary" >×</Button>
            </div>
          )}
          <Button onClick={() => addChoice(q.id)} color="primary" >+</Button>
        </Card>
      )}
      <><Button onClick={addQuestion} color="primary" > <FormattedMessage id="question.newquestion" /> </Button></>
    </>
  )  
} 

export default QuestionEdit
