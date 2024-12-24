"use client"
import { useState, useEffect, lazy, Suspense } from "react";
import { useParams } from 'next/navigation';
import { UserProvider } from "@/context/UserContext";
import { useCookies } from 'next-client-cookies';
import { useRouter } from "next/navigation";
const Navbar = lazy(() => import("@/components/Navbar"));
const Overview = lazy(() => import("@/components/Overview"));
import Spinner from "@/components/Spinner";


const City = () => {   
    const [data,setData] = useState<MainData>();
    const [style,setStyle] = useState<boolean>(()=>{
        if(localStorage.getItem("style") === "dark"){
            return true;
        }else{
            return false;
        }
    });
    const [lang,setLang] = useState("&lang=en");
    const [error,setError] = useState<{msg: string}|null>(null);

    const { city } = useParams();

    const cookies = useCookies();

    const router = useRouter();

    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    useEffect(()=>{
        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${apiKey}${lang}&contentType=json`;
        fetch(url)
        .then((r)=>{
            return r.json() || null;
        })
        .then((d)=>{
            console.log(d);
            setData(d);
            document.title = `Weather in ${d.resolvedAddress}`;
        })
        .catch((e)=>{
            console.log(e);
            setError({...error,msg: "Bad request"});
        })

    },[lang]);

    const switchStyle = () => {
        setStyle(!style);
    }

    useEffect(()=>{
        if(!style){
            localStorage.setItem("style","light");
        }else{
            localStorage.setItem("style","dark");
        }
    },[style])


    const handleSetLang = (lang: string): void => {
        cookies.set("locale",lang);
        setLang(`&lang=${cookies.get("locale") || "en"}`);
        router.refresh();
    }

    return(
        <UserProvider>
            <div className={`${style ? "dark" : ""}`}>
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center space-x-2 bg-white dark:bg-primary-950 text-primary-900 dark:text-primary-50"><Spinner/><span>Loading</span></div>}>
                <div className={``}>
                    <div className={`shadow-lg bg-primary-300 dark:bg-primary-900 flex flex-col min-h-screen`}>
                        {error?
                        <div className="absolute bottom-4 w-full font-bold text-sm text-primary-300">
                            <div className="bg-red-500 p-2 px-4 rounded-md w-32 m-auto text-center">
                                <p>{error.msg}</p>
                            </div>
                        </div>:<></>}
                        <div className="z-20 sticky top-0 w-full shadow-md bg-primary-50 dark:bg-primary-950">
                            <Navbar onSwitchStyle={switchStyle} onHandleSetLang={handleSetLang}/>
                        </div>
                        <div className="w-full m-auto">
                            {data ? 
                            <>
                                <Overview data={data}/>
                            </>:<></>
                            }
                        </div>
                    </div>
                </div>
            </Suspense>
            </div>
        </UserProvider>
    )
}
export default City;