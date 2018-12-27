import React, { Component } from "react";

class Menu extends Component {
    render() {
        return (
            <ul className="menu">
                <li className="menu__submenu">
                    <span>111</span>
                    <ul className="menu__group">
                        <li className="menu__item">111.1</li>
                        <li className="menu__item">111.2</li>
                        <li className="menu__item">111.3</li>
                        <li className="menu__item">111.4</li>
                    </ul>
                </li>
                <li className="menu__submenu">
                    <span>222</span>
                    <ul className="menu__group">
                        <li className="menu__item">222.1</li>
                        <li className="menu__item">222.2</li>
                        <li className="menu__item">222.3</li>
                        <li className="menu__item">222.4</li>
                    </ul>
                </li>
                <li className="menu__submenu">
                    <span>333</span>
                    <ul className="menu__group">
                        <li className="menu__item">333.1</li>
                        <li className="menu__item">333.2</li>
                        <li className="menu__item">333.3</li>
                        <li className="menu__item">333.4</li>
                    </ul>
                </li>
            </ul>
        );
    }
}

export default Menu;