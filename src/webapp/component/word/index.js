import React from 'react';
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'

export default class Index extends React.Component {
    constructor(props) {
        super(props)
        this.state = {age: ""};
    }

    handleChange(event) {
        this.setState({age:event.target.value});
    }

    render() {
        return (
            <div>
                <TextField
                    id="age"
                    label="年龄"
                    value={this.state.age}
                    onChange={this.handleChange.bind(this)}
                    margin="normal"
                />
                <br/>
                <Button raised color="primary" href="#/card">
                    开始测验
                </Button>
            </div>
        )
    }
}

