import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter as Router,
  Route,
} from 'react-router-dom'


import WordIndex from 'component/word/index';
import WordCard from 'component/word/card';


class Word extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <div>
        <Route exact path="/" component={WordIndex}/>
        <Route path="/card" component={WordCard}/>
        </div>
      </Router>
    )
  }
}

ReactDOM.render(<Word/>, document.getElementById('root'))