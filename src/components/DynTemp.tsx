import { useUserContext } from '../context/UserContext';
import { fahrenheit } from "@/utils/utils";
const DynTemp = (props: {value?: number}) => {
    const { value = 0} = props;
    const { tempType } = useUserContext();
    return(
        <>{ tempType === "F" ? <>{fahrenheit(Number(value))}</> : <>{value}</>}</>
    )
}
export default DynTemp;