import { Button, MenuItem, TextField } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import MainFormSchema from '../schema/MainFormSchema';
import { onSubmit } from './MainHandler';
import TextInput from '../common/field/TextInput';
import { yupResolver } from '@hookform/resolvers/yup';
import KeyboardDateTimePicker from '../common/field/KeyboardDateTimePicker';
import KeyboardDatePicker from '../common/field/KeyboardDatePicker';

export const Main = () => {
    const methods = useForm({
        mode: 'onChange',
        resolver: yupResolver(MainFormSchema),
    });

    const {
        register,
        getValues,
        setValue,
        clearErrors,
        handleSubmit,
        formState: { errors },
    } = methods;

    return (
        <div className="Main">
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className="Main-body">
                    PCR Testing Generator
                    <div className="formGroup">
                        <label className="formLabel">Họ và tên</label>
                        <div className="formControl">
                            <TextInput name="patientName" errors={errors} setValue={setValue} />
                        </div>
                    </div>
                    <div className="formGroup">
                        <label className="formLabel">Địa chỉ</label>
                        <div className="formControl">
                            <TextInput name="address" errors={errors} setValue={setValue} />
                        </div>
                    </div>
                    <div className="formGroup">
                        <label className="formLabel">Số điện thoại</label>
                        <div className="formControl">
                            <TextInput name="phone" errors={errors} setValue={setValue} />
                        </div>
                    </div>
                    <div className="formGroup">
                        <label className="formLabel">Số hộ chiếu</label>
                        <div className="formControl">
                            <TextInput name="passport" errors={errors} setValue={setValue} />
                        </div>
                    </div>
                    <div className="formGroup">
                        <label className="formLabel">Giới tính</label>
                        <div className="formControl">
                            <TextInput
                                name="sex"
                                errors={errors}
                                setValue={setValue}
                                select
                                defaultValue={'Nam (Male)'}
                            >
                                <MenuItem value={'Nam (Male)'}>Nam (Male)</MenuItem>
                                <MenuItem value={'Nữ (Female)'}>Nữ (Female)</MenuItem>
                            </TextInput>
                        </div>
                    </div>
                    <div className="formGroup">
                        <label className="formLabel">
                            Ngày tháng năm sinh (Định dạng: ngày/tháng/năm) Ví dụ: 13/04/1997
                        </label>
                        <div className="formControl">
                            <KeyboardDatePicker
                                name="dateOfBirth"
                                errors={errors}
                                setValue={setValue}
                                inputFormat="DD/MM/YYYY"
                                defaultValue={"01/01/1990"}
                            />
                        </div>
                    </div>
                    <div className="formGroup">
                        <label className="formLabel">Quốc tịch</label>
                        <div className="formControl">
                            <TextInput
                                name="nationality"
                                errors={errors}
                                setValue={setValue}
                                defaultValue="Việt Nam"
                            />
                        </div>
                    </div>
                    <div className="formGroup">
                        <label className="formLabel">
                            Thời gian lấy mẫu (Định dạng: ngày/tháng/năm giờ:phút) Ví dụ: 15/01/2023
                            08:00
                        </label>
                        <div className="formControl">
                            <KeyboardDateTimePicker
                                name="samplingTime"
                                errors={errors}
                                getValues={getValues}
                                setValue={setValue}
                            />
                        </div>
                    </div>
                    <Button type="submit" variant="contained">
                        Lấy Phiếu Test
                    </Button>
                    {/* <Button type="submit" variant="contained">
                        PDF
                    </Button> */}
                </form>
            </FormProvider>
        </div>
    );
};
