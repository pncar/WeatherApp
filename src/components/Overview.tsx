"use client";
import { useState, useEffect } from "react";
import DayTab from "@/components/DayTab";
import ConditionsData from "@/components/ConditionsData";
import { dayOfWeek, dayOfMonth, getHoursData, WDBG} from "@/utils/utils";
import { FaThermometer, FaCaretDown } from "react-icons/fa";
import { FaDroplet, FaGlassWaterDroplet } from "react-icons/fa6";
import {useTranslations} from 'next-intl';
import WeatherIcon from "@/components/WeatherIcon";
import HourTabSmall from "@/components/HourTabSmall";
import DayGraph from "@/components/DayGraph";
import WeekGraph from "@/components/WeekGraph";
import DynTemp from "@/components/DynTemp";
import DayNightCycle from "@/components/DayNightCycle";
import { useUserContext } from '@/context/UserContext';

const Overview = (props: {data: MainData}) => {
    const { data } = props;
    const [activeDay,setActiveDay] = useState<number>(0); // A number indicating the day the user has currently selected
    const [dailyGraph,setDailyGraph] = useState({dataKey: "temp"}); // The key that defines which set of data the DayGraph component displays
    const [conditions,setConditions] = useState<Day|Conds|null>(null); // The conditions object which is not the same as data.currentConditions
    const [viewingCurrent,setViewingCurrent] = useState<boolean>(true); // Boolean that indicates if the user is viewing the Current Conditions or an specific day
    const [toggleUnderTabs,setToggleUnderTabs] = useState<boolean>(true); // Toggles the day and hour tabs in the bottom

    const { tempType } = useUserContext();

    useEffect(()=>{
        if(data){
            handleConditions(data.currentConditions,true);
        }
    },[data]);

    const t = useTranslations('HomePage');
    const t_api = useTranslations('APIContent');

    const handleConditions = (day: Day|Conds, current: boolean = false, isHour: boolean = false) => {
        window.scrollTo(0,0);
        const {temp,icon,conditions,cloudcover,humidity,windspeed,pressure,visibility,uvindex,precip,preciptype,dew,solarradiation,solarenergy,datetime,datetimeEpoch,moonphase} = day;
        //console.log(conditions);
        setViewingCurrent(current);
        setConditions({...conditions,temp,icon,conditions,cloudcover,humidity,windspeed,pressure,visibility,uvindex,precip,preciptype,dew,solarradiation,solarenergy,datetime,datetimeEpoch,moonphase,isHour});
    }

    return(
        <div className="w-full m-auto h-full flex flex-col">
            {conditions? <>
            <div className="text-primary-600 dark:text-primary-300 w-full h-full bg-primary-200 dark:bg-primary-900">
                <div className="text-sm w-full xl:w-2/3 h-full m-auto">
                <div className="md:p-8 md:py-4">
                        <div className={`p-2 md:p-4 py-8 md:py-4 h-full`}>
                            <div className="pb-4">
                                <p className="font-bold">{
                                viewingCurrent ? 
                                <>{t("current_conditions")}</>:
                                <>{t("info_conditions_for")} {t_api(dayOfWeek(conditions.datetimeEpoch * 1000).title)} {dayOfMonth(conditions.datetimeEpoch * 1000)} {conditions.isHour ? <>{conditions.datetime}</>:<></>}</>
                                }</p>
                                <p>{data.resolvedAddress}</p>
                            </div>
                            <div className="">
                                <ConditionsData conditions={conditions}/>
                            </div>
                            <div className="bg-white dark:bg-primary-800 rounded-md w-full m-auto my-4 p-4 py-8 md:px-8 transition-all duration-1000 shadow-sm hover:shadow-xl">
                                <p className="font-bold text-primary-800 dark:text-primary-300">{t("info_daylight")}</p>
                                <DayNightCycle data={data}/>
                            </div>
                            <div className={`bg-white dark:bg-primary-800 rounded-md w-full h-full my-4 p-4 py-8 md:p-8 transition-all duration-1000 shadow-sm hover:shadow-xl`}>
                                <p className="font-bold text-primary-800 dark:text-primary-300">{t("info_dayinfo")}</p>
                                <div className="py-4">
                                    <DayGraph data={getHoursData(data.days[activeDay])} dataKey={dailyGraph.dataKey}/>
                                </div>
                                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0">
                                    <button onClick={()=>{setDailyGraph({...dailyGraph, dataKey: "temp"})}} className={`transition-all ${dailyGraph.dataKey !== "temp" ? "bg-primary-300 text-primary-950" : "bg-primary-950 text-primary-100"}  text-xs rounded-md p-2 px-3 mr-2 flex items-center`}><FaThermometer/><span className="mx-2">{t("info_temperature")}</span></button>
                                    <button onClick={()=>{setDailyGraph({...dailyGraph, dataKey: "humidity"})}} className={`transition-all ${dailyGraph.dataKey !== "humidity" ? "bg-primary-300 text-primary-950" : "bg-primary-950 text-primary-100"}  text-xs rounded-md p-2 px-3 mr-2 flex items-center`}><FaGlassWaterDroplet/><span className="mx-2">{t("info_humidity")}</span></button>
                                    <button onClick={()=>{setDailyGraph({...dailyGraph, dataKey: "precipprob"})}} className={`transition-all ${dailyGraph.dataKey !== "precipprob" ? "bg-primary-300 text-primary-950" : "bg-primary-950 text-primary-100"}  text-xs rounded-md p-2 px-3 mr-2 flex items-center`}><FaDroplet/><span className="mx-2">{t("info_precipitation")}</span></button>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-primary-800 rounded-md w-full h-full my-4 p-4 py-8 md:p-8 transition-all duration-1000 shadow-sm hover:shadow-xl">
                                <p className="font-bold text-primary-800 dark:text-primary-300">{t("info_weekinfo")}</p>
                                <div className="py-4">
                                    <WeekGraph data={data}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full shadow-lg sticky bottom-0 z-10">
                <div className="flex flex-col md:flex-row">
                    <div className={`flex flex-col w-full h-full p-2`}>
                        <div onClick={()=>{handleConditions(data.currentConditions, true)}} className={`${WDBG(data.currentConditions.icon)} rounded-lg shadow-lg cursor-pointer w-full ${viewingCurrent ? "bg-opacity-100" : "bg-opacity-50"} flex flex-col py-4`}>
                            <div className={`py-2 text-xs container w-full m-auto flex flex-col items-center text-primary-50`}>
                                <div className="flex flex-col">
                                    <div className="flex justify-center">
                                        <div className="font-bold text-sm px-2 flex items-center space-x-2">
                                            <div className="flex items-center">
                                                <WeatherIcon value={data.currentConditions.icon}/>
                                            </div>
                                            <div className="flex items-center text-lg">
                                                <DynTemp value={data.currentConditions.temp}/> º{tempType}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="font-normal text-sm px-2 text-center">
                                    {data.description}
                                </div>
                                <div className="font-bold text-tiny px-2 text-center">
                                        {data.resolvedAddress}
                                </div>
                            </div>
                            <div onClick={()=>{setToggleUnderTabs(!toggleUnderTabs)}} className="p-1 flex items-center justify-center">
                                <FaCaretDown className={`${toggleUnderTabs ? "rotate-0" : "rotate-180"} transition-all text-primary-300`}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${ toggleUnderTabs ? "max-h-[100vh]" : "max-h-0"} w-full transition-all overflow-hidden`}>
                    <div className="w-full">
                        <div className={`flex w-full overflow-x-scroll md:overflow-x-auto no-scrollbar relative p-0.5 space-x-0.5 bg-primary-300 dark:bg-primary-900`}>
                            {data.days.map((day:Day,key:number)=>
                                <div key={key} onClick={()=>{setActiveDay(key); handleConditions(day)}} className="w-full min-w-24 md:min-w-min h-32">
                                    <DayTab day={day} active={activeDay === key && viewingCurrent !== true ? true : false}/>
                                </div>
                            )}
                        </div>
                        <div className={`transition-all flex bg-primary-300 dark:bg-primary-900 justify-between text-xs w-full max-w-full overflow-x-scroll md:overflow-x-auto space-x-0.5 p-0.5 no-scrollbar`}>
                            {data.days[activeDay].hours.filter((hour:Conds,i:number)=>{return i % 2 === 0}).map((hour:Conds,key:number)=>
                                <div key={key} onClick={()=>{handleConditions(hour,false,true);}} className="w-full">
                                    <HourTabSmall hour={{...hour,sunriseEpoch: data.days[activeDay].sunriseEpoch, sunsetEpoch: data.days[activeDay].sunsetEpoch}} active={conditions?.datetimeEpoch !== hour.datetimeEpoch ? true : false}/>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div></>:<></>}
        </div>
    )
}
export default Overview;