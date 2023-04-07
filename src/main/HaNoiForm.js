import { memo } from 'react';
import { Button, MenuItem } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import HaNoiFormSchema from '../schema/HaNoiFormSchema';
import { onSubmit } from './handler/HaNoiHandler';
import TextInput from '../common/field/TextInput';
import { yupResolver } from '@hookform/resolvers/yup';
import KeyboardDateTimePicker from '../common/field/KeyboardDateTimePicker';
import KeyboardDatePicker from '../common/field/KeyboardDatePicker';

const HaNoiForm = (props) => {
    const methods = useForm({
        mode: 'onChange',
        resolver: yupResolver(HaNoiFormSchema),
    });

    const {
        getValues,
        setValue,
        handleSubmit,
        formState: { errors },
        setError
    } = methods;

    return (
        <>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit((data) => {
                    onSubmit(data, setError);
                })}>
                    <div className="formGroup">
                        {/* <label className="formLabel">Họ và tên</label> */}
                        <div className="formControl">
                            <TextInput name="patientName" errors={errors} setValue={setValue} label={"Họ và tên"} onChange={props.onChange}/>
                        </div>
                    </div>
                    <div className="formGroup">
                        {/* <label className="formLabel">Địa chỉ</label> */}
                        <div className="formControl">
                            <TextInput name="address" errors={errors} setValue={setValue} label={"Địa chỉ"} onChange={props.onChange}/>
                        </div>
                    </div>
                    <div className="formGroup">
                        {/* <label className="formLabel">Số điện thoại</label> */}
                        <div className="formControl">
                            <TextInput name="phone" errors={errors} setValue={setValue} label={"Số điện thoại"} onChange={props.onChange}/>
                        </div>
                    </div>
                    <div className="formGroup">
                        {/* <label className="formLabel">Số hộ chiếu</label> */}
                        <div className="formControl">
                            <TextInput name="passport" errors={errors} setValue={setValue} label={"Số hộ chiếu"} onChange={props.onChange}/>
                        </div>
                    </div>
                    <div className="formGroup">
                        {/* <label className="formLabel">Giới tính</label> */}
                        <div className="formControl">
                            <TextInput
                                name="sex"
                                errors={errors}
                                setValue={setValue}
                                select
                                defaultValue={'Nam (Male)'}
                                label={"Giới tính"}
                                onChange={props.onChange}
                            >
                                <MenuItem value={'Nam (Male)'}>Nam (Male)</MenuItem>
                                <MenuItem value={'Nữ (Female)'}>Nữ (Female)</MenuItem>
                            </TextInput>
                        </div>
                    </div>
                    <div className="formGroup">
                        {/* <label className="formLabel">
                            Ngày tháng năm sinh (Định dạng: ngày/tháng/năm) Ví dụ: 13/04/1997
                        </label> */}
                        <div className="formControl">
                            <KeyboardDatePicker
                                name="dateOfBirth"
                                errors={errors}
                                setValue={setValue}
                                inputFormat="DD/MM/YYYY"
                                defaultValue={"01/01/1990"}
                                label={"Ngày tháng năm sinh (ngày/tháng/năm => VD: 13/04/1997)"}
                                onChange={props.onChange}
                            />
                        </div>
                    </div>
                    <div className="formGroup">
                        {/* <label className="formLabel">Quốc tịch</label> */}
                        <div className="formControl">
                            <TextInput
                                name="nationality"
                                errors={errors}
                                setValue={setValue}
                                defaultValue="Việt Nam"
                                label={"Quốc tịch"}
                                onChange={props.onChange}
                            />
                        </div>
                    </div>
                    <div className="formGroup">
                        {/* <label className="formLabel">
                            Thời gian lấy mẫu (ngày/tháng/năm giờ:phút => VD: 15/01/2023
                            08:00)
                        </label> */}
                        <div className="formControl">
                            <KeyboardDateTimePicker
                                name="samplingTime"
                                errors={errors}
                                getValues={getValues}
                                setValue={setValue}
                                label={"Thời gian lấy mẫu (ngày/tháng/năm giờ:phút => VD: 15/01/2023 08:00)"}
                                onChange={props.onChange}
                            />
                        </div>
                    </div>
                    <Button type="submit" variant="contained" className="btn-submit">
                        Lấy Phiếu Test
                    </Button>
                    {/* <Button type="submit" variant="contained">
                        PDF
                    </Button> */}
                </form>
            </FormProvider>
        </>
    );
};

export default memo(HaNoiForm);