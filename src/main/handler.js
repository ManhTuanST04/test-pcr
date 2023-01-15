import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import PizZipUtils from 'pizzip/utils/index.js';
import { saveAs } from 'file-saver';
import moment from 'moment';
import Constant from '../common/Constant';
import { cloneDeep } from 'lodash';
import { randomIntFromInterval } from '../common/Utils';

export const onSubmit = (data) => {
    try {
        console.log(data);

        let samplingTime = moment(data.samplingTime);
        let collectedTime = generateCollectedTime(samplingTime);
        let footerTime = generateFooterTime(samplingTime);
        let signedTime = generateSignedTime(samplingTime);
        let barcode = generateBarcode(samplingTime);

        data.patientName = data.patientName?.toUpperCase();
        data.samplingTime = samplingTime.format('HH:mm DD-MM-YYYY');
        data.collectedTime = collectedTime;
        data.footerTime = footerTime;
        data.signedTime = signedTime;
        data.barcode = barcode;

        generateDocument(data);
    } catch (error) {
        console.log('🚀 ~ onSubmit ~ error', error);
    }
};

const generateBarcode = (time) => {
    let samplingTime = cloneDeep(time);
    let dateDDMMYYY = samplingTime.format('DDMMYYYY');
    let dateYYYYMMDD = samplingTime.format('YYYYMMDD');
    let barcode = `${dateDDMMYYY}-${dateYYYYMMDD}${randomIntFromInterval(100000, 999999)}`;

    return barcode;
};

const generateCollectedTime = (time) => {
    let samplingTime = cloneDeep(time);
    return samplingTime
        .add(Constant.MINUTES_GEN_COLECTED_TIME, 'minutes')
        .format('HH:mm DD-MM-YYYY');
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

const loadFile = (url, callback) => {
    PizZipUtils.getBinaryContent(url, callback);
};

const generateDocument = (data) => {
    loadFile('./template.docx', function (error, content) {
        if (error) {
            throw error;
        }
        var zip = new PizZip(content);
        var doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
        });
        doc.setData(data);
        try {
            // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
            doc.render();
        } catch (error) {
            // The error thrown here contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
            function replaceErrors(key, value) {
                if (value instanceof Error) {
                    return Object.getOwnPropertyNames(value).reduce(function (error, key) {
                        error[key] = value[key];
                        return error;
                    }, {});
                }
                return value;
            }
            console.log(JSON.stringify({ error: error }, replaceErrors));

            if (error.properties && error.properties.errors instanceof Array) {
                const errorMessages = error.properties.errors
                    .map(function (error) {
                        return error.properties.explanation;
                    })
                    .join('\n');
                console.log('errorMessages', errorMessages);
                // errorMessages is a humanly readable message looking like this :
                // 'The tag beginning with "foobar" is unopened'
            }
            throw error;
        }
        debugger
        var out = doc.getZip().generate({
            type: 'blob',
            mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        }); //Output the document using Data-URI
        saveAs(out, 'output.docx');
    });
};
