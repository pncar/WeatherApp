import { toDate, whole, toHM } from "@/utils/utils";
import { FaCaretDown } from "react-icons/fa";
import { FiSun, FiMoon } from "react-icons/fi";
import {useTranslations} from 'next-intl';
const DayNightCycle = (props: {data: MainData}) => {

    const { data } = props;

    const t = useTranslations('HomePage');

    const {full,sunrise,sunset, current, day, sinceSunrise, sinceSunset, tillSunrise, tillSunset} = whole(data);

    const format = (n:number,day: boolean = true) => {
        const d = new Date(n*1000);
        const h = d.getUTCHours();
        const m = d.getUTCMinutes();
        //const s = d.getUTCSeconds();
        
        const f = day ? `from now` : `ago`;

        return `${h} hours and ${m} minutes ${f}`;

    }

    return(
        <div className="flex flex-col space-y-4">
            <div className="relative w-full h-16 flex items-center">
                <div className={`absolute bottom-1 flex flex-col-reverse space-y-2 justify-center items-center`} style={{left: `${current * 100 / full}%`}}><FaCaretDown/><span className="text-tiny">{toHM(current)}</span></div>
            </div>
            <div className={`relative m-auto w-full h-6 flex items-center rounded-md overflow-hidden`}>
                <div className={`absolute w-full h-full border-2 border-opacity-50 border-primary-950 rounded-md`} style={{backgroundImage: `linear-gradient(to right, 
                    #020617 ${sunrise * 100 / full}%, 
                    #60a5fa ${sunrise * 100 / full + 8}%, 
                    #60a5fa ${sunset * 100 /full - 8}%, 
                    #020617 ${sunset * 100 / full}%, 
                    #020617 100%)`}}>
                </div>
                <div className="absolute w-full h-full flex items-center">
                    {day? 
                        <FiSun className="absolute text-primary-50 translate-x-1/2" style={{left: `${current * 100 / full}%`}}/>:
                        <FiMoon className="absolute text-primary-50 translate-x-1/2" style={{left: `${current * 100 / full}%`}}/>
                    }
                </div>
            </div>
            <div className="w-full">
                <div className="flex flex-col md:flex-row w-full py-4 md:py-0">
                    <div className="w-full text-start p-2 md:px-0">
                        <p className="font-bold">{t("info_sunrise")}</p>
                        <p className="font-mono">{data.currentConditions.sunrise}</p>
                        <p className="font-mono">{toDate(data.currentConditions.sunriseEpoch ? data.currentConditions.sunriseEpoch * 1000 : 0).toLocaleTimeString('en-US',{hour12: false, hour:'2-digit',minute: '2-digit', second: '2-digit'})}</p>
                        {day?<p>{format(sinceSunrise, !day)}</p>:<p>{format(tillSunrise, !day)}</p>}
                    </div>
                    <div className="w-full md:text-end p-2 md:px-0">
                        <p className="font-bold">{t("info_sunset")}</p>
                        <p className="font-mono">{data.currentConditions.sunset}</p>
                        <p className="font-mono">{toDate(data.currentConditions.sunsetEpoch ? data.currentConditions.sunsetEpoch * 1000 : 0).toLocaleTimeString('en-US',{hour12: false, hour:'2-digit',minute: '2-digit', second: '2-digit'})}</p>
                        {day?<p>{format(tillSunset, day)}</p>:<p>{format(sinceSunset, day)}</p>}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DayNightCycle;