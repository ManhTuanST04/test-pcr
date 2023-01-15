import { object, string } from 'yup';

const MainFormSchema = object().shape({
    patientName: string().required('Bắt buộc nhập'),
    address: string().required('Bắt buộc nhập'),
    phone: string().required('Bắt buộc nhập'),
    passport: string().required('Bắt buộc nhập'),
    sex: string().required('Bắt buộc nhập'),
    dateOfBirth: string().required('Bắt buộc nhập'),
    nationality: string().required('Bắt buộc nhập'),
    samplingTime: string().required('Bắt buộc nhập'),
});

export default MainFormSchema;
