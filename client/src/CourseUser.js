import { useEffect, useState } from 'react'
import { Button, Card } from '@material-ui/core'
import axios from 'axios'

const CourseUser = ({ token, profile }) => {
  const [myToken, setMyToken] = useState(token)
  const [myProfile, setMyProfile] = useState(profile)

  const [course, setCourse] = useState([])
  const [otherCourse, setOtherCourse] = useState([])
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
        localStorage.setItem('profile', JSON.stringify(response.data))
    })
  }

  const getCourse = async () => {
    const data = {
      id: myProfile.id
    }
    await axios
      .put(`http://localhost:3001/user/course`, data, {
        headers: {
          'authorization': `${myToken}`
        }
      })
      .then(response => {
        setCourse(response.data)
      })
  }

  const getOtherCourse = async () => {
    const data = {
      id: profile.id
    }
    await axios
      .put(`http://localhost:3001/user/student/courses/other`, data, {
        headers: {
          'authorization': `${myToken}`
        }
      })
      .then(response => {
        setOtherCourse(response.data)
    })
  }

  const joinCourse = async (courseId) => {
    const data = {
      userid: profile.id,
      courseid: courseId
    }
    await axios.put(`http://localhost:3001/user/student/courses/join`, data, {
      headers: {
        'authorization': `${myToken}`
      }
    })
    setRefresh(!refresh)
  }

  const leaveCourse = async (courseId) => {
    const data = {
      userid: profile.id,
      courseid: courseId
    }

    await axios.put(`http://localhost:3001/user/student/courses/leave`, data, {
      headers: {
        'authorization': `${myToken}`
      }
    })
    setRefresh(!refresh)
  }

  useEffect(() => {
/*     if (!myToken)
      getToken()
    if (!myProfile)
      getProfile() */
    getCourse()
    getOtherCourse()
  }, [])

  return (
    <div className="Tenttilista">
      <Card className="kortti">
        <Button onClick={() => getProfile()}> 
          testi
        </Button>
        Minun Kurssini
        {course.map((item, index) => 
          <div key={`course${index}`}>
            <Button onClick={() => leaveCourse(item.id)}> 
              {item.name} 
            </Button>
          </div>)}
        <hr />
        Muut Kurssit
        {otherCourse.map((item, index) => 
          <div key={`other${index}`}>
            <Button onClick={() => joinCourse(item.id)}> 
              {item.name} 
            </Button>
          </div>)}
      </Card>
    </div>
  )
}

export default CourseUser
