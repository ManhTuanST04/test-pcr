import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useState } from 'react';
import { TextField } from '@mui/material';
import moment from 'moment';
import { Controller, useFormContext } from 'react-hook-form';

const KeyboardDateTimePicker = (props) => {
    const { control } = useFormContext();
    const { name, label, required, errors, defaultValue, className, inputFormat } = props;
    let isError = false;
    let errorMessage = '';
    if (errors && errors.hasOwnProperty(name)) {
        isError = true;
        errorMessage = errors[name].message;
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
                name={name}
                control={control}
                render={({ field: { ref, ...rest } }) => (
                    <DateTimePicker
                        renderInput={(props) => (
                            <TextField
                                {...props}
                                error={isError}
                                helperText={errorMessage}
                                fullWidth
                            />
                        )}
                        ampm={false}
                        disableMaskedInput={true}
                        inputFormat={'DD/MM/YYYY HH:mm'}
                        {...rest}
                    />
                )}
            />
        </LocalizationProvider>
    );
};

export default KeyboardDateTimePicker;
