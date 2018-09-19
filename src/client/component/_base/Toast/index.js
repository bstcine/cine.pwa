import React from 'react';
import ReactDOM from 'react-dom';
import Toast from './Toast';

function toast(props) {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const currentProps = { ...props, close };

    function render(currentProps) {
        ReactDOM.render(<Toast {...currentProps} />, div);
    }
    function close() {
        const unmountResult = ReactDOM.unmountComponentAtNode(div);
        if (unmountResult && div.parentNode) {
            div.parentNode.removeChild(div);
        }
    }
    render(currentProps);
    return {
        close,
    };
}

function show(props, defaultProps) {
    let currentProps = getProps(props, defaultProps);
    let myToast = toast(currentProps);
    if (currentProps.duration) {
        setTimeout(() => {
            myToast.close();
            currentProps.onClose && currentProps.onClose();
        }, currentProps.duration);
    }
    return myToast;
}

function getProps(props, defaultProps) {
    if (props.length) {
        props.forEach(prop => {
            if (typeof prop === 'string') {
                defaultProps.text = prop;
            } else if (typeof prop === 'number') {
                defaultProps.duration = prop;
            } else if (typeof prop === 'function') {
                defaultProps.onClose = prop;
            } else if (typeof prop === 'object') {
                Object.assign(defaultProps, prop);
            }
        });
    }
    return defaultProps;
}

Toast.loading = (...props) => {
    return show(props, { type: 'loading', text: '加载中', duration: 0 });
};

Toast.success = (...props) => {
    return show(props, { type: 'success', text: '已完成', duration: 3000 });
};

Toast.error = (...props) => {
    return show(props, { type: 'error', text: '网络异常.', duration: 3000 });
};

Toast.info = (...props) => {
    return show(props, { type: 'info', text: '缺少提示信息', duration: 3000 });
};

export default Toast;
