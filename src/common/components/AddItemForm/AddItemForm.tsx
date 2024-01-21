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
  const [error, setError] = useState<string>('')

  const onAddItemClick = () => {
    if (newTitle.trim()) {
      addItem(newTitle.trim()).then(() => {
        setNewTitle("")
      }).catch((reason: BaseResponseType) => {
        reason.messages && setError(reason.messages[0])
      });
    } else {
      setError('Error! Typing is expected')
    }
  }
  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value)
    setError('');
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
        helperText={error}
        value={newTitle}
        onChange={changeTitle}
        onKeyUp={onKeyPressAddItem}
        error={!!error.length}
      />
      <IconButton
        disabled={disabled}
        onClick={onAddItemClick} sx={{color: green[500]}}><AddBox/></IconButton>
      {/*<div className='error-message'>{errorMessage}</div>*/}
    </div>
  );
});

