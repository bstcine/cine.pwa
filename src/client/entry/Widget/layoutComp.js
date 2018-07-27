import { GLayout } from '@/g/component';
import React, { Component } from 'react';
import { CPanel } from '@/component/_base';

export default class Layout extends Component {
    render() {
        const user = { id: '466466', nickname: '猜猜我叫啥', role_id: '2' };
        const alert = {
            isOpen: true,
            text: '今天天气不错',
            onConfirm: () => {
                console.log('11111');
            },
        };
        const message = { isOpen: false, text: '文字文字' };
        const loading = { isOpen: false };

        return (
            <GLayout
                user={user}
                alert={alert}
                message={message}
                loading={loading}>
                <CPanel>12313123</CPanel>
            </GLayout>
        );
    }
}
