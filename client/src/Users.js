import { useEffect, useState } from 'react'
import uuid from 'react-uuid'
import { Button, TextField, Card } from '@material-ui/core'
import { Link } from "react-router-dom";
import axios from 'axios'

const Users = ({ chooseUser }) => {
  const [users, setUsers] = useState([])
  const [newUserName, setNewUserName] = useState()
  const [newUserType, setNewUserType] = useState()
  const [refresh, setRefresh] = useState(false)

  const getUsers = async () => {
    await axios
      .get('http://localhost:3001/user/')
      .then(response => {
        setUsers(response.data)
    })
  }

  const postUser = async () => {
    await axios
      .post(`http://localhost:3001/add/user/${newUserName}/${newUserType}`)
      .then(response => {
        console.log("user added")
    })
    setRefresh(!refresh)
  }

  const deleteUser = async (id) => {
    await axios
      .delete(`http://localhost:3001/delete/user/${id}`)
      .then(response => {
        console.log("choice deleted")
    })
    setRefresh(!refresh)
  }

  useEffect(() => {    
    getUsers()
  }, [refresh])

  const addUserBody = () => {
    const data = {
      name: newUserName,
      usertype: newUserType
    }
    axios.post(`http://localhost:3001/add/user/`, data).then(response => {
      console.log("user added")
    })
  }
  
  return (
    <div className="Tenttilista">
      <Card className="kortti">
        {users.map(item => <div key={uuid()}>
          <Link to="/" onClick={() => chooseUser(item.id)}>{item.name}</Link>
          <Button onClick={() => deleteUser(item.id)}> × </Button>
        </div>)}
        <TextField label={'nimi'} onChange={(e) => setNewUserName(e.target.value)} />
        <TextField label={'tyyppi'} onChange={(e) => setNewUserType(e.target.value)} /> <br /> 
        <Button onClick={postUser}>Lisää</Button>
      </Card>
    </div>
  )
}

export default Users