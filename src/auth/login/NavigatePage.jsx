import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NavigatePage() {
    const navigate = useNavigate();
    useEffect(() => {
        navigate("/auth/login");
    })
}

export default NavigatePage;