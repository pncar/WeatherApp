import ClearDay from "@/images/icons/clear-day.svg";
import Cloudy from "@/images/icons/cloudy.svg";
import Fog from "@/images/icons/fog.svg";
//import Hail from "@/images/icons/hail.svg";
import PartlyCloudyDay from "@/images/icons/partly-cloudy-day.svg";
import Rain from "@/images/icons/rain.svg";
//import Sneed from "@/images/icons/sneed.svg";
import Snow from "@/images/icons/snow.svg";
import Thunder from "@/images/icons/thunder.svg";
import Wind from "@/images/icons/wind.svg";
const WeatherIcon = (props: {value:string, w?: string}) => {
    const {value, w = "w-6"} = props;
    const wIcon = (i:string) => {
        switch(i){
            case "fog":
                return Fog.src;
            case "snow":
                return Snow.src;
            case "rain":
                return Rain.src;
            case "cloudy":
                return Cloudy.src;
            case "partly-cloudy-day":
            case "partly-cloudy-night":
                return PartlyCloudyDay.src;
            case "wind":
                return Wind.src;
            case "thunder-rain":
            case "thunder-showers-night":
            case "thunder-showers-day":
                return Thunder;
            case "clear-day":
            case "clear-night":
            default:
                return ClearDay.src;
        }
    }
    return(
        <div className={`${w} ${w} inline-block`}>
            <img src={wIcon(value)}/>
        </div>
    )
}
export default WeatherIcon;