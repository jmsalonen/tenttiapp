import { useEffect, useState } from 'react'
import uuid from 'react-uuid'
import { Button, Card, TextField, Checkbox } from '@material-ui/core'
import { green } from '@material-ui/core/colors'
import axios from 'axios'
import {
  useRouteMatch,
  useParams
} from "react-router-dom";

const QuestionUser = ({examid}) => {

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
          {choice.filter(filtered => (filtered.questionid === q.id && filtered.id !== null)).map(c => 
            <div key={uuid()}>
              <Checkbox
                /* checked={}
                disabled={ finished }
                id={uuid()} */
                /* onChange={ (e) => putCorrectChoice(c.id, e.target.checked) }  */
              />
              <Checkbox 
                style={{ color: green[500] }}
                checked={c.correct}
              /> 
              <label>{c.choice}</label>
            </div>
          )}
        </Card>
      )}
      <><Button variant="contained" color="primary" > Valmis </Button></>
    </>
  )
}

export default QuestionUser
