"use client";
import { useState, useEffect, useRef, RefObject } from "react";
import { useRouter } from 'next/navigation';

const useCitySearch = (inputRef:RefObject<HTMLInputElement|null>) => {
    // const cityRef = useRef<HTMLInputElement|null>(null); 

    const cityRef = inputRef;

    const [searchValue,setSearchValue] = useState<string>("");
    const [cityPool,setCityPool] = useState<City[]|null>(null);

    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(searchValue.length > 2){
            router.push(`/city/${searchValue}`);
        }else{
            alert("Pedilo");
        }
    }

    const monitorInput = async () => {
        
        if (!cityRef.current) return;
        const inputValue = cityRef.current.value;
        if (inputValue.length > 100) {
          cityRef.current.value = "";
        }
        setSearchValue(cityRef.current.value);

    };

    useEffect(()=>{
        const executeSearch = async () => {
            const res = await fetch(`/api/test/${searchValue}`);
            const data = await res.json();
            console.log(data);
            setCityPool(data.cityArray);
        }
        if(searchValue.length > 2){
            executeSearch();
        }
    },[searchValue]);

    return { searchValue, cityPool, handleSubmit, monitorInput}
}

export default useCitySearch;