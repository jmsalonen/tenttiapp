import './App.css';
import { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import axios from 'axios'

//import Users from './Users.js'
import Header from './Header.js'
import Exam from './Exam.js'
import LogIn from './LogIn.js'
import Home from './Home.js'
import Register from './Register.js'
import Course from './Course.js'
import Footer from './Footer.js'

import { IntlProvider } from "react-intl";
import messages_fi from "./translations/fi.json";
import messages_en from "./translations/en.json";

const messages = {
  'fi': messages_fi,
  'en': messages_en
}

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [isLogged, setIsLogged] = useState(false)
  const [profile, setProfile] = useState(JSON.parse(localStorage.getItem('profile')))
  const [language, setLanguage] = useState('fi')
  
  const changeLanguage = () => {
    language === 'en' ? setLanguage('fi') : setLanguage('en')
  }

  const getProfile = async () => {
    await axios
      .get(`http://localhost:3001/user/profile`, {
        headers: {
          'authorization': `${token}`
        }
      })
      .then(response => {
        setProfile(response.data)
        localStorage.setItem('profile', JSON.stringify(response.data)) // -- 
    })
  }

  const logIn = async (userEmail, userPassword) => {
    const data = {
      email: userEmail,
      password: userPassword
    }
    await axios
      .post(`http://localhost:3001/login`, data)
      .then(response => {
        setToken(response.data.token)
        localStorage.setItem('token', response.data.token)
      })
      .catch(() => {
        console.error('Log in Error')
      })
  }

  const register = async (userName, userEmail, userPassword, userType) => {
    const data = {
      name: userName,
      email: userEmail,
      password: userPassword,
      usertype: userType
    }
    await axios.post(`http://localhost:3001/register`, data)
  }

  const logOut = async () => {
    localStorage.removeItem('token')
    localStorage.removeItem('profile') // -- 
    localStorage.removeItem('course')
    localStorage.removeItem('exam')
    setToken(null)
    setProfile(null)
    setIsLogged(false)
  }

  useEffect(() => {
    if (token === null) {
      setIsLogged(false)
    }
    else
      setIsLogged(true)

    if (isLogged) {
      getProfile() 
    }
  }, [token])

  return (
    <Router>
      <IntlProvider locale='fi' messages={messages[language]}>
        <Header token={token} logOut={logOut} changeLanguage={changeLanguage} />
        <Switch>
          <Route path="/course/:courseid/exam">
            <Exam token={token} profile={profile} />
          </Route>
          <Route path="/register">
            <Register register={register} />
          </Route>
          <Route path="/courses">
            <Course token={token} profile={profile} />
          </Route>
          <Route path="/">
            {isLogged ? <Home token={token} profile={profile} /> : <LogIn logIn={logIn} />}
          </Route>
        </Switch>
        <Footer locale={language} />
      </IntlProvider>
    </Router>
  )
}

export default App;
