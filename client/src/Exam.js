import { useEffect, useState } from 'react'
import { Button } from '@material-ui/core'
import axios from 'axios'
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  Redirect,
  useParams
} from "react-router-dom";
import { FormattedMessage } from 'react-intl'

import Question from './Question.js'


const Exam = ({ token, profile }) => {
  const { path, url } = useRouteMatch()
  const [myToken, setMyToken] = useState(token)
  const [myProfile, setMyProfile] = useState(profile)
  const [exam, setExam] = useState([])
  const [examId, setExamId] = useState()
  const [refresh, setRefresh] = useState(false)
  //const [courseId, setCourseId] = useState()
  const { courseid } = useParams()

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

  const getExam = async () => {
    const data = {
      user: myProfile.id,
      course: courseid
    }
    await axios
      .put(`http://localhost:3001/user/course/exam`, data, {
        headers: {
          'authorization': `${myToken}`
        }
      })
      .then(response => {
        setExam(response.data)
    })
  }

  const addExam = async () => {
    const data = {
      user: myProfile.id,
      course: courseid
    }
    await axios
      .put(`http://localhost:3001/user/teacher/new/exam`, data, {
        headers: {
          'authorization': `${myToken}`
        }
      })
      .then(response => {
        setRefresh(!refresh)
      })
  }

  const deleteExam = async () => {
    const data = {
      id: examId
    }
    await axios.put(`http://localhost:3001/user/teacher/delete/exam`, data, {
      headers: {
        'authorization': `${myToken}`
      }
    })
  }

  useEffect(() => {
    if (!myToken)
      getToken()
    if (!myProfile)
      getProfile()
    if (myProfile)
      getExam()
  }, [myToken, myProfile, refresh])

  useEffect(() => {
    getExam()
  }, [examId, courseid])

  if (!myProfile) 
    return <>.</>
  return (
    <div className="Tenttilista">
      <div>
        {exam.map((item, index) =>  
          <Button
            //key={uuid()} 
            component={Link} 
            to={`${url}/${item.id}`}
            onClick={() => (setExamId(item.id))}
            color="primary">
              {item.name}
          </Button>)}
        {myProfile.usertype === "teacher" ? <Button onClick={() => {addExam()}} color="primary" > + </Button> : ""}
      </div>
      <Switch>
        <Route exact path={path}>
          {/* {exam.length > 0 ? <Redirect to={`${path}/1`} /> : ""} */}
        </Route>
        <Route path={`${path}/:examid`}> 
        {/* <Route path={`${path}/question`}> */}
          <Question token={myToken} profile={myProfile} />
        </Route>
      </Switch>
      {myProfile.usertype === "teacher" ? <div className="sulkuNappi"><Button component={Link} to="/exam" onClick={deleteExam} color="secondary" > <FormattedMessage id="exam.remove" /> </Button> </div> : ""}
    </div>
  )
  

/*   const { path, url } = useRouteMatch()
  const [exam, setExam] = useState([])
  const [examId, setExamId] = useState(0)
  const [userType, setUserType] = useState("")

  const getUser = async () => {
    await axios
      .get(`http://localhost:3001/user/${userid}`)
      .then(response => {
        setUserType(response.data[0].usertype)
      })
  }

  const getExam = async () => {
    const data = {
      user: userid,
      course: courseid
    }
    await axios
      .put(`http://localhost:3001/course/exam`, data)
      .then(response => {
        setExam(response.data)
    })
  }

  useEffect(() => {
    getUser()
    getExam()
  }, [])
  
  if (exam.length < 1)
    return <> {""} </>
  if (exam.length > 0)
    if (exam[0].id === null)
      return <> {""} </>
    else 
      return (
        <div className="Tenttilista">
          <div>
            {exam.map(item => 
              <Button 
                key={uuid()} 
                component={Link} 
                // to={`${url}/${item.id}`}  
                to={`${url}/question`}
                onClick={() => setExamId(item.id)}
                color="primary">
                  {item.name}
              </Button>)}
            {userType === "teacher" ? <div className="sulkuNappi"><Button color="primary" > + </Button> </div> : ""}
          </div>
          <Switch>
            <Route exact path={path}>
            </Route>
            {// <Route path={`${path}/:examid`}> }
            <Route path={`${path}/question`}>
              <Question userid={userid} courseid={courseid} examid={examId}/>
            </Route>
          </Switch>
          {userType === "teacher" ? <div className="sulkuNappi"><Button color="secondary" >Poista Tentti</Button> </div> : ""}
        </div>
      ) */
}

export default Exam