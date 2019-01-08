import React from 'react';
import CRouter from '@/component/CRouter';
import storeUtil from '@/util/_base/storeUtil';

const GRouter = ({ routes }) => (
    <CRouter
        routes={routes}
        render={(props, item) => {
            if (item.checkAuth && !storeUtil.getToken()) {
                location.replace(
                    '/auth/signin?redirect=' + encodeURIComponent(location.href)
                );
                return <div key={item.path} />;
            } else {
                const Comp = item.component;
                return <Comp {...props} />;
            }
        }}
    />
);

export default GRouter;
