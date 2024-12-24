import { ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';
import { useUserContext } from '../context/UserContext';
import { fahrenheit, getDaysData } from "@/utils/utils";
import {useTranslations} from 'next-intl';
import DynGrad from "@/components/DynGrad";
import {
    ValueType,
    NameType,
} from 'recharts/types/component/DefaultTooltipContent';

const WeekGraph = (props: { data: MainData }) => {

    const { data } = props;
    const { tempType } = useUserContext();
    const t_api = useTranslations('APIContent');

// eslint-disable-next-line @typescript-eslint/no-unused-vars
    const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {

        if (active && payload && payload.length) {

        const title = `${t_api(payload[0].payload.titleLong)} ${payload[0].payload.dom}`;
        const tempMax = tempType === "F" ? fahrenheit(payload[0].payload.tempmax).toString() : payload[0].payload.tempmax;   
        const tempMin = tempType === "F" ? fahrenheit(payload[0].payload.tempmin).toString() : payload[0].payload.tempmin;   

          return (
            <div className="custom-tooltip bg-primary-50 dark:bg-primary-900 p-3 rounded-md text-primary-950 dark:text-primary-50 border border-primary-300 dark:border-primary-800 shadow-lg">
              <p className="font-bold">{title}</p>
              <p className="font-mono text-red-600 dark:text-red-500">Max: {tempMax}º</p>
              <p className="font-mono text-blue-500 dark:text-blue-400">Min: {tempMin}º</p>
            </div>
          );
        }
      
        return null;
    };

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
            <Tooltip content={<CustomTooltip/>}/>
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