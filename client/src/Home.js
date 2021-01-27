import { useEffect, useState } from 'react'
import { Button, Card } from '@material-ui/core'
import { Link } from "react-router-dom";
import axios from 'axios'

const Home = ({ token, profile }) => {
  const [myToken, setMyToken] = useState(token)
  const [myProfile, setMyProfile] = useState(profile)
  const [course, setCourse] = useState([]) 
  
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

  useEffect(() => {
    if (!myToken)
      getToken()
    if (!myProfile)
      getProfile()
    if (myProfile)
      getCourse()
  }, [myToken, myProfile])

  if (!myProfile)
    return <></>
  if (!myProfile.id)
    return <></>
  return (
    <div className="Tenttilista">
      <Card className="kortti">
        <div>
          {myProfile.id} | {myProfile.name} | {myProfile.email} | {myProfile.usertype} <br />
        </div>
        <div>
        {course.map((item, index) => <div key={`homebutton${index}`}>
          <Button component={Link} to={`course/${item.id}/exam`} > {item.name} </Button>
        </div>)}
        </div>
      </Card>
    </div>
  )
}

export default Home
