import { useEffect, useState } from 'react'
import { Button, Card, TextField, Checkbox } from '@material-ui/core'
import { green } from '@material-ui/core/colors'
import axios from 'axios'
import {
  useRouteMatch,
  useParams
} from "react-router-dom";
import { FormattedMessage } from 'react-intl'

const QuestionUser = ({ token, profile, examid, userid }) => {

  const [myToken, setMyToken] = useState(token)
  const [myProfile, setMyProfile] = useState(profile)

  const [question, setQuestion] = useState([]) 
  const [choice, setChoice] = useState([]) 
  const [finished, setFinished] = useState(false)
  const [refresh, setRefresh] = useState(false)

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
    user: userid,
    exam: examid
  }
  await axios
    .put(`http://localhost:3001/user/student/get/choice`, data, {
      headers: {
        'authorization': `${myToken}`
      }
    })
    .then(response => {
      setChoice(response.data)
      setFinished(response.data[0].finished)
  })
}

  const updateAnswer = async (id, value) => {
    const data = {
      exam: examid,
      user: userid,
      choice: id,
      value: value
    }
    await axios.put(`http://localhost:3001/user/student/update/answer/`, data, {
      headers: {
        'authorization': `${myToken}`
      }
    })
    setRefresh(!refresh)
  }

  const updateFinished = async () => {
    const data = {
      exam: examid,
      user: userid
    }
    await axios.put(`http://localhost:3001/user/student/finished/`, data, {
      headers: {
        'authorization': `${myToken}`
      }
    })
    setRefresh(!refresh)
  }

  useEffect(() => {
    getQuestion()
    getChoice()
  }, [refresh, examid])

  return (
    <div>
      {question.map((q, index) => 
        <Card className="kortti" key={`questioncard${index}`}> 
          <div>
            {q.question}
            {/* // if finished then checkicon else blockicon */}
          </div>
          {choice.filter(filtered => (filtered.questionid === q.id && filtered.choiceid !== null)).map((c, index) => 
            <div key={`checkboxdivi${index}`}>
              <Checkbox
                checked={c.answer}
                disabled={ finished }
                /* onChange={ (e) => putCorrectChoice(c.choiceid, e.target.checked) }  */
                checked={c.answer}
                disabled={ finished }
                onChange={ (e) => updateAnswer(c.choiceid, e.target.checked) } 
              />
              {finished 
              ? <Checkbox 
                  style={{ color: green[500] }}
                  checked={c.correct}
                /> 
              : ""}
              <label>{c.name}</label>
            </div>
          )}
        </Card>
      )}
      <div>
        <Button onClick={updateFinished} variant="contained" color="primary" > 
          <FormattedMessage id="question.finished" /> 
        </Button>
      </div>
    </div>
  )
}

export default QuestionUser
