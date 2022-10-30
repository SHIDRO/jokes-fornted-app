import {useState, useEffect, useRef} from 'react';

const useValidate = (validationFunc) => {
    const [isInputValid, setIsInputValid] = useState(false);
    const [isTouched, setIsTouched] = useState(false);
    const inputRef = useRef();

    const hasError = isTouched && !isInputValid;

    const onChange = (givenValue) => {
        let value = inputRef.current;

        if(!inputRef.current){
            value = givenValue
        } else {
            value = inputRef.current.value
        }

        console.log(value)
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