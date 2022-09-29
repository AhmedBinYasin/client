import './App.css';
import './CSS/Nevbar.css';
import './CSS/crapCSS.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginScreen from "./Links/LoginScreen";
import Register from "./Links/Register";
import Main from './Links/Main';
import useProps from './Hooks/useProps';
import Bio from './Pages/Bio';
import ProfileView from './Pages/ProfileView';
import PostView from './Pages/PostView';
import Feeds from './Pages/Feeds';
import axios from 'axios'



function App() {
  const { userProps, setUserProps } = useProps()
  console.log(userProps)
  if (!userProps) {
    return (
      <div className="App">
        <Router>
          <Routes>
            <Route exact path="/Links/Register" element={<Register setUserProps={setUserProps} />} />
            <Route path="/" element={<LoginScreen setUserProps={setUserProps} />} />
          </Routes>
        </Router>
      </div>
    )
  }
  async function setRole(Role) {
    let responseData = await axios.post(`http://localhost:5000/api/auth/setRole`, { Email: userProps.user.Email,Role:Role }).catch((err) => console.log(err))
    if (responseData.data === "success") {
      setUserProps({...userProps,user:{
        Email:userProps.user.Email,
        Name:userProps.user.Name,
        Role:Role
      }})
      console.log(userProps)
    }
  }
  {console.log(userProps)}
  if (userProps.user.Role === 'new') {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Bio userProps={userProps} setRole={setRole} />} />
        </Routes>
      </Router>
    )
  }
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Main userProps={userProps} setUserProps={setUserProps} />}>
            <Route path="/Pages/Bio" element={<Bio userProps={userProps} />} />
            <Route path="/Pages/ProfileView" element={<ProfileView useProps={{Email:"ahmed116046@gmail.com",Self:"true"}}/>}/>
            <Route path="/Pages/PostView" element={<PostView />}/>
            <Route path="/" element={<Feeds />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
