import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Button } from '@material-ui/core'
import { Link } from "react-router-dom";

const Header = ({ token, logOut }) => (
  <AppBar position="static">
    <Toolbar>
      <Button component={Link} to="/" style={{ color: "white" }}> 
        { token ? "Koti" : "Kirjaudu" }
      </Button> 
      {token ? <Button component={Link} to="/course" style={{ color: "white" }}>Kurssit</Button> : "" }
      {token ? "" : <Button component={Link} to="/register" style={{ color: "white" }}>Rekisteröidy</Button> }
      {token ? <Button onClick={logOut} component={Link} to="/" style={{ color: "white" }}>Kirjaudu Ulos</Button> : "" } 
    </Toolbar>
  </AppBar>
)

export default Header