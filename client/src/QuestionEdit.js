import { useEffect, useState } from 'react'
import uuid from 'react-uuid'
import { Button, Card, TextField, Checkbox } from '@material-ui/core'
import { green } from '@material-ui/core/colors'
import axios from 'axios'
import {
  useRouteMatch,
  useParams
} from "react-router-dom";

const QuestionEdit = ({examid}) => {
  useRouteMatch()
  //const { examid } = useParams()

  const [question, setQuestion] = useState([]) 
  const [choice, setChoice] = useState([]) 
  const [refresh, setRefresh] = useState(false)

  const getQuestion = async () => {
    await axios
      .get(`http://localhost:3001/exam/${examid}/question`)
      .then(response => {
        setQuestion(response.data)
    })
  }

  const getChoice = async () => {
    await axios
      .get(`http://localhost:3001/exam/${examid}/choice`)
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

  const postChoice = async (id) => {
    await axios.post(`http://localhost:3001/add/choice/${id}`)
    setRefresh(!refresh)
  }

  const postQuestion = async () => {
    await axios.post(`http://localhost:3001/add/question/${examid}`)
    setRefresh(!refresh)
  }

  const putQuestion = async (id, value) => {
    const data = {
      id: id,
      name: value
    }
    await axios.put(`http://localhost:3001/update/question/`, data)
    setRefresh(!refresh)
  }

  const putChoice = async (id, value) => {
    const data = {
      id: id,
      name: value
    }
    await axios.put(`http://localhost:3001/update/choice/`, data)
    setRefresh(!refresh)
  }

  const putCorrectChoice = async (id, value) => {
    const data = {
      id: id,
      correct: value
    }
    await axios.put(`http://localhost:3001/update/correct/`, data)
    setRefresh(!refresh)
  }

  useEffect(() => {
    getQuestion()
    getChoice()
  }, [refresh, examid])

  return (
    <>
      {question.map(q => 
        <Card key={uuid()} className="kortti"> 
          <div className="sulkuNappi">
            <Button onClick={() => deleteQuestion(q.id)} color="secondary" >×</Button>
          </div>
          <TextField 
            defaultValue={q.question}
            style = { {width: '90%'} }
            onBlur={ (e) => putQuestion(q.id, e.target.value) } 
          />
          {choice.filter(filtered => (filtered.questionid === q.id && filtered.id !== null)).map(c => 
            <div key={uuid()}>
              <Checkbox
                key={uuid()} 
                checked={c.correct}
                style={{ color: green[500] }}
                id={uuid()}
                name={q.question + " " + q.id} 
                onChange={ (e) => putCorrectChoice(c.id, e.target.checked) } 
              />
              <TextField 
                defaultValue={c.choice}
                style={ {width: '50%'} } 
                onBlur={ (e) => putChoice(c.id, e.target.value) } 
              />
              <Button onClick={() => deleteChoice(c.id)} color="secondary" >×</Button>
            </div>
          )}
          <Button onClick={() => postChoice(q.id)} color="primary" >+</Button>
        </Card>
      )}
      <><Button onClick={postQuestion} color="primary" >Uusi Kysymys</Button></>
    </>
  )
} 

export default QuestionEdit
