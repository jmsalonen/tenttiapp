import { useEffect, useState } from 'react'
import { Button, Card } from '@material-ui/core'
import { Link } from "react-router-dom";
import axios from 'axios'

const Home = ({ token, profile }) => {
  const [myToken, setMyToken] = useState(token)
  const [myProfile, setMyProfile] = useState(profile)
  const [myCourse, setMyCourse] = useState([])
  
  const getToken = async () => {
    setMyToken(localStorage.getItem('token'))
  }

  const getProfile = async () => {
    axios
      .get(`http://localhost:3001/user/profile`, {
        headers: {
          'authorization': `${myToken}`
        }
      })
      .then(response => {
        setMyProfile(response.data)
    })
  }

  const getMyCourse = async () => {
    const data = {
      id: myProfile.id
    }
    await axios
      .put(`http://localhost:3001/mycourse`, data)
      .then(response => {
        setMyCourse(response.data)
    })
  }

  useEffect(() => {
    if (!token)
      getToken()
    if (!profile)
      getProfile()
    if (myProfile)
      getMyCourse()
  }, [myToken, myProfile])

  const pickCourse = (courseId) => {
    localStorage.setItem('course', courseId)
    console.log('picked', courseId)
  }

  if (myProfile === undefined)
    return <></>

  return (
    <div className="Tenttilista">
      <Card className="kortti">
        <div>
          {myProfile.id} | {myProfile.name} | {myProfile.email} | {myProfile.usertype} <br />
        </div>
        <div>
        {myCourse.map(item => <div>
          <Button component={Link} to="/exam" onClick={() => pickCourse(item.id)}> {item.name} </Button>
        </div>)}
        </div>
      </Card>
    </div>
  )
}

export default Home
