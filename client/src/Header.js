import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { Button } from '@material-ui/core'
import { Link } from "react-router-dom"
import { FormattedMessage } from 'react-intl'

const Header = ({ token, logOut, changeLanguage}) => (
  <AppBar position="static">
    <Toolbar>
      <Button component={Link} to="/" style={{ color: "white" }}> 
        { token ? <FormattedMessage id="header.home" /> : <FormattedMessage id="header.login" /> }
      </Button> 
      {token ? <Button component={Link} to="/courses" style={{ color: "white" }}> 
        <FormattedMessage id="header.courses" /> 
      </Button> : "" }
      {token ? "" : <Button component={Link} to="/register" style={{ color: "white" }}> 
        <FormattedMessage id="header.register" /> 
      </Button> }
      {token ? <Button onClick={logOut} component={Link} to="/" style={{ color: "white" }}> 
        <FormattedMessage id="header.logout" /> 
      </Button> : "" } 
      <Button onClick={changeLanguage}> 
        <FormattedMessage id="header.language" /> 
      </Button>
    </Toolbar>
  </AppBar>
)

export default Header
