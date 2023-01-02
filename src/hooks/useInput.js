import { useState } from "react";

const useInput = (defaultValue) =>{
    const [input, setInput] = useState(defaultValue);
    const handleInputChange = (event) => setInput(event.target.value);
    return [input, handleInputChange];
}

export default useInput;