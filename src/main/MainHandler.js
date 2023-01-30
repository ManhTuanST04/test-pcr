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
        data.samplingTime = samplingTime.format('HH:mm DD/MM/YYYY');
        data.collectedTime = collectedTime;
        data.footerTime = footerTime;
        data.signedTime = signedTime;
        data.barcode = barcode;
        data.dateOfBirth = moment(data.dateOfBirth)?.format('DD/MM/YYYY');
        console.log("🚀 ~ file: handler.js:26 ~ onSubmit ~ data", data)

        generateDocument(data);
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

const loadFile = (url, callback) => {
    PizZipUtils.getBinaryContent(url, callback);
};

const generateFileName = (patientName) => {
    const fileName = `TEST - ${patientName}`;
    return fileName;
}

const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
  
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
  
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
  
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
  
    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }

const generateDocument = (data) => {
    loadFile(process.env.PUBLIC_URL + '/template.docx', function (error, content) {
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
            doc.render();
        } catch (error) {
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

        var out = doc.getZip().generate({
            type: 'blob',
            mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        }); //Output the document using Data-URI

        let fileName = generateFileName(data.patientName);
        saveAs(out, `${fileName}.docx`);
    });
};
