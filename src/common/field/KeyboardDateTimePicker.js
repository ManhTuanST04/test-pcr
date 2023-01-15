import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useState } from 'react';
import { TextField } from '@mui/material';
import moment from 'moment';

const KeyboardDateTimePicker = (props) => {
    let { name, errors, setValue, label, defaultValue } = props;
    
    const [valueInput, setValueInput] = useState();

    const onChange = (newValue) => {
        setValue(name, newValue);
        setValueInput(newValue);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
                renderInput={(props) => (
                    <TextField
                        {...props}
                        error={!!errors[name]}
                        helperText={errors[name] ? errors[name]?.message : ''}
                        fullWidth
                    />
                )}
                value={valueInput}
                onChange={onChange}
                ampm={false}
                disableMaskedInput={true}
                inputFormat={"DD/MM/YYYY HH:mm"}
                
            />
        </LocalizationProvider>
    );
};

export default KeyboardDateTimePicker;
