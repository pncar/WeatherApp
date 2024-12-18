import { AreaChart, BarChart, Bar, Rectangle, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useUserContext } from '@/context/UserContext';
import { fahrenheit, trimHour } from "@/utils/utils";
import DynGrad from "@/components/DynGrad";

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

    switch(dataKey){
        case "precipprob":
            return(
                <ResponsiveContainer width="100%" height={300}>
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
                        <DynGrad data={data}/>
                    </defs>
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