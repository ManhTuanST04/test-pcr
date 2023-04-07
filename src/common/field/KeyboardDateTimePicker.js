import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

const KeyboardDateTimePicker = (props) => {
    const { control } = useFormContext();
    const { name, label, required, errors, defaultValue, className, setValue, getValues } = props;
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
                defaultValue={defaultValue}
                render={({ field: { ref, ...rest } }) => (
                    <DateTimePicker
                        renderInput={(props) => (
                            <TextField
                                {...props}
                                label={label}
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
