const PercentBar = (props: {pctg: number, color?: string, bColor?: string}) => {
    const { pctg, color = "#fde047", bColor = "#52525b"} = props;
    return(
        <div className={`my-2 w-full h-2 rounded-sm border border-primary-600`} style={{backgroundImage: `linear-gradient(to right, ${color} ${pctg}%, ${bColor} ${pctg}%)`}}></div>
    )
}
export default PercentBar;