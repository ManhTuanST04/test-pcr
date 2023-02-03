import { object, string } from 'yup';

const SaiGonFormSchema = object().shape({
    patientName: string().required('Bắt buộc nhập'),
    address: string().required('Bắt buộc nhập'),
    passport: string().required('Bắt buộc nhập'),
    sex: string().required('Bắt buộc nhập').default('Nam (Male)'),
    dateOfBirth: string().required('Bắt buộc nhập').default('01/01/1990'),
    nationality: string().required('Bắt buộc nhập').default('Việt Nam'),
    samplingTime: string().required('Bắt buộc nhập'),
});

export default SaiGonFormSchema;