import moment from "moment";
import { useEffect, useState } from "react"

export const useDateTime = (dateTime, format) => {
    const [value, setValue] = useState('');

    useEffect(() => {
        if(dateTime) {
            let dateTimeMoment = moment(dateTime);
            if(!dateTimeMoment._isValid) {
                setValue('InValid Date');
            } else {
                let dateFormated = dateTimeMoment.format(format);
                setValue(dateFormated);
            }
        }

    }, [dateTime])

    return value;
}
