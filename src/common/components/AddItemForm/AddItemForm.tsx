import {AddBox} from "@mui/icons-material";
import {IconButton, TextField} from "@mui/material";
import {green} from "@mui/material/colors";
import {BaseResponseType} from "common/types/types";
import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';

export interface AddItemFormProps {
  addItem: (title: string) => Promise<unknown>
  disabled: boolean
}

export const AddItemForm = memo(({addItem, disabled}: AddItemFormProps) => {

  const [newTitle, setNewTitle] = useState("")
  const [error, setError] = useState<boolean>(false)

  const onAddItemClick = () => {
    if (newTitle.trim()) {
      addItem(newTitle.trim()).then(() => {
        setNewTitle("")
      }).catch((reason: BaseResponseType) => {
        console.log(reason.messages[0])
      });
    } else {
      setError(true)
    }
  }
  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value)
    setError(false);
  }
  const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onAddItemClick()
    }
  }
  return (
    <div style={{textAlign: 'center'}}>
      <TextField
        disabled={disabled}
        variant={'outlined'}
        size={'small'}
        label={'enter item title'}
        helperText={error && 'Error! Typing is expected'}
        value={newTitle}
        onChange={changeTitle}
        onKeyUp={onKeyPressAddItem}
        error={error}
      />
      <IconButton
        disabled={disabled}
        onClick={onAddItemClick} sx={{color: green[500]}}><AddBox/></IconButton>
      {/*<div className='error-message'>{errorMessage}</div>*/}
    </div>
  );
});

