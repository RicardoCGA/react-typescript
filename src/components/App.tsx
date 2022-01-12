import React from 'react';
import './App.css';
import {User} from '../model/Model';
import {AuthService} from '../services/AuthService';
import Login from './Login';
import {Routes, Route } from 'react-router-dom';
import {Navbar} from "./Navbar";
import {Home} from "./Home";
import {Profile} from "./Profile";
import {Spaces} from "./spaces/Spaces";
import {DataService} from "../services/DataService";

interface AppState{
  user: User | undefined
}

export class App extends React.Component<{}, AppState>{

  private authService = new AuthService()
  private dataService = new DataService()

  constructor(props: any) {
      super(props);
      this.state = {
          user:undefined
      };
      this.setUser = this.setUser.bind(this);
  }

  private setUser(user: User){
      this.setState({user: user});
  };

  render(){
      return (
      <div className="wrapper">
              <Navbar user={this.state.user}/>
              <Routes >
                  <Route path='/' element={<Home/>}/>
                  <Route path='/login' element={<Login authService={this.authService} setUser={this.setUser}/>} />
                  <Route path='/profile' element={<Profile authService={this.authService} user={this.state.user}/>} />
                  <Route path='/spaces' element={<Spaces dataService={this.dataService} />} />
              </Routes>
      </div>
    )
  }

}
/*
function App() {
  return (
    <div className="App">
      APP Works
    </div>
  );
}

export default App;*/
