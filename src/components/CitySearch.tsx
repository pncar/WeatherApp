"use client";
import { useRef } from "react";
import { useRouter } from 'next/navigation';
import { FaMagnifyingGlass } from "react-icons/fa6";
import useCitySearch from "@/hooks/useCitySearch";
const CitySearch = () => {

    const cityRef =  useRef<HTMLInputElement|null>(null);
    const router = useRouter();
    const { searchValue, cityPool, handleSubmit, monitorInput } = useCitySearch(cityRef);

    return(
        <>
        <form onSubmit={handleSubmit} className="bg-white transition-all duration-1000 shadow-sm hover:shadow-2xl flex w-full md:w-1/3 border border-primary-300 dark:border-primary-800 text-sm rounded-md overflow-hidden p-2 h-16">
            <input ref={cityRef} autoComplete={"off"} name="city" onChange={monitorInput} defaultValue={searchValue} type="text" className="bg-transparent caret-sky-600 text-lg flex-grow h-full p-2 px-4 focus:outline-0"/>
            <button type="submit" disabled={searchValue.length > 2 ? false : true} className={`disabled:opacity-50 font-bold text-primary-50 h-full bg-sky-600 bg-gradient-to-tr from-sky-600 to-indigo-600 p-2 px-4 rounded-md h-full`}><FaMagnifyingGlass/></button>
        </form>
        {cityPool && searchValue.length > 2 ? 
        <div className="w-full md:w-1/3 bg-white rounded-md border border-primary-300 shadow-lg p-4 flex flex-col overflow-y-auto max-h-[75vh]">
            {cityPool.map((item:City,key:number)=>
            <p key={key} onClick={()=>{router.push(`/city/${item.name}`)}} className="flex space-x-2 transition-all bg-white hover:bg-primary-200 rounded-md hover:cursor-pointer p-2 px-4">
                <span className={`fi fi-${item.country.toLowerCase() || ""}`}/><span>{item.name}</span>
            </p>)}
        </div>:<></>}
        </>
    )
}

export default CitySearch;