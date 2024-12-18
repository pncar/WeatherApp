import FirstQuarter from "@/images/moon/first-quarter.svg";
import LastQuarter from "@/images/moon/last-quarter.svg";
import WaningGibbous from "@/images/moon/waning-gibbous.svg";
import WaningCrescent from "@/images/moon/waning-crescent.svg";
import WaxingGibbous from "@/images/moon/waxing-gibbous.svg";
import WaxingCrescent from "@/images/moon/waxing-crescent.svg";
import FullMoon from "@/images/moon/full.svg";
import NewMoon from "@/images/moon/new.svg";

const MoonIcon = (props: {value: string, w?: string}) => {
    const { value, w = "w-8"} = props;
    const icon = (value: string) => {
        switch(value){
            case "first-quarter":
                return FirstQuarter
            case "last-quarter":
                return LastQuarter
            case "waning-gibbous":
                return WaningGibbous
            case "waning-crescent":
                return WaningCrescent;
            case "waxing-gibbous":
                return WaxingGibbous;
            case "waxing-crescent":
                return WaxingCrescent;
            case "full-moon":
                return FullMoon;
            default:
                return NewMoon;
        }
    }

    return(
        <div className={`${w} ${w} inline-block`}>
            <img src={icon(value)?.src} className=""/>
        </div>
    )
}
export default MoonIcon;