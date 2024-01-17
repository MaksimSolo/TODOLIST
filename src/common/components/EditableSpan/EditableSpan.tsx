import {TextField} from "@mui/material";
import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';

type EditableSpanType = {
  title: string
  changeTitle: (title: string) => void
  disabled?: boolean
}

export const EditableSpan = memo(({title, changeTitle, disabled}: EditableSpanType) => {

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
    disabled ? <span onDoubleClick={onMode}>{title}</span> :
      editMode ?
        <TextField value={newTitle}
                   autoFocus
                   onBlur={offMode}
                   onChange={changeNewTitle}
                   onKeyUp={keyPressedEditMode}
        /> :
        <span onDoubleClick={onMode}>{title}</span>
  )
});


