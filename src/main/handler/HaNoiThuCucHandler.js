import moment from 'moment';
import { cloneDeep } from 'lodash';
import { generateDocument } from './MainHandler';
import Constant from '../../common/Constant';
import { capitalizeString } from '../../common/Utils';

export const onSubmit = (data, setError) => {
    try {
        console.log(data);
        let samplingTime = moment(data.samplingTime);
        if(!samplingTime._isValid) {
            setError('samplingTime', {
                type: "manual",
                message: 'Ngày lấy mẫu sai định dạng',
            });
            return;
        }

        let sexVie = data.sex;
        let sexEng = "";
        if (sexVie === "Nam") {
            sexEng = "Male";
        } else {
            sexEng = "Female";
        }
        data.sexVie = sexVie;
        data.sexEng = sexEng;

        let collectedTime = generateCollectedTime(samplingTime);
        data.collectedTime = collectedTime;
        let resultTime = generateResultTime(samplingTime);
        data.resultTime = resultTime;
        data.samplingTime = samplingTime.format('DD/MM/YYYY HH:mm');
        data.passport = data.passport?.toUpperCase();
        data.patientName = data.patientName?.toUpperCase();
        data.dateOfBirth = moment(data.dateOfBirth)?.format('DD/MM/YYYY');
        data.testDate = moment().format('DD/MM/YYYY');
        data.address = capitalizeString(data.address);

        console.log("🚀 ~ file: handler.js:26 ~ onSubmit ~ data", data)

        generateDocument(data, "HaNoiThuCucTemplate.docx");
    } catch (error) {
        console.log('🚀 ~ onSubmit ~ error', error);
    }
};

const generateCollectedTime = (time) => {
    let samplingTime = cloneDeep(time);
    return samplingTime
        .add(Constant.MINUTES_GEN_COLECTED_TIME, 'minutes')
        .format('DD/MM/YYYY HH:mm');
};

const generateResultTime = (time) => {
    let samplingTime = cloneDeep(time);
    return samplingTime.add(Constant.HOUR_GEN_FOOTER_TIME, 'hour').format('HH:mm DD/MM/YYYY');
};
