import React from 'react';
import ReactDOM from 'react-dom';

class Word extends React.Component{

  componentDidMount() {
    // $('select').material_select();
  }

  componentWillUnmount() {
    // $('select').material_select('destroy');
  }

  render(){
    return (
      <div>
        <div className="input-field col s12">
          <select>
            <option value="" disabled selected>Choose your option</option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
          </select>
          <label>Materialize Select</label>
        </div>
      </div>

    )
  }
}

ReactDOM.render(<Word/>, document.getElementById('root'))