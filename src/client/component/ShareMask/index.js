import React from 'react';
import { CModal } from '@/component/_base';
import './style.less';

const ShareMask = {
    open: () => {
        CModal.open({
            className: 'cine-share__container',
            children: (
                <>
                    <div className="cine-share__tip">
                        请点击右上角 ...，选择分享到朋友圈
                    </div>
                    <div className="cine-share__arrow">
                        <img src={require('./img/arrow.png')} alt="arrow" />
                    </div>
                </>
            ),
        });
    },
};

export default ShareMask;
