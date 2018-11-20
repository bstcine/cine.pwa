import React, { Component,Children } from "react";

class CSelects extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(value){
        this.props.onChange(value)
    }

    render() {
        let children = Children.map(this.props.children,(child)=>{

        })
        return (
            <div className="cine_selects">
                <ul>

                </ul>
            </div>
        );
    }
}

class Option extends Component{
    render() {
        const {children} = this.props;
        return (
            <li>
                {children}
            </li>
        );
    }
}

CSelects.Option = Option;

export default CSelects;