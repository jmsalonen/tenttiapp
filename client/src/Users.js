import { useEffect, useState } from 'react'
import uuid from 'react-uuid'
import { Button, TextField, Card } from '@material-ui/core'
import axios from 'axios'

const Users = ({ tokenSet }) => {
  const [users, setUsers] = useState([])
  const [userName, setUserName] = useState()
  const [userEmail, setUserEmail] = useState()
  const [userPassword, setUserPassword] = useState()
  const [userType, setUserType] = useState()
  const [refresh, setRefresh] = useState(false)

  const getUsers = async () => {
    await axios
      .get('http://localhost:3001/users/')
      .then(response => {
        setUsers(response.data)
    })
  }

  const logIn = async () => {
    const data = {
      email: userEmail,
      password: userPassword
    }
    await axios
      .post(`http://localhost:3001/login`, data)
      .then(response => {
        tokenSet(response.data.token)
      })
      .catch(() => {
        console.error('Log in Error')
      })
  }

  const register = async () => {
    const data = {
      name: userName,
      email: userEmail,
      password: userPassword,
      usertype: userType
    }
    await axios.post(`http://localhost:3001/register`, data)
    setRefresh(!refresh)
  }

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:3001/delete/user/${id}`)
    setRefresh(!refresh)
  }

  useEffect(() => {    
    getUsers()
  }, [refresh])

  return (
    <div className="Tenttilista">
      <Card className="kortti">
        {users.map(item => <div key={uuid()}>
          {item.name}
          <Button onClick={() => deleteUser(item.id)}> × </Button>
        </div>)}
        <TextField label={'name'} onChange={(e) => setUserName(e.target.value)} />
        <TextField label={'email'} onChange={(e) => setUserEmail(e.target.value)} />
        <TextField label={'password'} onChange={(e) => setUserPassword(e.target.value)} /> 
        <TextField label={'usertype'} onChange={(e) => setUserType(e.target.value)} /> <br /> 
        <Button onClick={register}>Luo Tili</Button>
        <Button onClick={logIn}>Kirjaudu Sisään</Button>
      </Card>
    </div>
  )
}

export default Users