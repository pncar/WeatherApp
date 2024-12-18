import { isDay } from "@/utils/utils";
import { useUserContext } from '../context/UserContext';
import WeatherIcon from "@/components/WeatherIcon";
import DynTemp from "@/components/DynTemp";
import {useTranslations} from 'next-intl';
const CurrentConditions = (props: { data: MainData, viewingCurrent: boolean }) => {
    const { tempType } = useUserContext();
    const { data, viewingCurrent } = props;
    const t = useTranslations('HomePage');
    return(
    <div  className={`${viewingCurrent ? "bg-white dark:bg-sky-900" : "bg-primary-100 dark:bg-primary-800"} text-primary-800 dark:text-primary-100 transition-all cursor-pointer border-x border-primary-300 dark:border-primary-700 shadow-md p-8`}>
        <div className="flex py-2">
            <p className="py-2 flex items-center"><span className="p-1 px-2 bg-primary-900 text-primary-100 rounded-md text-xs uppercase mr-2">{t("title")} </span><span className="font-bold">{data.resolvedAddress}</span></p>
        </div>
        <div className="flex">
            <div>
                <WeatherIcon value={data.currentConditions.icon} w={"w-8"}/>
            </div>
            <div className="px-2">
                <p className="font-bold text-3xl"><DynTemp value={data.currentConditions.temp}/> º{tempType}</p>
            </div>
        </div>
        <p>{data.description}</p>
        <div className="w-full flex items-center">
            <p>{data.currentConditions.datetime}</p>
            <p className="text-xs font-bold uppercase mx-2">{isDay(data.currentConditions.datetimeEpoch *1000, (data.currentConditions.sunriseEpoch || 0) *1000, (data.currentConditions.sunsetEpoch || 0) *1000) ? "Day" : "Night"}</p>
        </div>
    </div>
    )
}
export default CurrentConditions;