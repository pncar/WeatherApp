"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/navigation';
import { FaMagnifyingGlass } from "react-icons/fa6";
import "/node_modules/flag-icons/css/flag-icons.min.css";
const CitySearch = () => {

    const cityRef = useRef<HTMLInputElement|null>(null);

    const [searchValue,setSearchValue] = useState<string>("");
    const [test,setTest] = useState<string>("");
    const [cityPool,setCityPool] = useState<City[]|null>(null);

    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //const event = e.target as HTMLFormElement
        //const val = event.city.value;
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

        /*
        const res = await fetch(`/api/test/${cityRef.current.value}`);
        const data = await res.json();
        setTest(data.city || "");
        console.log(data);
        setCityPool(data.cityArray);
        */

    };

    useEffect(()=>{
        const executeSearch = async () => {
            const res = await fetch(`/api/test/${searchValue}`);
            const data = await res.json();
            setTest(data.city || "");
            console.log(data);
            setCityPool(data.cityArray);
        }
        if(searchValue.length > 2){
            executeSearch();
        }
    },[searchValue]);

    return(
        <>
        <form onSubmit={handleSubmit} className="bg-white transition-all duration-1000 shadow-sm hover:shadow-2xl flex w-full md:w-1/3 border border-primary-300 dark:border-primary-800 text-sm rounded-md overflow-hidden p-2 h-16">
            <input ref={cityRef} name="city" onChange={monitorInput} value={searchValue} type="text" className="bg-transparent caret-sky-600 text-lg flex-grow h-full p-2 px-4 focus:outline-0"/>
            <button type="submit" disabled={searchValue.length > 2 ? false : true} className={`disabled:opacity-50 font-bold text-primary-50 h-full bg-sky-600 bg-gradient-to-tr from-sky-600 to-indigo-600 p-2 px-4 rounded-md h-full`}><FaMagnifyingGlass/></button>
        </form>
        {cityPool && searchValue.length > 2 ? <div className="w-full md:w-1/3 bg-primary-200 rounded-md shadow-lg p-4 flex flex-col">{cityPool.map((item:any,key:number)=><p key={key} onClick={()=>{setSearchValue(item.name)}} className="transition-all bg-primary-200 hover:bg-primary-50 hover:cursor-pointer p-2 px-4">{item.name} <span className={`fi fi-${item.country.toLowerCase() || ""}`}/></p>)}</div>: <></>}
        </>
    )
}

export default CitySearch;