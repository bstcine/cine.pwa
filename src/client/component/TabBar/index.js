import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import './style.less';

const createContainer = () => {
    let container = document.getElementById('cine-tab-bar__container');
    if (!container) {
        container = document.createElement('div');
        container.setAttribute('id', 'cine-tab-bar__container');
        document.getElementById('root').classList.add('with-cine-tab-bar');
        document.body.appendChild(container);
    }
    return container;
};

class TabBar extends Component {
    static withActive = bars =>
        bars.map(bar => ({ ...bar, active: bar.href === location.pathname }));

    constructor(props) {
        super(props);
        this.container = createContainer();

        this.bars = TabBar.withActive([
            {
                href: '/learn',
                name: '学习',
                icon: require('./image/xuexi@2x.png'),
                icon_active: require('./image/xuexi_blue@2x.png'),
            },
            {
                href: '/',
                name: '商城',
                icon: require('./image/shangcheng@2x.png'),
                icon_active: require('./image/shangcheng_blue@2x.png'),
            },
            {
                href: '/user',
                name: '学习',
                icon: require('./image/wode@2x.png'),
                icon_active: require('./image/wode_blue@2x.png'),
            },
        ]);
    }

    render() {
        return ReactDOM.createPortal(
            <div className="cine-tab-bar">
                {this.bars.map(item => (
                    <a
                        key={item.href}
                        href={item.href}
                        className={classNames(
                            'cine-tab-bar__item',
                            item.active && 'cine-tab-bar__item--active'
                        )}
                    >
                        <img
                            src={item.active ? item.icon_active : item.icon}
                            alt={item.name}
                        />
                        <span>{item.name}</span>
                    </a>
                ))}
            </div>,
            this.container
        );
    }
}

export default TabBar;
