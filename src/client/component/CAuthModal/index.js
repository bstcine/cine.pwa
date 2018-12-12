import React from 'react';
import { CModal } from '@/component/_base';
import CAuth from '@/component/Auth';

const CAuthModal = {
    open: (props = { type: 'signin' }) =>
        CModal.open({
            maskCloseable: true,
            children: (
                <CAuth
                    {...props}
                    onSignUpSuccess={_this => {
                        _this.toggle('signin');
                    }}
                    onResetPwdSuccess={_this => {
                        _this.toggle('signin');
                    }}
                />
            ),
        }),
};

export default CAuthModal;
