import {useState, useEffect, useRef} from 'react';

const useValidate = (validationFunc) => {
    const [isInputValid, setIsInputValid] = useState(false);
    const [isTouched, setIsTouched] = useState(false);
    const inputRef = useRef();

    const hasError = isTouched && !isInputValid;

    const onChange = () => {
        const value = inputRef.current.value;
        if(validationFunc(value.trim())){
            setIsInputValid(true);
        }else{
            setIsInputValid(false)
        }
    }

    const onBlur = () => {
        setIsTouched(true);
    }

    return {isInputValid, hasError, inputRef, onChange, onBlur};
}

export default useValidate;