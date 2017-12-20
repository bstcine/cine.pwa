import React, {Component, Children, cloneElement} from 'react';

export default class Tabs extends Component {


    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0
        }
        this.onTabItemClick = this.onTabItemClick.bind(this);
    }

    getChildren() {
        let selectedIndex = this.state.selectedIndex
        let children = this.props.children;
        console.log(children)
        return Children.map(children, child => {
            if (Tabs.isTabItems(child)) {
                let tabItems = child.props.children
                let index = 0
                return cloneElement(child, {
                    children: Children.map(tabItems, tabItem => {
                        if (Tabs.isTabItem(tabItem)) {
                            const props = {
                                index,
                                onTabItemClick: this.onTabItemClick,
                                selected: index === selectedIndex
                            }
                            index++
                            return cloneElement(tabItem, props)
                        }
                    })
                })

            } else if (Tabs.isTabPanels(child)) {
                let tabPanels = child.props.children
                let index = 0
                return cloneElement(child, {
                    children: Children.map(tabPanels, tabPanel => {
                        if (Tabs.isTabPanel(tabPanel)) {
                            const props = {
                                index,
                                selected: index === selectedIndex
                            }
                            index++
                            return cloneElement(tabPanel, props)
                        }
                    })
                })
            }
        })
    }

    static isTabItem(ele) {
        return ele.type && ele.type.name === 'TabItem'
    }

    static isTabItems(ele) {
        return ele.type && ele.type.name === 'TabItems'
    }

    static isTabPanel(ele) {
        return ele.type && ele.type.name === 'TabPanel'
    }

    static isTabPanels(ele) {
        return ele.type && ele.type.name === 'TabPanels'
    }

    onTabItemClick(index) {
        if (index === this.state.selectedIndex) return
        this.setState({
            selectedIndex: index
        })
    }

    render() {
        return (
            <div className="tabs" role="tabs">
                {this.getChildren()}
            </div>
        );
    }
}

