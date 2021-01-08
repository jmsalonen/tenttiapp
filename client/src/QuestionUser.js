import { useEffect, useState } from 'react'
import uuid from 'react-uuid'
import { Button, Card, TextField, Checkbox } from '@material-ui/core'
import { green } from '@material-ui/core/colors'
import axios from 'axios'
import {
  useRouteMatch,
  useParams
} from "react-router-dom";

const QuestionUser = ({examid, userid}) => {

  const [question, setQuestion] = useState([]) 
  const [choice, setChoice] = useState([]) 
  const [finished, setFinished] = useState(false)
  const [answer, setAnswer] = useState([])
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
      .get(`http://localhost:3001/exam/${examid}/answer/${userid}`)
      .then(response => {
        setChoice(response.data)
        //setFinished(response.data[0].finished)
        //console.log(response.data[0])
    })
  }

  const putAnswer = async (id, value) => {
    const data = {
      exam: examid,
      user: userid,
      choice: id,
      value: value
    }
    await axios.put(`http://localhost:3001/update/answer/`, data)
    setRefresh(!refresh)
  }

  const putFinished = async () => {
    const data = {
      exam: examid,
      user: userid
    }
    await axios.put(`http://localhost:3001/finished/`, data)
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
          <div>
            {q.question}
            {/* // if finished then checkicon else blockicon */}
          </div>
          {choice.filter(filtered => (filtered.questionid === q.id && filtered.choiceid !== null)).map(c => 
            <div key={uuid()}>
              <Checkbox
                /* checked={c.answer}
                disabled={ finished }
                id={uuid()} */
                /* onChange={ (e) => putCorrectChoice(c.choiceid, e.target.checked) }  */
                checked={c.answer}
                disabled={ finished }
                onChange={ (e) => putAnswer(c.choiceid, e.target.checked) } 
              />
              <Checkbox 
                style={{ color: green[500] }}
                checked={c.correct}
              /> 
              <label>{c.name}</label>
            </div>
          )}
        </Card>
      )}
      <><Button onClick={putFinished} variant="contained" color="primary" > Valmis </Button></>
    </>
  )
}

export default QuestionUser
