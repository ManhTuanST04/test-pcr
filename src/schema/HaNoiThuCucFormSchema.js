import { object, string } from 'yup';

const HaNoiThuCucFormSchema = object().shape({
    patientName: string().required('Bắt buộc nhập'),
    address: string().required('Bắt buộc nhập'),
    phone: string().required('Bắt buộc nhập'),
    passport: string().required('Bắt buộc nhập'),
    sex: string().required('Bắt buộc nhập').default('Nam'),
    dateOfBirth: string().required('Bắt buộc nhập').default('01/01/1990').nullable(),
    samplingTime: string().required('Bắt buộc nhập').nullable(),
});

export default HaNoiThuCucFormSchema;