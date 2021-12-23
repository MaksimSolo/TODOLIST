import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

export interface AddItemFormType {
    addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemFormType) => {
    const [newTitle, setNewTitle] = useState("")
    const [error, setError] = useState<boolean>(false)

    const addItem = () => {
        if (newTitle.trim()) {
            props.addItem(newTitle.trim());
            setNewTitle("")
        } else {
            setError(true)
        }
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setError(false);
        setNewTitle(e.currentTarget.value)
    }
    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addItem()
        }
    }

    const errorClass = error ? 'error' : "";
    const errorMessage = error ? 'Error! Typing is expected' : '';

    return (
        <div>
            <input
                value={newTitle}
                onChange={changeTitle}
                onKeyPress={onKeyPressAddItem}
                className={errorClass}
            />
            <button onClick={addItem}>+</button>
            <div className='error-message'>{errorMessage}</div>
        </div>
    );
};

