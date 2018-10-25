import React, { Component } from 'react';
import classNames from 'classnames';
import './swiper.less';
import Icon from '@/component/_base/Icon';

class Swiper extends Component {
    static defaultProps = {
        step: 1,
    };
    constructor(props) {
        super(props);
        this.swipLeft = this.swipLeft.bind(this);
        this.swipRight = this.swipRight.bind(this);
        this.contentRef = React.createRef();
        this.containerRef = React.createRef();
        this.state = {
            offsetX: 0,
            showLeft: false,
            showRight: true,
        };
    }

    swipRight() {
        let content = this.contentRef.current;
        const { children, step } = this.props;
        let maxOffsetLeft = content.scrollWidth - content.clientWidth;
        let offsetX = step / children.length * content.scrollWidth;
        this.setState(
            prevState => ({
                offsetX: Math.min(maxOffsetLeft, prevState.offsetX + offsetX),
            }),
            this.checkBtnStatus
        );
    }

    swipLeft() {
        let content = this.contentRef.current;
        const { children, step } = this.props;
        let offsetX = step / children.length * content.scrollWidth;
        this.setState(
            prevState => ({
                offsetX: Math.max(0, prevState.offsetX - offsetX),
            }),
            this.checkBtnStatus
        );
    }

    checkBtnStatus() {
        let content = this.contentRef.current;
        let maxOffsetLeft = content.scrollWidth - content.clientWidth;
        if (this.state.offsetX === maxOffsetLeft) {
            this.setState({
                showRight: false,
            });
        } else if (this.state.offsetX === 0) {
            this.setState({ showLeft: false });
        } else {
            this.setState({
                showLeft: true,
                showRight: true,
            });
        }
    }

    render() {
        const { children, className } = this.props;
        const { showLeft, showRight } = this.state;
        let style = {
            transform: `translate3D(-${this.state.offsetX}px, 0, 0)`,
        };
        console.log('style', style);
        return (
            <div className={classNames('swiper', className)}>
                <div
                    className={classNames('swiper_arrow__left', {
                        'swiper_arrow--hide': !showLeft,
                    })}
                    onClick={this.swipLeft}
                >
                    <Icon>ci-left_arr</Icon>
                </div>
                <div className="swiper__container" ref={this.containerRef}>
                    <div
                        className="swiper__content"
                        ref={this.contentRef}
                        style={style}
                    >
                        {children}
                    </div>
                </div>
                <div
                    className={classNames('swiper_arrow__right', {
                        'swiper_arrow--hide': !showRight,
                    })}
                    onClick={this.swipRight}
                >
                    <Icon>ci-right_arr</Icon>
                </div>
            </div>
        );
    }
}

export default Swiper;
