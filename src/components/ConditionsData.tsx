import { FaCloud, FaMoon, FaWind, FaArrowDown, FaEye, FaSun, FaCloudRain, FaSolarPanel } from "react-icons/fa";
import { FaDroplet, FaGlassWaterDroplet } from "react-icons/fa6";
import { BsSunglasses } from "react-icons/bs";
import { moonPhase, windDir, uvIndex, WDBG } from "@/utils/utils";
import PercentBar from "@/components/PercentBar";
import MoonIcon from "@/components/MoonIcon";
import {useTranslations} from 'next-intl';
import WeatherIcon from "@/components/WeatherIcon";
import DynTemp from "@/components/DynTemp";
import { useUserContext } from '@/context/UserContext';

const ConditionsData = (props: {conditions: Conds}) => {

    const { conditions } = props;
    const t = useTranslations(`HomePage`);
    const { tempType } = useUserContext();

    return(
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className={`transition-all duration-1000 shadow-sm hover:shadow-xl ${WDBG(conditions.icon)} text-primary-100 rounded-md bg-white dark:bg-primary-800 p-4 flex flex-col w-full md:w-1/4 items-center py-4`}>
                <div className="flex flex-col items-center h-full justify-center">
                    <WeatherIcon value={conditions.icon} w={"w-16"}/>
                    <p className="text-4xl font-bold flex items-start pl-2"><DynTemp value={conditions.temp}/> <span className="text-xl">º{tempType}</span></p>
                    <div>
                        {/* @ts-expect-error Conditions being both a string and an object is API's fault*/}
                        <p>{conditions.conditions}</p>
                        <p>{conditions.description}</p>
                    </div>
                </div>
            </div>
            <div className="transition-all duration-1000 shadow-sm hover:shadow-xl rounded-md bg-white dark:bg-primary-800 grid sm:grid-cols-2 md:grid-cols-4 p-3 md:p-8 w-full md:w-3/4 space-y-2 md:space-y-0 divide-y md:divide-y-0 divide-primary-300 dark:divide-primary-900">
                <div className="flex flex-col bg-opacity-10 p-2 md:rounded-md transition-all hover:bg-opacity-20 duration-1000">
                    <p className="text-xs font-bold my-1 font-light flex items-center"><FaCloud className="mr-2"/> {t("cond_cloudcover")}</p>
                    <p className="text-xs font-bold"><span className="text-xl">{conditions.cloudcover}</span>%</p>
                    <PercentBar pctg={conditions.cloudcover} color={"#a8a29e"} bColor={"#0284c7"}/>
                </div>
                <div className="flex flex-col bg-opacity-10 p-2 md:rounded-md transition-all hover:bg-opacity-20 duration-1000">
                <p className="text-xs font-bold my-1 font-light flex items-center"><FaGlassWaterDroplet className="mr-2"/> {t("cond_humidity")}</p>
                    <p className="text-xs font-bold"><span className="text-xl">{conditions.humidity}</span>%</p>
                    <PercentBar pctg={conditions.humidity} color={"#818cf8"}/>
                </div>
                <div className="flex flex-col bg-opacity-10 p-2 md:rounded-md transition-all hover:bg-opacity-20 duration-1000">
                <p className="text-xs font-bold my-1 font-light flex items-center"><FaMoon className="mr-2"/> {t("cond_moonphase")}</p>
                    <div className="">
                        <p className="text-sm font-bold">{t(`moon_${moonPhase(conditions.moonphase).icon}`)}</p>
                        <MoonIcon value={moonPhase(conditions.moonphase).icon}/>
                    </div>
                </div>
                <div className="flex flex-col bg-opacity-10 p-2 md:rounded-md transition-all hover:bg-opacity-20 duration-1000">
                    <p className="text-xs font-bold my-1 font-light flex items-center"><FaWind className="mr-2"/> {t("cond_wind")}</p>
                    <p className=""><span className="text-xl font-bold">{conditions.windspeed}</span> km/h {windDir(conditions.winddir).title}</p>
                </div>
                <div className="flex flex-col bg-opacity-10 p-2 md:rounded-md transition-all hover:bg-opacity-20 duration-1000">
                <p className="text-xs font-bold my-1 font-light flex items-center"><FaArrowDown className="mr-2"/> {t("cond_pressure")}</p>
                    <p className="text-xl font-bold">{conditions.pressure}</p>
                </div>
                <div className="flex flex-col bg-opacity-10 p-2 md:rounded-md transition-all hover:bg-opacity-20 duration-1000">
                <p className="text-xs font-bold my-1 font-light flex items-center"><FaEye className="mr-2"/> {t("cond_visibility")}</p>
                    <p className="text-xs font-bold"><span className="text-xl">{conditions.visibility}</span> km</p>
                </div>
                <div className="flex flex-col bg-opacity-10 p-2 md:rounded-md transition-all hover:bg-opacity-20 duration-1000">
                <p className="text-xs font-bold my-1 font-light flex items-center"><BsSunglasses className="mr-2"/> {t("cond_uvindex")}</p>
                    <p className="text-xl font-bold">{conditions.uvindex} ({uvIndex(conditions.uvindex).title})</p>
                    <PercentBar pctg={conditions.uvindex * 10} color={uvIndex(conditions.uvindex).color}/>
                </div>
                <div className="flex flex-col bg-opacity-10 p-2 md:rounded-md transition-all hover:bg-opacity-20 duration-1000">
                <p className="text-xs font-bold my-1 font-light flex items-center"><FaCloudRain className="mr-2"/> {t("cond_precipitation")}</p>
                    <p className="text-xl font-bold">{conditions.precip || "-"}</p>
                    <div className="flex space-x-2">
                        {conditions.preciptype?.map((item:string,key:number)=><span key={key} className="text-tiny uppercase text-sky-600 dark:text-sky-500 font-bold">{item}</span>)}
                    </div>
                </div>
                <div className="flex flex-col bg-opacity-10 p-2 md:rounded-md transition-all hover:bg-opacity-20 duration-1000">
                    <p className="text-xs font-bold my-1 font-light flex items-center"><FaDroplet className="mr-2"/> {t("cond_dew")}</p>
                    <p className="text-xl font-bold">{conditions.dew}</p>
                </div>
                <div className="flex flex-col bg-opacity-10 p-2 md:rounded-md transition-all hover:bg-opacity-20 duration-1000">
                    <p className="text-xs font-bold my-1 font-light flex items-center"><FaSun className="mr-2"/> {t("cond_radiation")}</p>
                    <p className="text-xl font-bold"><span className="text-xl">{conditions.solarradiation}</span> W/m2</p>
                </div>
                <div className="flex flex-col bg-opacity-10 p-2 md:rounded-md transition-all hover:bg-opacity-20 duration-1000">
                    <p className="text-xs font-bold my-1 font-light flex items-center"><FaSolarPanel className="mr-2"/> {t("cond_solarenergy")}</p>
                    <p className="text-xl font-bold"><span className="text-xl">{conditions.solarenergy}</span> MJ/m2</p>
                </div>
            </div>
        </div>
    )
}
export default ConditionsData;