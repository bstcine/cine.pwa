import React from 'react';
import CAuthModal from '@/component/_base/Modal';
import CAuth from '@/component/Auth';

let _open = CAuthModal.open;

CAuthModal.open = (props = { type: 'signin' }) =>
    _open({
        maskCloseable: true,
        children: <CAuth {...props} />,
    });

export default CAuthModal;
