import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@mui/material";
import {green} from "@mui/material/colors";
import {AddBox} from "@mui/icons-material";

export interface AddItemFormType {
    addItem: (title: string) => void
    disabled: boolean
}

export const AddItemForm = React.memo((props: AddItemFormType) => {

    const [newTitle, setNewTitle] = useState("")
    const [error, setError] = useState<boolean>(false)

    const addItem = () => {
        if (newTitle.trim()) {
            props.addItem(newTitle.trim());
        } else {
            setError(true)
        }
        setNewTitle("")
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
        setError(false);
    }
    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addItem()
        }
    }
    return (
        <div style={{textAlign: 'center'}}>
            <TextField
                disabled={props.disabled}
                variant={'outlined'}
                size={'small'}
                label={'enter item title'}
                helperText={error && 'Error! Typing is expected'}
                value={newTitle}
                onChange={changeTitle}
                onKeyPress={onKeyPressAddItem}
                error={error}
            />
            <IconButton
                disabled={props.disabled}
                onClick={addItem} sx={{color: green[500]}}><AddBox/></IconButton>
            {/*<div className='error-message'>{errorMessage}</div>*/}
        </div>
    );
});

