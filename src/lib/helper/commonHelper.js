import { message, Tag, Spin } from "antd";
import { Popover } from "antd";
import React from "react"
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';


export const errorMessage = (msg) => {
    message.error(msg);
};

export const hasValue = (data) => {

    if (["", null, false, undefined].includes(data)) {
        return false
    } else {
        return true
    }
}


export const successMessage = (msg) => {
    message.success(msg)
}

export const infoMessage = (msg) => {
    message.info(msg)
}

export const warningMessage = (msg) => {
    message.warning(msg)
}

export const MousePopover = (props) => {


    return <Popover content={props.content} trigger="hover">
        <HelpOutlineIcon fontSize="small" />
    </Popover>
}


