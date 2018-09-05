import React from 'react';
import { CSelectField } from './SelectField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import CButton, { CIconButton } from './Button';
import FloatingBox from './FloatingBox';
import Panel from './Panel';
import Icon from './Icon';
import Drawer from './Drawer';
import Modal from './Modal';
import Toast from './Toast';
import { CCardContainer, CCard } from './Card';

const CFlatButton = props => {
    return <FlatButton {...props} />;
};

const CDatePicker = ({ defaultValue, label, onChange }) => {
    return (
        <DatePicker
            defaultDate={defaultValue}
            hintText={label}
            locale="en-US"
            autoOk={true}
            firstDayOfWeek={0}
            onChange={onChange}
        />
    );
};

export {
    CFlatButton,
    Dialog as CDialog,
    TextField as CTextField,
    CButton,
    CIconButton,
    CDatePicker,
    FloatingBox as CFloatingBox,
    Panel as CPanel,
    CCardContainer,
    Drawer as CDrawer,
    CCard,
    CSelectField as CSelect,
    Icon as CIcon,
    Modal as CModal,
    Toast as CToast,
};
