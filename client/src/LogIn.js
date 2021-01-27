import { useState } from "react"
import { Button, TextField, Card } from '@material-ui/core'
import { FormattedMessage } from 'react-intl'

const LogIn = ({ logIn }) => {
  const [userEmail, setUserEmail] = useState()
  const [userPassword, setUserPassword] = useState()

  return (
    <div className="Tenttilista">
      <Card className="kortti">
        <div>
          <TextField label={'email'} onChange={(e) => setUserEmail(e.target.value)} />
        </div>
        <div>
          <TextField label={'password'} onChange={(e) => setUserPassword(e.target.value)} /> 
        </div>
        <div>
          <Button onClick={() => logIn(userEmail, userPassword)}> <FormattedMessage id="login.login" /> </Button>
        </div>
      </Card>
    </div>
  )
}

export default LogIn
