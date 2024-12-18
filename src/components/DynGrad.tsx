import { getColors, extremes } from "@/utils/utils";
const DynGrad = (props: {data: Conds[] | HourData[]}) => {
    const { data } = props;
    const ext = extremes(data,"temp");
    const colors = getColors(ext.min,ext.max).reverse();
    return(
        <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
            {colors.map((color:string,key:number)=>
                <stop key={key} offset={Math.round(1/colors.length*100 + ((1/colors.length) * 100)*key) + "%"} stopColor={color} stopOpacity={0.75}/>
            )}
        </linearGradient>
    )
}
export default DynGrad;