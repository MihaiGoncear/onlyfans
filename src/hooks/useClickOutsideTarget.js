import { useEffect } from "react";

function useClickOutsideTarget(ref, stateFunc) {
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                ref.current &&
                !ref.current.contains(event.target) &&
                !event.target.classList.contains("stop-click-windows")
            ) {
                stateFunc();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, stateFunc]);
}

export default useClickOutsideTarget;
