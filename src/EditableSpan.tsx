import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
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
    const keyPressedEditMode = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            offMode()
        }
    }

    return (
        editMode ?
            <TextField value={title}
                       autoFocus
                       onBlur={offMode}
                       onChange={changeTitle}
                       onKeyPress={keyPressedEditMode}
            /> :
            <span onDoubleClick={onMode}>{props.title}</span>
    )
};


