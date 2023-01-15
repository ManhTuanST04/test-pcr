import { TextField } from '@mui/material';
import { useEffect } from 'react';

const TextInput = (props) => {
    let { name, errors, setValue, label, defaultValue, clearErrors} = props;

    const onChange = (e) => {
        let data = e.target.value;
        setValue(name, data);

    };

    useEffect (() => {
        setValue(name, defaultValue);
        clearErrors(name);
    }, [])

    return (
        <TextField
            name={name}
            label={label}
            error={!!errors[name]}
            helperText={errors[name] ? errors[name]?.message : ''}
            onChange={onChange}
            fullWidth
            {...props}
        />
    );
};

export default TextInput;
