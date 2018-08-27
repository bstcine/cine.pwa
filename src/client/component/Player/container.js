import React, { PureComponent } from 'react';
import { CIcon } from '@/component/_base';
import Player from '@/component/Player/component/Player';
import Visual from '@/component/Player/component/Visual';
import Cover from '@/component/Player/component/Cover';
import Bottom from '@/component/Player/component/Bottom';
import Progress from '@/component/Player/component/Progress';
import Time from '@/component/Player/component/Time';
import List from '@/component/Player/component/List';
import {
    Control,
    ControlLeft,
    ControlRight,
} from '@/component/Player/component/Control';
import './style.less';

export default class Container extends PureComponent {
    render() {
        const { media, poster } = this.props;
        return (
            <Player>
                <Visual />
                <Cover>
                    <div className="mp_button__bigplay" />
                </Cover>
                <Bottom>
                    <Progress />
                    <Control>
                        <ControlLeft>
                            <button className="mp_control__item mp_button__play">
                                <CIcon>play_arrow</CIcon>
                            </button>
                            <Time className="mp_control__item" />
                        </ControlLeft>
                        <ControlRight>
                            <button className="mp_control__item mp_button__playlist">
                                选集
                            </button>
                            <button className="mp_control__item mp_button__fullscreen">
                                <CIcon>fullscreen</CIcon>
                            </button>
                        </ControlRight>
                    </Control>
                </Bottom>
                {/* <List /> */}
            </Player>
        );
    }
}
