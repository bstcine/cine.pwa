import React from 'react';
import { CModal } from '@/component/_base';
import CAuth from '@/component/Auth';
import { fetchData } from '@/service/base';
import { APIURL_Auth_SignIn } from '../../../APIConfig';

const CAuthModal = {
    open: (props = { type: 'signin' }) =>
        CModal.open({
            maskClosable: true,
            children: (
                <CAuth
                    {...props}
                    signInAction={({ phone, password, school }) =>
                        fetchData(APIURL_Auth_SignIn, {
                            phone,
                            password,
                            school,
                        })
                    }
                    onSignUpSuccess={function() {
                        this.toggle('signin');
                    }}
                    onResetPwdSuccess={function() {
                        this.toggle('signin');
                    }}
                />
            ),
        }),
};

export default CAuthModal;
