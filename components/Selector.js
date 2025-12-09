import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
//:>--------------------------------------------------------------------------------------+
//:>
//:>  $Source: Selector.tsx $
//:>
//:>  $Copyright: (c) 2017 Bentley Systems, Incorporated. All rights reserved. $
//:>
//:>+--------------------------------------------------------------------------------------
import React from 'react';
import { makeStyles, createStyles } from '@mui/styles';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
const useStyles = makeStyles((theme) => createStyles({
    formControl: {
        marginLeft: theme.spacing(2),
        minWidth: 120,
        backgroundColor: theme.palette.background.paper,
    },
    Select: {
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.secondary,
    },
    form: {
        ...theme.typography.h6,
    },
}));
export default function Selector(props) {
    const classes = props.style;
    const [value, setValue] = React.useState(props.default);
    const [open, setOpen] = React.useState(false);
    function handleChange(event) {
        setValue(event === null || event === void 0 ? void 0 : event.target);
        props.onValueChanged(event === null || event === void 0 ? void 0 : event.target.value);
    }
    function handleClose() {
        setOpen(false);
    }
    function handleOpen() {
        setOpen(true);
    }
    return (_jsxs("form", { className: classes.form, autoComplete: "off", children: [_jsx("span", { style: { fontSize: "1rem", fontWeight: 500, color: "rgba(0,0,0,0.6)", display: "block" }, children: props.label }), _jsx(FormControl, { className: classes.formControl, variant: "standard", sx: { m: 0, minWidth: 120 }, children: _jsx(Select, { className: classes.Select, open: open, onClose: handleClose, onOpen: handleOpen, value: value.value, label: value.label, onChange: handleChange, inputProps: {
                        name: 'timespan'
                    }, children: props.options.map((option) => (_jsx(MenuItem, { value: option.value, children: option.label }))) }) })] }));
}
