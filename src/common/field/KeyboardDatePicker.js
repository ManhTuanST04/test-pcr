import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

const KeyboardDatePicker = (props) => {
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
                defaultValue={defaultValue}
                render={({ field: { ref, ...rest } }) => (
                    <DatePicker
                        renderInput={(props) => (
                            <TextField
                                {...props}
                                label={label}
                                error={isError}
                                helperText={errorMessage}
                                fullWidth
                            />
                        )}
                        inputFormat={inputFormat}
                        {...rest}
                    />
                )}
            />
        </LocalizationProvider>
    );
};

export default KeyboardDatePicker;
