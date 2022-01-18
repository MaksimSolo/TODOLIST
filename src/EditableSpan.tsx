import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@mui/material";

type EditableSpanType = {
    title: string
    changeTitle: (title: string) => void
}

export const EditableSpan = (props: EditableSpanType) => {
    const [title, setNewTitle] = useState(props.title)
    const [editMode, setEditMode] = useState<boolean>(false)

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => setNewTitle(e.currentTarget.value)
    const onMode = () => setEditMode(true)
    const offMode = () => {
        props.changeTitle(title)
        setEditMode(false)
    }

    return (
        editMode ?
            <TextField value={title}
                   autoFocus={true}
                   onBlur={offMode}
                   onChange={changeTitle}
            /> :
            <span onDoubleClick={onMode}>{props.title}</span>
    )
};


