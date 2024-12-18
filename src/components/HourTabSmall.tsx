import { isDay, trimHour } from "@/utils/utils";
import WeatherIcon from "@/components/WeatherIcon";
import DynTemp from "@/components/DynTemp";

const HourTabSmall = (props: {hour:Conds, active: boolean}) => {
    const { hour, active } = props;
    return(
    <div className={`${hour.datetimeEpoch * 1000 < Date.now() - 7200000 ? "opacity-50" : "opacity-100"} dark:text-primary-300 cursor-pointer rounded-t-md ${ active ? "bg-primary-200 dark:bg-primary-900" : "bg-primary-50 dark:bg-primary-800"} border-b-4 ${isDay(hour.datetimeEpoch, hour.sunriseEpoch, hour.sunsetEpoch) ? "border-b-yellow-500" : "border-b-slate-600"} transition-all w-full flex items-center justify-center p-2`}>
        <div className="flex flex-col justify-center items-center">
            <div className="flex items-center flex-col md:flex-row">
                <WeatherIcon value={hour.icon}/>
                <span className="px-1 font-bold"><DynTemp value={hour.temp}/>º</span>
            </div>
            <div>{trimHour(hour.datetime)}hs <span className="hidden md:inline-block"> - {String(parseInt(trimHour(hour.datetime))+1).padStart(2,'0')} hs</span></div>
        </div>
    </div>
    )
}
export default HourTabSmall;