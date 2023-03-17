import { MenuItem, TextField } from "@mui/material";
import Constant from "common/Constant";
import { getBackgroundImage, setBackgroundImage } from "common/LocalStorageUtils";
import { useEffect, useState } from "react";

export default function MainLoyout({ component: Component }) {
    const [bgImage, setBgImage] = useState(Constant.BACKGROUND_IMAGE_DEFAULT);

    const onChangeBackgroundImage = (bgImage) => {
        setBgImage(bgImage);
        setBackgroundImage(bgImage);
    }

    useEffect(() => {
        initBackgroundImage();
    }, [])

    const initBackgroundImage = () => {
        let bgImage = getBackgroundImage();

        if (bgImage !== null && bgImage !== '') {
            setBgImage(bgImage);
        } else {
            setBgImage(Constant.BACKGROUND_IMAGE_DEFAULT);
        }
    }

    const myStyle = {
        backgroundImage: `url(${process.env.PUBLIC_URL + `/${bgImage}`})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
    };

    return <div className="Main" style={myStyle}>
        <div className="change-bg">
            <div className="formControl">
                <TextField
                    select
                    value={bgImage}
                    onChange={(e) => onChangeBackgroundImage(e.target.value)}
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
        
        <Component />
    </div>
}