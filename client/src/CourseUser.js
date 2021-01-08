import { useEffect, useState } from 'react'
import uuid from 'react-uuid'
import { Button, TextField, Card } from '@material-ui/core'
import axios from 'axios'

const CourseUser = ({ token, profile }) => {
  const [myCourse, setMyCourse] = useState([])
  const [otherCourse, setOtherCourse] = useState([])
  const [refresh, setRefresh] = useState(false)

  const getMyCourse = async () => {
    const data = {
      id: profile.id
    }
    await axios
      .put(`http://localhost:3001/mycourse`, data)
      .then(response => {
        setMyCourse(response.data)
    })
    setRefresh(!refresh)
  }

  const getOtherCourse = async () => {
    const data = {
      id: profile.id
    }
    await axios
      .put(`http://localhost:3001/othercourse`, data)
      .then(response => {
        setOtherCourse(response.data)
    })
    setRefresh(!refresh)
  }

  const joinCourse = async (courseId) => {
    const data = {
      userid: profile.id,
      courseid: courseId
    }
    console.log(courseId)
    await axios.put(`http://localhost:3001/joincourse`, data)
    setRefresh(!refresh)
  }
  const leaveCourse = async (courseId) => {
    const data = {
      userid: profile.id,
      courseid: courseId
    }
    console.log(courseId)
    await axios.put(`http://localhost:3001/leavecourse`, data)
    setRefresh(!refresh)
  }

  useEffect(() => {
    getMyCourse()
    getOtherCourse()
  }, [refresh])

  return (
    <div className="Tenttilista">
      <Card className="kortti">
        Minun Kurssini
        {myCourse.map(item => <div ><Button onClick={() => leaveCourse(item.id)}> {item.name} </Button></div>)}
        <hr />
        Muut Kurssit
        {otherCourse.map(item => <div ><Button onClick={() => joinCourse(item.id)}> {item.name} </Button></div>)}
      </Card>
    </div>
  )
}

export default CourseUser
