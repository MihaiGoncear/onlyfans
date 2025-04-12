import { useState, useEffect } from "react";
import { debounce } from "../utils/functions";

function useWindowSizes() {
    const [windowSizes, setWindowSizes] = useState(calcCurrentWindowSizes());

    useEffect(() => {
        const debounceHandleResize = debounce(() => {
            setWindowSizes(calcCurrentWindowSizes);
        }, 0);

        window.addEventListener("resize", debounceHandleResize);

        return () => {
            window.removeEventListener("resize", debounceHandleResize);
        };
    }, []);

    return windowSizes;
}

function calcCurrentWindowSizes() {
    return {
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
        isPortrait: window.innerWidth < window.innerHeight,
        isLandscapeMobile:
            window.innerWidth >= window.innerHeight &&
            (window.innerWidth <= 950 || window.innerHeight <= 650),
        isMobileApp:
            window.innerWidth < window.innerHeight ||
            (window.innerWidth >= window.innerHeight &&
                (window.innerWidth <= 950 || window.innerHeight <= 650)),
    };
}

export default useWindowSizes;
