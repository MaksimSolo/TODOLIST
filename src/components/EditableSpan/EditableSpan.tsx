import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TextField} from "@mui/material";

type EditableSpanType = {
    title: string
    changeTitle: (title: string) => void
}

export const EditableSpan = React.memo(({title,changeTitle}: EditableSpanType) => {
    console.log('EditableSpan')
    const [newTitle, setNewTitle] = useState(title)
    const [editMode, setEditMode] = useState<boolean>(false)

    const changeNewTitle = (e: ChangeEvent<HTMLInputElement>) => setNewTitle(e.currentTarget.value)
    const onMode = () => setEditMode(true)
    const offMode = () => {
        changeTitle(newTitle)
        setEditMode(false)
    };
    const keyPressedEditMode = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            offMode()
        }
    }

    return (
        editMode ?
            <TextField value={newTitle}
                       autoFocus
                       onBlur={offMode}
                       onChange={changeNewTitle}
                       onKeyPress={keyPressedEditMode}
            /> :
            <span onDoubleClick={onMode}>{title}</span>
    )
});


