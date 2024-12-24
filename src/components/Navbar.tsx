import Logo from "@/components/Logo";
import TestSetState from "@/components/TestSetState";
import useCitySearch from "@/hooks/useCitySearch";
import { MouseEventHandler, useState, useRef } from "react";
import { useRouter } from 'next/navigation';
import { GiHamburgerMenu, GiMagnifyingGlass } from "react-icons/gi";
import { FaGlobe } from "react-icons/fa";
import {useTranslations} from 'next-intl';
import { useCookies } from 'next-client-cookies';
import Link from 'next/link';


const Navbar = (props: {onSwitchStyle: MouseEventHandler<HTMLDivElement>, onHandleSetLang: (lang:string) => void}) => {

    const { onSwitchStyle, onHandleSetLang } = props;
    const [toggle,setToggle] = useState<boolean>(false);
    const router = useRouter();

    const t = useTranslations('HomePage');

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const city = e.target as HTMLFormElement
        router.push(`/city/${city.city.value}`);
    }
    
    const cookies = useCookies();

    const cityRef =  useRef<HTMLInputElement|null>(null);
    const { searchValue, cityPool, handleSubmit, monitorInput } = useCitySearch(cityRef);


    return(
        <div className="w-full 2xl:w-2/3 m-auto container p-4 dark:text-primary-300 flex flex-col md:flex-row items-center md:space-x-8 space-y-2 md:space-y-0">
            <div className="flex w-full md:w-auto items-center">
                <div className="grow">
                    <Link href="/" className="cursor-pointer"><Logo/></Link>
                </div>
                <div className="grow justify-end flex md:hidden">
                    <div onClick={()=>{setToggle(!toggle)}} className="p-2 flex flex-col items-center cursor-pointer w-8 h-8 rounded-md bg-primary-300 dark:bg-primary-900">
                        <GiHamburgerMenu className={`${!toggle? "rotate-0" : "rotate-90"} transition-all`}/>
                    </div>
                </div>
            </div>
            <div className={`${toggle ? "max-h-[100vh]" : "max-h-0 md:max-h-[100vh]"} relative overflow-hidden md:overflow-visible transition-all flex w-full flex-col md:flex-row items-center justify-end md:space-x-4 space-y-4 md:space-y-0`}>
                <div className="flex items-center w-full md:w-auto space-x-2">
                    <div className="">
                        <p className="w-full font-bold py-2 md:py-0 dark:text-primary-300 md:hidden text-sm">Style: </p>
                        <div onClick={onSwitchStyle} className="rounded-full shadow-inner-md bg-primary-200 dark:bg-primary-800 transition-all flex w-12 cursor-pointer h-6"><div className={`transition-all translate-x-0 dark:translate-x-full w-6 h-6 bg-sky-600 rounded-full shadow-lg`}></div></div>
                    </div>
                    <div className="">
                        <p className="w-full font-bold py-2 md:py-0 dark:text-primary-300 md:hidden text-sm">System: </p>
                        <TestSetState/>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row items-center text-sm text-primary-800 w-full md:w-auto md:space-x-2">
                    <p className="w-full md:w-auto font-bold py-2 md:py-0 dark:text-primary-300">
                        <span className="inline-block md:hidden">{t("navbar_language")}: </span>
                        <FaGlobe className="hidden md:inline-block dark:text-primary-500"/>
                    </p>
                    <select onChange={(a)=>{onHandleSetLang(a.target.value)}} defaultValue={cookies.get("locale")} className="h-8 w-full md:w-40 py-1 px-2 rounded-md border bg-primary-50 dark:bg-primary-800 border-primary-300 dark:border-primary-700 text-primary-800 dark:text-primary-300 focus:outline-0">
                        <option value={"en"}>English</option>
                        <option value={"es"}>Español</option>
                        <option value={"de"}>Deutsch</option>
                        <option value={"jp"}>日本語</option>
                    </select>
                </div>
                <div className="relative w-full md:w-auto text-sm flex flex-col md:flex-row items-center text-primary-700 dark:text-primary-400">
                    <p className="w-full font-bold py-2 dark:text-primary-300 md:hidden">Search: </p>
                    <form onSubmit={handleSubmit} className="flex items-center h-8 w-full md:w-auto py-1 px-2 rounded-md border bg-primary-100 dark:bg-primary-800 border-primary-300 dark:border-primary-700">
                        <input ref={cityRef} onChange={monitorInput} defaultValue={searchValue} name="city" type="text" className="bg-transparent h-full w-full focus:outline-0"/>
                        <GiMagnifyingGlass/>
                    </form>
                    <div className="relative md:absolute w-full z-50 top-1 md:top-10">
                        {cityPool && searchValue.length > 2 ? 
                        <div className="overflow-y-scroll md:overflow-y-visible max-h-[50vh] md:max-h-full w-full bg-white rounded-md border border-primary-300 shadow-lg p-4 flex flex-col overflow-y-auto">
                            {cityPool.slice(0,20).map((item:City,key:number)=>
                            <p key={key} onClick={()=>{router.push(`/city/${item.name}`)}} className="flex space-x-2 transition-all bg-white hover:bg-primary-200 rounded-md hover:cursor-pointer p-2 px-4">
                                <span className={`fi fi-${item.country.toLowerCase() || ""}`}/><span>{item.name}</span>
                            </p>)}
                        </div>:<></>}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Navbar;