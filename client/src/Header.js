import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Button } from '@material-ui/core'
import { Link } from "react-router-dom";

const Header = () => (
  <AppBar position="static">
    <Toolbar>
      <Button component={Link} to="/" style={{ color: "white" }}> 
        Koti
      </Button> 
      <Button component={Link} to="/course" style={{ color: "white" }}> 
        Kurssit
      </Button> 
      <Button component={Link} to="/login" style={{ color: "white" }}> 
        Kirjaudu
      </Button> 
    </Toolbar>
  </AppBar>
)

export default Header