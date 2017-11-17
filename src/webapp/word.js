import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter as Router,
  Route,
} from 'react-router-dom'

import LoginDetect from 'component/word/loginDetect';
import Index from 'component/word/index';
import Welcome from 'component/word/welcome';
import UserInfo from 'component/word/userInfo';
import Card from 'component/word/card';
import End from 'component/word/end';
import * as util from './util'


class Word extends React.Component {

  constructor(props) {
    super(props);
    this.props.token =  util.getUrlParam('token');
    console.log(`util.getUrlParam('token') ${util.getUrlParam('token')}`)
    console.log(` this.props.token 1  ${this.props.token}`)
  }

  render() {
    return (
      <Router>
        <div>
        <Route exact path="/" render={(props) => <Index {...props} token={this.props.token}/>}/>

        <Route path="/welcome" render={(props) => <Welcome {...props} token={this.props.token}/>}/>
        <Route path="/logindetect" render={(props) => <LoginDetect {...props} token={this.props.token}/>}/>
        <Route path="/userinfo" render={(props) => <UserInfo {...props} token={this.props.token}/>}/>
        <Route path="/card" render={(props) => <Card {...props} token={this.props.token}/>}/>
        <Route path="/end" render={(props) => <End {...props} token={this.props.token}/>}/>
        </div>
      </Router>
    )
  }
}

ReactDOM.render(<Word/>, document.getElementById('root'))