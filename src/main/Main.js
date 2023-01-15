import { Button, MenuItem, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import MainFormSchema from '../Schema/MainFormSchema';
import { onSubmit } from './handler';
import TextInput from '../common/field/TextInput';
import { yupResolver } from '@hookform/resolvers/yup';
import KeyboardDateTimePicker from '../common/field/KeyboardDateTimePicker';
import KeyboardDatePicker from '../common/field/KeyboardDatePicker';

export const Main = () => {
    const {
        register,
        setValue,
        clearErrors,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: 'all',
        resolver: yupResolver(MainFormSchema),
    });

    return (
        <div className="Main">
            <form onSubmit={handleSubmit(onSubmit)} className="Main-body">
                PCR Testing Generator
                <div className="formGroup">
                    <label className="formLabel">Họ và tên</label>
                    <TextInput
                        name="patientName"
                        errors={errors}
                        setValue={setValue}
                        clearErrors={clearErrors}
                    />
                </div>
                <div className="formGroup">
                    <label className="formLabel">Địa chỉ</label>
                    <TextInput
                        name="address"
                        errors={errors}
                        setValue={setValue}
                        clearErrors={clearErrors}
                    />
                </div>
                <div className="formGroup">
                    <label className="formLabel">Số điện thoại</label>
                    <TextInput
                        name="phone"
                        errors={errors}
                        setValue={setValue}
                        clearErrors={clearErrors}
                    />
                </div>
                <div className="formGroup">
                    <label className="formLabel">Số hộ chiếu</label>
                    <TextInput
                        name="passport"
                        errors={errors}
                        setValue={setValue}
                        clearErrors={clearErrors}
                    />
                </div>
                <div className="formGroup">
                    <label className="formLabel">Giới tính</label>
                    <TextInput
                        name="sex"
                        errors={errors}
                        setValue={setValue}
                        clearErrors={clearErrors}
                        select
                        defaultValue={'Nam (Male)'}
                    >
                        <MenuItem value={'Nam (Male)'}>Nam (Male)</MenuItem>
                        <MenuItem value={'Nữ (Female)'}>Nữ (Female)</MenuItem>
                    </TextInput>
                </div>
                <div className="formGroup">
                    <label className="formLabel">
                        Ngày tháng năm sinh (Định dạng: ngày/tháng/năm) Ví dụ: 13/04/1997
                    </label>
                    {/* <TextInput name="dateOfBirth" errors={errors} setValue={setValue} /> */}
                    <KeyboardDatePicker
                        name="dateOfBirth"
                        errors={errors}
                        setValue={setValue}
                        clearErrors={clearErrors}
                        inputFormat="DD/MM/YYYY"
                    />
                </div>
                <div className="formGroup">
                    <label className="formLabel">Quốc tịch</label>
                    <TextInput
                        name="nationality"
                        errors={errors}
                        setValue={setValue}
                        clearErrors={clearErrors}
                        defaultValue="Việt Nam"
                    />
                </div>
                <div className="formGroup">
                    <label className="formLabel">
                        Thời gian lấy mẫu (Định dạng: ngày/tháng/năm giờ:phút) Ví dụ: 15/01/2023
                        08:00
                    </label>
                    {/* <TextInput name="samplingTime" errors={errors} setValue={setValue} /> */}
                    <KeyboardDateTimePicker
                        name="samplingTime"
                        errors={errors}
                        setValue={setValue}
                        clearErrors={clearErrors}
                    />
                </div>
                <Button type="submit" variant="contained">
                    Lấy Phiếu Test
                </Button>
                <Button type="submit" variant="contained">
                    PDF
                </Button>
            </form>
        </div>
    );
};
