import React from 'react';
import Dialog from 'material-ui/Dialog';
import DatePicker from 'material-ui/DatePicker';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { CSelectField } from './SelectField';
import Button, { IconButton, FloatingButton } from './Button';
import Panel from './Panel';
import Icon from './Icon';
import Drawer from './Drawer';
import Modal from './Modal';
import Toast from './Toast';
import Card, { CardContainer } from './Card';

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
    Dialog as CDialog,
    CDatePicker,
    CFlatButton,
    TextField as CTextField,
    Button as CButton,
    IconButton as CIconButton,
    FloatingButton as CFloatingButton,
    Panel as CPanel,
    CardContainer as CCardContainer,
    Card as CCard,
    Drawer as CDrawer,
    CSelectField as CSelect,
    Icon as CIcon,
    Modal as CModal,
    Toast as CMessage,
};
