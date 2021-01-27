import { useState } from 'react'
import { Button, TextField, Card } from '@material-ui/core'
import { Link } from "react-router-dom";
import { FormattedMessage } from 'react-intl'

const Register = ({ register }) => {
  const [userName, setUserName] = useState()
  const [userEmail, setUserEmail] = useState()
  const [userPassword, setUserPassword] = useState()
  const [userType, setUserType] = useState()

  return (
    <div className="Tenttilista">
      <Card className="kortti">
        <div>
          <TextField label={'name'} onChange={(e) => setUserName(e.target.value)} />
        </div>
        <div>
          <TextField label={'email'} onChange={(e) => setUserEmail(e.target.value)} />
        </div>
        <div>
          <TextField label={'password'} onChange={(e) => setUserPassword(e.target.value)} /> 
        </div>
        <div>
          <TextField label={'usertype'} onChange={(e) => setUserType(e.target.value)} /> <br /> 
        </div>
        <div>
          <Button component={Link} to="/" onClick={() => register(userName, userEmail, userPassword, userType)}>  
            <FormattedMessage id="register.register" /> 
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default Register
