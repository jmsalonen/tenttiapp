import { useEffect, useState } from 'react'
import { Button, TextField, Card } from '@material-ui/core'
import axios from 'axios'

/* LOKALISOI */

const CourseEdit = ({ token, profile }) => {
  const [myToken, setMyToken] = useState(token)
  const [myProfile, setMyProfile] = useState(profile)
  const [course, setCourse] = useState([])
  const [courseName, setCourseName] = useState('')
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

  const newCourse = async () => {
    if (courseName.length < 1) 
      return
    const data = {
      id: profile.id,
      name: courseName
    }
    await axios.put(`http://localhost:3001/user/teacher/new/course`, data, {
      headers: {
        'authorization': `${myToken}`
      }
    })
    setRefresh(!refresh)
  }

  const deleteCourse = async (courseId) => {
    const data = {
      id: courseId
    }
    await axios.put(`http://localhost:3001/user/teacher/delete/course`, data, {
      headers: {
        'authorization': `${myToken}`
      }
    })
    setRefresh(!refresh)
  }

  /* const getCourseData = async () => {
    await getMyCourse()
    await getOtherCourse()
    setRefresh(!refresh)
  } */
  useEffect(() => {
    if (!myToken)
      getToken()
    if (!myProfile)
      getProfile()
    if (myProfile) 
      getCourse()
  }, [myToken, myProfile, refresh])

  return (
    <div className="Tenttilista">
      <Card className="kortti">
        {course.map((item, index) => <div key={`coursediv${index}`}>
          <Button> {item.name} </Button>
          <Button onClick={() => deleteCourse(item.id)} color="secondary" > × </Button>
        </div>)}
        <div>
        <TextField 
          label={"Kurssin Nimi"}
          style={ {width: '50%'} } 
          onChange={ (e) => setCourseName(e.target.value) } 
        />
        </div>
        <Button 
          onClick={() => {setRefresh(!refresh); newCourse()}} 
          color="primary" >
            Uusi Kurssi
        </Button>
      </Card>
    </div>
  )
}

export default CourseEdit
