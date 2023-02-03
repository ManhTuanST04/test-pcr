import moment from 'moment';
import Constant from '../../common/Constant';
import { cloneDeep } from 'lodash';
import { randomIntFromInterval } from '../../common/Utils';
import { generateDocument } from './MainHandler';

export const onSubmit = (data) => {
    try {
        console.log(data);

        let samplingTime = moment(data.samplingTime);
        let collectedTime = generateCollectedTime(samplingTime);
        let reportedTime = generateReportTime(samplingTime);
        let reportedTimeRight = generateReportTimeRight(samplingTime);
        let testDateEng = generateTestDateEng(samplingTime);

        let sexVie = data.sex;
        let sexEng = "";
        if (sexVie === "Nam") {
            sexEng = "Male";
        } else {
            sexEng = "Female";
        }
        data.sexVie = sexVie;
        data.sexEng = sexEng;

        data.patientName = data.patientName?.toUpperCase();
        data.dateOfBirth = moment(data.dateOfBirth)?.format('DD/MM/YYYY');
        data.sId = samplingTime.format('DDMMYY');;
        data.barcode = randomIntFromInterval(100000, 999999);

        data.samplingTime = samplingTime.format('HH:mm DD/MM/YYYY');
        data.collectedTime = collectedTime;
        data.testDate = samplingTime.format('DD/MM/YYYY');
        data.reportedTime = reportedTime;
        data.reportedTimeRight = reportedTimeRight;
        data.testDateEng = testDateEng;

        console.log("🚀 ~ file: handler.js:26 ~ onSubmit ~ data", data)
        generateDocument(data, "SaiGonTemplate.docx");
    } catch (error) {
        console.log('🚀 ~ onSubmit ~ error', error);
    }
};

const generateCollectedTime = (time) => {
    let samplingTime = cloneDeep(time);
    return samplingTime
        .add(13, 'minutes')
        .format('HH:mm DD/MM/YYYY');
};

const generateReportTime = (time) => {
    let samplingTime = cloneDeep(time);
    return samplingTime
        .add(Constant.HOUR_GEN_FOOTER_TIME, 'hour')
        .format('HH:mm [ngày] DD [tháng] MM [năm] YYYY');
};

const generateReportTimeRight = (time) => {
    let samplingTime = cloneDeep(time);
    return samplingTime
        .add(Constant.HOUR_GEN_FOOTER_TIME, 'hour')
        .format('[Ngày] DD [tháng] MM [năm] YYYY');
};

const generateTestDateEng = (time) => {
    let testDateEng = cloneDeep(time);

    testDateEng = testDateEng.format('MMMM DD, YYYY');
    return testDateEng;
};