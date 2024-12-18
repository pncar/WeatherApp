import { useUserContext } from '@/context/UserContext';
const TestSetState = () => {
    const { tempType, setTempType } = useUserContext();
    return(
        <div className="font-bold rounded-md flex w-32 md:w-24 h-6">
            <button onClick={()=>{setTempType("C")}} className={`w-full transition-all ${tempType === "F" ? "text-primary-400 dark:text-primary-400" : "text-primary-700 dark:text-primary-100 shadow-inner-md"} bg-primary-200 dark:bg-primary-600 rounded-l-md text-xs`}>C</button>
            <button onClick={()=>{setTempType("F")}}  className={`w-full transition-all ${tempType === "C" ? "text-primary-400 dark:text-primary-400" : "text-primary-700 dark:text-primary-100 shadow-inner-md"} bg-primary-200 dark:bg-primary-600 rounded-r-md text-xs`}>F</button>
        </div>
    )
}
export default TestSetState;