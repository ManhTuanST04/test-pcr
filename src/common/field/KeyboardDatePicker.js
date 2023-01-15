import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from 'react';
import { TextField } from '@mui/material';
import moment from 'moment';

const KeyboardDatePicker = (props) => {
    let { name, errors, setValue, label, defaultValue, inputFormat } = props;
    
    const [valueInput, setValueInput] = useState();

    const onChange = (newValue) => {
        setValue(name, newValue);
        setValueInput(newValue);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
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
                disableMaskedInput={true}
                inputFormat={inputFormat}
            />
        </LocalizationProvider>
    );
};

export default KeyboardDatePicker;                
;
