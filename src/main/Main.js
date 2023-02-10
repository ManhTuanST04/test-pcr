import { MenuItem, TextField } from '@mui/material';
import { useState } from 'react';
import Constant from '../common/Constant';
import { HaNoiForm } from './HaNoiForm';
import { SaiGonForm } from './SaiGonForm';

export const Main = () => {
    const [locationTesting, setLocationTesting] = useState(Constant.LOCATION_TESTING.HA_NOI);
    const [backgroundImage, setBackgroundImage] = useState('images/bg-img1.jpg');

    const myStyle = {
        backgroundImage: `url(${process.env.PUBLIC_URL + `/${backgroundImage}`})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
    };

    return (
        <div className="Main" style={myStyle}>
            <div className="change-bg">
                <div className="formControl">
                    <TextField
                        select
                        value={backgroundImage}
                        onChange={(e) => setBackgroundImage(`${e.target.value}`)}
                        fullWidth
                        variant="standard"
                    >
                        <MenuItem value="xam">Màu nền xám</MenuItem>
                        <MenuItem value="images/bg-img1.jpg">Ảnh nền 1</MenuItem>
                        <MenuItem value="images/bg-img2.jpg">Ảnh nền 2</MenuItem>
                        <MenuItem value="images/bg-img3.jpg">Ảnh nền 3</MenuItem>
                        <MenuItem value="images/bg-img4.jpg">Ảnh nền 4</MenuItem>
                        {/* <MenuItem value="images/bg-img5.jpg">Ảnh nền 5</MenuItem> */}
                    </TextField>
                </div>
            </div>

            <div className="Main-body">
                <h2 className="App-title">PCR TESTING GENERATOR</h2>

                <div className="formGroup">
                    {/* <label className="formLabel">Đầu Test</label> */}
                    <div className="formControl">
                        <TextField
                            select
                            value={locationTesting}
                            onChange={(e) => setLocationTesting(e.target.value)}
                            fullWidth
                            label="Đầu Test"
                        >
                            <MenuItem value={Constant.LOCATION_TESTING.HA_NOI}>Đầu Hà Nội</MenuItem>
                            <MenuItem value={Constant.LOCATION_TESTING.SAI_GON}>
                                Đầu Sài Gòn
                            </MenuItem>
                        </TextField>
                    </div>
                </div>

                {locationTesting === Constant.LOCATION_TESTING.HA_NOI && <HaNoiForm />}
                {locationTesting === Constant.LOCATION_TESTING.SAI_GON && <SaiGonForm />}
            </div>
        </div>
    );
};
