import { AreaChart, BarChart, Bar, Rectangle, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';
import { useUserContext } from '@/context/UserContext';
import { fahrenheit, trimHour } from "@/utils/utils";
import DynGrad from "@/components/DynGrad";
import WeatherIcon from "@/components/WeatherIcon";
import {
    ValueType,
    NameType,
} from 'recharts/types/component/DefaultTooltipContent';


const DayGraph = (props: {data: HourData[], dataKey: string}) => {

    const { data, dataKey } = props;
    const { tempType } = useUserContext();

    const Grad = () => {
        return(
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
        )
    }

    const commonStyle = {
        fontSize: 9
    }

    const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {

        if (active && payload && payload.length) {

        const icon = payload[0].payload.icon; 
        const temp = tempType === "F" ? fahrenheit(payload[0].payload.temp).toString() : payload[0].payload.temp;   
        const title = payload[0].payload.title.split(":")[0] + ":" + payload[0].payload.title.split(":")[1];
        const desc = payload[0].payload.desc;

          return (
            <div className="custom-tooltip bg-primary-50 dark:bg-primary-900 p-3 rounded-md text-primary-950 dark:text-primary-50 border border-primary-300 dark:border-primary-800 shadow-lg">
              <p className="font-mono">{title}</p>
              <div className="flex space-x-2 items-center">
                <WeatherIcon value={icon}/>
                <p className="font-mono font-bold">{temp}º</p>
              </div>
              <p className="font-tiny">{desc}</p>
            </div>
          );
        }
      
        return null;
    };

    switch(dataKey){
        case "precipprob":
            return(
                <ResponsiveContainer width={"100%"} height={300}>
                    <BarChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 0,
                        left: -30,
                        bottom: 5,
                    }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke={`#52525b`} strokeOpacity={0.5}/>
                        <XAxis dataKey="title" style={commonStyle} tickFormatter={(tick)=>{return `${trimHour(tick)} hs`}}/>
                        <YAxis style={commonStyle} tickFormatter={(tick)=>{return `${tick}%`}} domain={[0,100]} />
                        <Tooltip/>
                        <Bar dataKey={"precipprob"} fill="#8884d8" label={{fontSize: 10, fill: "white"}} activeBar={<Rectangle fill="pink" stroke="blue"/>} />
                    </BarChart>
                </ResponsiveContainer>
                )
        case "humidity":
            return(
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart
                    width={500}
                    height={400}
                    data={data}
                    margin={{
                        top: 10,
                        right: 0,
                        left: -30,
                        bottom: 0,
                    }}
                    >
                        <defs>
                            <Grad/>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke={`#52525b`} strokeOpacity={0.5}/>
                        <XAxis dataKey="title" style={commonStyle} tickFormatter={(tick)=>{return `${trimHour(tick)} hs`}}/>
                        <YAxis domain={[0,100]} style={commonStyle} />
                        <Tooltip/>
                        <Area type="monotone" dataKey={"humidity"} stroke="#8884d8" fillOpacity={1} fill="url(#colorPv)" activeDot={{ r: 8 }}/>
                    </AreaChart>
                </ResponsiveContainer>
                )
        case "temp":
        default:
            return(
            <ResponsiveContainer width={"100%"} height={300}>
                <AreaChart
                width={500}
                height={400}
                data={data}
                margin={{
                    top: 10,
                    right: 0,
                    left: -30,
                    bottom: 0,
                }}
                >
                    <defs>
                        <DynGrad data={data}/>
                    </defs>
                    <Tooltip content={<CustomTooltip/>}/>
                    <CartesianGrid strokeDasharray="3 3" stroke={`#52525b`} strokeOpacity={0.5}/>
                    <XAxis dataKey="title" style={commonStyle} tickFormatter={(tick)=>{return `${trimHour(tick)} hs`}}/>
                    <YAxis tickFormatter={(n)=>{{if(tempType === "F"){return fahrenheit(n).toString();}else{return n;}}}} domain={[`dataMin - 1`, `dataMax + 1`]} style={commonStyle} />
                    <Tooltip labelStyle={{color:"black", fontWeight: "bold"}} contentStyle={{color:"black"}}/>
                    {false? <Line type="monotone" dataKey={"temp"} stroke={`#71717a`} strokeWidth={2} activeDot={{ r: 8 }} /> : <></>}
                    <Area type="monotone" dataKey={"temp"} strokeWidth={3} fillOpacity={0} stroke="url(#colorTemp)" activeDot={{ r: 8, fillOpacity: 0, stroke:"#71717a"}}/>
                </AreaChart>
            </ResponsiveContainer>
        )
    }
}
export default DayGraph;