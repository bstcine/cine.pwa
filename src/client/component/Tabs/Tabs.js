import React, {Component, Children, cloneElement} from 'react';
import TabItem from './TabItem'
import TabItems from './TabItems'
import TabPanel from './TabPanel'
import TabPanels from './TabPanels'

export default class Tabs extends Component {

    static defaultProps = {
        className: 'tabs'
    }

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

    static isTabItem(ele) {// 此处比较类型不可用type.name来比较，压缩后的代码会将name也一并压缩，不能根据字符串正常比较
        return ele.type === TabItem
    }

    static isTabItems(ele) {
        return ele.type === TabItems
    }

    static isTabPanel(ele) {
        return ele.type === TabPanel
    }

    static isTabPanels(ele) {
        return ele.type === TabPanels
    }

    onTabItemClick(index) {
        if (index === this.state.selectedIndex) return
        this.setState({
            selectedIndex: index
        })
    }

    render() {
        const {className} = this.props
        return (
            <div className={className} role="tabs">
                {this.getChildren()}
            </div>
        );
    }
}

