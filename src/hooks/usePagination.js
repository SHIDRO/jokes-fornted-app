import {useState} from 'react';
import { useLocation } from "react-router-dom"

const usePagination = () => {
    
    const location = useLocation();
    const [totalPages, setTotalPages] = useState(0);
    const queryParams = new URLSearchParams(location.search);
    let currentPage = +queryParams.get('p');
    if(currentPage === 0 || !currentPage ){
        currentPage = 1;
    }
    // console.log('usePagination', location, currentPage);

    return {currentPage, totalPages, setTotalPages, location}
}

export default usePagination;