import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Menu.css"

export default function Menu() {
    const navigate = useNavigate();

    const handleClickMenu = (menu) => {
        navigate(menu);
        const myElement = document.getElementById("btn-menu");
        myElement.click();
    }

    return (
        <details>
            <summary id="btn-menu"></summary>
            <nav class="menu">
                <a>Trang Chủ</a>
                <a onClick={() => handleClickMenu('/test-pcr')}>Test PCR</a>
                <a onClick={() => handleClickMenu('/bill')}>Phiếu Thu</a>
            </nav>
        </details>
    )
}