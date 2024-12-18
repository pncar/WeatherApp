import { FaArrowUp, FaArrowDown, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FaGlassWaterDroplet } from "react-icons/fa6";
import WeatherIcon from "@/components/WeatherIcon";
import { windDir, isDay } from "@/utils/utils";
import {useTranslations} from 'next-intl';
import DynTemp from "@/components/DynTemp";
import { useUserContext } from '../context/UserContext';

const HourTab = (props: {hour: Conds, active?: boolean}) => {
    const {hour, active = false} = props;
    const t = useTranslations('HomePage');
    const { tempType } = useUserContext();
    
    const Wind = (props: {icon: string}) => {
        const { icon } = props;
        switch(icon){
            case "east":
                return <FaArrowLeft/>;
            case "west":
                return <FaArrowRight/>;
            case "south":
                return <FaArrowUp/>;
            case "north":
            default:
                return <FaArrowDown/>;
        }
    }

    return(
        <div>
            <div className={`${active ? "bg-primary-100 dark:bg-primary-800" : ""} hover:bg-primary-100 dark:hover:bg-primary-800  text-primary-600 dark:text-primary-300 text-xs p-4 flex border-b border-primary-300 dark:border-primary-700 ${hour.datetimeEpoch * 1000 < Date.now() ? "opacity-50" : "opacity-100"}`}>
                <div className="w-12">
                    <div className={`w-full h-full ${isDay(hour.datetimeEpoch, hour.sunriseEpoch, hour.sunsetEpoch) ? "bg-amber-500" : "bg-slate-600"}`}>
                    </div>
                </div>
                <div className="w-full flex items-center px-2 justify-end">
                    {hour.datetime}
                </div>
                <div className="w-full flex items-center">
                    <div className="w-full px-3 flex items-center justify-end">
                        <span className="font-black"><DynTemp value={hour.temp}/> º{tempType}</span>
                    </div>
                </div>
                <div className="w-full flex items-center">
                    <div className="w-auto flex items-center justify-end">
                        <WeatherIcon value={hour.icon}/>
                        {/* @ts-expect-error Conditions being both a string and an object is API's fault*/}
                        <span className="mx-2">{hour.conditions}</span>
                    </div>
                </div>
                <div className="w-full flex items-center justify-end">
                    <FaGlassWaterDroplet className="mr-2"/>
                    <span className="w-8">{hour.humidity}%</span>
                </div>
                <div className="w-full flex items-center justify-end">
                    <Wind icon={windDir(hour.winddir).icon}/>
                    <span className="ml-2">{hour.windspeed} km/h {t(`dir_${windDir(hour.winddir).icon}`)}</span>
                </div>
            </div>
        </div>
    )
}
export default HourTab;