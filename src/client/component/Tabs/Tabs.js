import React, {Component, Children, cloneElement} from 'react';
import TabItem from './TabItem';
import TabItems from './TabItems';
import TabPanel from './TabPanel';
import TabPanels from './TabPanels';

export default class Tabs extends Component {
    static defaultProps = {
        className: 'tabs'
    };

    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: props.selectedIndex || 0,
            selectedId: props.selectedId || null
        };
        this.onTabItemClick = this.onTabItemClick.bind(this);
    }

    getChildren() {
        let {selectedIndex, selectedId} = this.state;
        let children = this.props.children;
        return Children.map(children, child => {
            if (Tabs.isTabItems(child)) {
                let tabItems = child.props.children;
                return cloneElement(child, {
                    children: Children.map(tabItems, (tabItem, index) => {
                        if (Tabs.isTabItem(tabItem)) {
                            let props = {
                                index,
                                id: tabItem.props.id,
                                onTabItemClick: this.onTabItemClick,
                            };
                            if (selectedId) {
                                props.selected = props.id === selectedId
                            } else {
                                props.selected = index === selectedIndex
                            }
                            if(tabItem.props.onClick) {
                                props.onClick = tabItem.props.onClick
                            }
                            return cloneElement(tabItem, props);
                        }
                    })
                });
            } else if (Tabs.isTabPanels(child)) {
                let tabPanels = child.props.children;
                return cloneElement(child, {
                    children: Children.map(tabPanels, (tabPanel, index) => {
                        if (Tabs.isTabPanel(tabPanel)) {
                            let props = {
                                index,
                                id: tabPanel.props.id,
                            };
                            if (selectedId) {
                                props.selected = props.id === selectedId
                            } else {
                                props.selected = index === selectedIndex
                            }
                            return cloneElement(tabPanel, props);
                        }
                    })
                });
            }
        });
    }

    static isTabItem(ele) {
        // 此处比较类型不可用type.name来比较，压缩后的代码会将name也一并压缩，不能根据字符串正常比较
        return ele && ele.type === TabItem;
    }

    static isTabItems(ele) {
        return ele && ele.type === TabItems;
    }

    static isTabPanel(ele) {
        return ele && ele.type === TabPanel;
    }

    static isTabPanels(ele) {
        return ele && ele.type === TabPanels;
    }

    onTabItemClick(index, id) {
        let {selectedId} = this.props;
        if(selectedId) {
            if (id === this.state.selectedId) return;
            this.setState({
                selectedId: id
            });
        }else{
            if (index === this.state.selectedIndex) return;
            this.setState({
                selectedIndex: index
            });
        }
    }

    render() {
        const {className} = this.props;
        return (
            <div className={className} role="tabs">
                {this.getChildren()}
            </div>
        );
    }
}
