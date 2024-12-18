import WeatherIcon from "@/components/WeatherIcon";
import { dayOfWeek, dayOfMonth } from "@/utils/utils";
import {useTranslations} from 'next-intl';
import DynTemp from "@/components/DynTemp";
const DayTab = (props: { day: Day, active?: boolean }) => {
    const { day, active = "false" } = props;
    const t_api = useTranslations('APIContent');
    return(
        <div className={`${active ? "bg-white dark:bg-primary-800" : "bg-primary-200 dark:bg-primary-900"} rounded-md w-full text-primary-800 dark:text-primary-400 h-full text-center cursor-pointer shadow-md hover:shadow-lg transition-all flex items-center justify-center flex-col text-xs p-4`}>
            <div>
                {t_api(dayOfWeek(day.datetimeEpoch * 1000,"short").title)} {dayOfMonth(day.datetimeEpoch * 1000)}
            </div>
            <div>
                <WeatherIcon value={day.icon}/>
            </div>
            <div>
                <span className="font-bold text-blue-600 dark:text-blue-500"><DynTemp value={day.tempmin}/>º</span> / <span className="font-bold text-red-600 dark:text-red-500"><DynTemp value={day.tempmax}/>º</span>
            </div>
            <div className="hidden">
                {/* @ts-expect-error Conditions being both a string and an object is API's fault*/}
                <p className="text-xs h-8">{day.conditions as string}</p>
            </div>
        </div>
    )
}
export default DayTab;