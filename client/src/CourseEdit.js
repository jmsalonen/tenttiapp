import { useEffect, useState } from 'react'
import uuid from 'react-uuid'
import { Button, TextField, Card } from '@material-ui/core'
import axios from 'axios'

const CourseEdit = ({ token, profile }) => {
  const [myCourse, setMyCourse] = useState([])
  const [otherCourse, setOtherCourse] = useState([])
  const [courseName, setCourseName] = useState('')
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
  }

  const newCourse = async () => {
    const data = {
      id: profile.id,
      name: courseName
    }
    await axios.put(`http://localhost:3001/newcourse`, data)
    setRefresh(!refresh)
  }

  const deleteCourse = async (courseId) => {
    const data = {
      id: courseId
    }
    console.log(courseId)
    await axios.put(`http://localhost:3001/deletecourse`, data)
    setRefresh(!refresh)
  }

  /* const getCourseData = async () => {
    await getMyCourse()
    await getOtherCourse()
    setRefresh(!refresh)
  } */

  useEffect(() => {
    getMyCourse()
    getOtherCourse()
  }, [refresh])

  const pickCourse =   () => {
    console.log("picked")
  }

  return (
    <div className="Tenttilista">
      <Card className="kortti">
        {myCourse.map(item => <div>
          <Button onClick={pickCourse}> {item.name} </Button>
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
          onClick={newCourse} 
          color="primary" >
            Uusi Kurssi
        </Button>
      </Card>
    </div>
  )
}

export default CourseEdit
