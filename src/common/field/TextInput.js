import { TextField } from '@mui/material';
import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';

function TextInput(props) {
    const { control } = useFormContext();
    const { name, label, required, errors, defaultValue, className } = props;
    let isError = false;
    let errorMessage = '';
    if (errors && errors.hasOwnProperty(name)) {
        isError = true;
        errorMessage = errors[name].message;
    }

    return (
        <Controller
            render={({ field }) => (
                <TextField
                    {...field}
                    label={label}
                    defaultValue={defaultValue ? defaultValue : ''}
                    fullWidth
                    error={isError}
                    helperText={errorMessage}
                    {...props}
                />
            )}
            name={name}
            control={control}
        />
    );
}

export default TextInput;
