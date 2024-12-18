import { ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useUserContext } from '../context/UserContext';
import { fahrenheit, getDaysData } from "@/utils/utils";
import {useTranslations} from 'next-intl';
import DynGrad from "@/components/DynGrad";

const WeekGraph = (props: { data: MainData }) => {

    const { data } = props;
    const { tempType } = useUserContext();
    const t_api = useTranslations('APIContent');

    return(
    <ResponsiveContainer width="100%" height={300}>
        <ComposedChart
        width={500}
        height={400}
        data={getDaysData(data.days)}
        margin={{
            top: 10,
            right: 0,
            left: -30,
            bottom: 0,
        }}
        >
            <defs>
                <DynGrad data={data.days}/>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={`#52525b`} strokeOpacity={0.5}/>
            <XAxis dataKey="title" style={{fontSize: 9}} tickFormatter={(n)=>{return t_api(n)}}/>
            <YAxis tickFormatter={(n)=>{{if(tempType === "F"){return fahrenheit(n).toString();}else{return n;}}}} domain={[`dataMin - 0.5`, `dataMax + 0.5`]} style={{fontSize: 9}} />
            <Tooltip />
            {
            /* Currently redundant
            <>
            <Line type="monotone" dataKey="tempmax" stroke="#dc2626" strokeWidth={2} />
            <Line type="monotone" dataKey="tempmin" stroke="#2563eb" strokeWidth={2} />
            </>
            */
            }
            <Area
            type="monotone"
            dataKey="range"
            stroke="none"
            fill="url(#colorTemp)"
            fillOpacity={0.8}
            connectNulls
            dot={false}
            activeDot={false}
            />
            <Line type="monotone" dataKey="temp" stroke="#52525b" strokeWidth={1} strokeOpacity={0.75} dot={false} activeDot={{ r: 8, fillOpacity: 0, stroke:"#71717a"}}/>
        </ComposedChart>
    </ResponsiveContainer>
    )
}
export default WeekGraph;