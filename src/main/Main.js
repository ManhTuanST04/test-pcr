import { MenuItem, TextField } from "@mui/material";
import { useState } from "react";
import Constant from "../common/Constant";
import { HaNoiForm } from "./HaNoiForm";
import { SaiGonForm } from "./SaiGonForm";

export const Main = () => {
    const [locationTesting, setLocationTesting] = useState(Constant.LOCATION_TESTING.HA_NOI);

    const myStyle={
        backgroundImage: 
            `url(${process.env.PUBLIC_URL+ "/bg-img4.jpg"})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh'
    };

    return (
        <div className="Main" style={myStyle}>
            <div className="Main-body">
                <h2 className="App-title">PCR TESTING GENERATOR</h2>

                <div className="formGroup">
                    {/* <label className="formLabel">Đầu Test</label> */}
                    <div className="formControl">
                        <TextField select value={locationTesting} onChange={(e) => setLocationTesting(e.target.value)} fullWidth label="Đầu Test">
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
