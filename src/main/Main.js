import { MenuItem, TextField } from "@mui/material";
import { useState } from "react";
import Constant from "../common/Constant";
import { HaNoiForm } from "./HaNoiForm";
import { SaiGonForm } from "./SaiGonForm";

export const Main = () => {
    const [locationTesting, setLocationTesting] = useState(Constant.LOCATION_TESTING.HA_NOI);

    return (
        <div className="Main">
            <div className="Main-body">
                <h2>PCR Testing Generator</h2>

                <div className="formGroup">
                    <label className="formLabel">Đầu Test</label>
                    <div className="formControl">
                        <TextField select value={locationTesting} onChange={(e) => setLocationTesting(e.target.value)} fullWidth>
                            <MenuItem value={Constant.LOCATION_TESTING.HA_NOI}>Đầu Hà Nội</MenuItem>
                            <MenuItem value={Constant.LOCATION_TESTING.SAI_GON}>Đầu Sài Gòn</MenuItem>
                        </TextField>
                    </div>
                </div>

                {locationTesting === Constant.LOCATION_TESTING.HA_NOI && <HaNoiForm />}
                {locationTesting === Constant.LOCATION_TESTING.SAI_GON && <SaiGonForm />}

            </div>

        </div>
    );
};
