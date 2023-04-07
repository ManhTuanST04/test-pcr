import moment from 'moment';
import { cloneDeep } from 'lodash';
import { generateDocument } from './MainHandler';
import { randomIntFromInterval } from '../../common/Utils';
import Constant from '../../common/Constant';

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

        let collectedTime = generateCollectedTime(samplingTime);
        let footerTime = generateFooterTime(samplingTime);
        let signedTime = generateSignedTime(samplingTime);
        let barcode = generateBarcode(samplingTime);
        data.passport = data.passport?.toUpperCase();
        
        data.patientName = data.patientName?.toUpperCase();
        data.samplingTime = samplingTime.format('HH:mm DD/MM/YYYY');
        data.collectedTime = collectedTime;
        data.footerTime = footerTime;
        data.signedTime = signedTime;
        data.barcode = barcode;
        data.dateOfBirth = moment(data.dateOfBirth)?.format('DD/MM/YYYY');
        console.log("🚀 ~ file: handler.js:26 ~ onSubmit ~ data", data)

        generateDocument(data, "HaNoiTemplate.docx");
    } catch (error) {
        console.log('🚀 ~ onSubmit ~ error', error);
    }
};

const generateBarcode = (time) => {
    let samplingTime = cloneDeep(time);
    let dateDDMMYYY = samplingTime.format('DDMMYY');
    let dateYYYYMMDD = samplingTime.format('YYMMDD');
    let barcode = `${dateDDMMYYY}-${dateYYYYMMDD}${randomIntFromInterval(100000, 999999)}`;

    return barcode;
};

const generateCollectedTime = (time) => {
    let samplingTime = cloneDeep(time);
    return samplingTime
        .add(Constant.MINUTES_GEN_COLECTED_TIME, 'minutes')
        .format('HH:mm DD/MM/YYYY');
};

const generateFooterTime = (time) => {
    let samplingTime = cloneDeep(time);
    return samplingTime.add(Constant.HOUR_GEN_FOOTER_TIME, 'hour').format('HH:mm - DD/MM/YYYY');
};

const generateSignedTime = (time) => {
    let samplingTime = cloneDeep(time);
    return samplingTime
        .add(Constant.HOUR_GEN_FOOTER_TIME, 'hour')
        .format('HH:mm [Ngày] DD [Tháng] MM [Năm] YYYY');
};