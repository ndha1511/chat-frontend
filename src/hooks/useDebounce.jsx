import { useEffect, useState } from "react";

function useDebounce(value, delay) {

    const [debounceValue, setDebouceValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => setDebouceValue(value), delay);

        return () => {
            clearTimeout(handler);
        }
    }, [value])

    return debounceValue;
}

export default useDebounce;