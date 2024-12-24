const dayOfWeek = (epoch: number, type: "long" | "short" = "long") => {
    const date = new Date(epoch);
    const weekday = ["sunday_short","monday_short","tuesday_short","wednesday_short","thursday_short","friday_short","saturday_short"];
    const weekdayLong = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
    if(type !== "long"){
        return {title: weekday[date.getDay()]};
    }
    return {title: weekdayLong[date.getDay()]};
}

const dayOfMonth = (epoch: number) => {
    const date = new Date(epoch);
    return date.getDate();
}

const moonPhase = (n:number) => {
    if(n > 0.75){
        return {title: "Waning Crescent", icon: "waning-crescent"}
    }else if(n === 0.75){
        return {title: "Last Quarter", icon: "last-quarter"}
    }else if(n > 0.5){
        return {title: "Waning Gibbous", icon: "waning-gibbous"}
    }else if(n === 0.5){
        return {title: "Full Moon", icon: "full-moon"}
    }else if(n > 0.25){
        return {title: "Waxing Gibbous", icon: "waxing-gibbous"}
    }else if(n === 0.25){
        return {title: "First Quarter", icon: "first-quarter"}
    }else if(n > 0){
        return {title: "Waxing Crescent", icon: "waxing-crescent"}
    }else{
        return {title: "New Moon", icon: "new-moon"}
    }
}

const windDir = (n:number = 0) => {
    if(n < 45 || n > 315){
        return {title: "North", icon: "north"};
    }else if(n < 135) {
        return {title: "East", icon: "east"};
    }else if(n < 225){
        return {title: "South", icon: "south"};
    }else{
        return {title: "West", icon: "west"};
    }
}

const uvIndex = (uv:number) => {
    if(uv <= 1){
        return {title: "Low", desc: "Safe to stay outside.", color: "#22c55e"};
    }else if(uv <= 4){
        return {title: "Moderate", desc: "Avoid direct sun exposure during midday if possible.", color: "#facc15"};
    }else if(uv <= 7){
        return {title: "High", desc: "Avoid direct sun exposure during midday if possible.", color: "#f97316"};
    }else if(uv <= 9){
        return {title: "Very High", desc: "Avoid direct sun exposure.", color: "#dc2626"};
    }else{
        return {title: "Extreme", desc: "Avoid direct sun exposure.", color: "#9333ea"};
    }
}

const getHoursData = (day:Day) => {
    return day.hours.map((o:Conds)=>{return {title: o.datetime || "", temp: Math.round(o.temp*10)/10 || 0, humidity: o.humidity || 0, precipprob: o.precipprob || 0, windspeed: o.windspeed || 0, icon: o.icon || "clear-day", desc: o.conditions || ""}});
}

const getDaysData = (batch:Day[]) => {
    return batch.map((o:Conds)=>{return {title: `${dayOfWeek(o.datetimeEpoch * 1000, "short").title}`, titleLong: `${dayOfWeek(o.datetimeEpoch * 1000).title}`, dom: dayOfMonth(o.datetimeEpoch * 1000), temp: o.temp, tempmax: o.tempmax, tempmin: o.tempmin, range: [o.tempmin,o.tempmax]}});
}

const isDay = (e: number, r: number = 0, s: number = 0): boolean => {
    return e > r && e < s;
};

const timeCounter = (e:number) => {
    const eD = new Date(e);
    return `${eD.getHours()} hours ${eD.getMinutes()} minutes`
}

const WDBG = (cond: string) => {
    switch(cond){
        case "snow":
            return "bg-gradient-to-br from-slate-600 to-slate-400";
        case "cloudy":
        case "rain":
            return "bg-gradient-to-br from-zinc-600 to-zinc-400";
        case "partly-cloudy-day":
            return "bg-gradient-to-br from-sky-600 to-slate-400";
        case "partly-cloudy-night":
            return "bg-gradient-to-br from-sky-950 to-slate-600";
        case "clear-day":
            return "bg-gradient-to-br from-blue-700 to-sky-500";
        case "clear-night":
        default:
            return "bg-gradient-to-br from-blue-950 to-sky-900";
    }
}

const getColors = (min: number, max:number): string[] => {
    const r = new Set<string>;
    if(max < min){
        return ["#0ea5e9"];
    }
    for(let i=min;i<max;i++){
        if(i < -24){
            r.add("#e11d48");
        }else if(i < -16){
            r.add("#c026d3");
        }else if(i < -8){
            r.add("#7c3aed");
        }else if(i < 0){
            r.add("#6366f1");
        }else if(i < 8){
            r.add("#0ea5e9");
        }else if(i < 16){
            r.add("#2dd4bf");
        }else if(i < 24){
            r.add("#84cc16");
        }else if(i < 32){
            r.add("#facc15");
        }else if(i < 40){
            r.add("#ea580c");
        }else if(i < 48){
            r.add("#dc2626");
        }else{
            r.add("#44403c");
        }
    }
    return Array.from(r);
}


const extremes = (array: unknown,key: string) => {
    let min = Infinity;
    let max = Number.NEGATIVE_INFINITY;
    if (!Array.isArray(array) || array.length === 0) {
        return { min: 0, max: 0};
    }
    for(const tick of array){
        if(tick[key] < min){
            min = tick[key];
        }
        if(tick[key] > max){
            max = tick[key];
        }
    }
    return {min: min, max: max};
}

const fahrenheit = (c: number) => {
    return Math.round((c * 9/5 + 32)*10)/10;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const trimHour = (time: string, unit: "hours" | "minutes" | "seconds" = "hours") => {
    switch(time){
        case "seconds":
            return time.split(":")[2];
        case "minutes":
            return time.split(":")[1];
        case "hours":
        default:
            return time.split(":")[0];
    }
}

const toDate = (epoch: string | number) => {
    let n = epoch;
    if(typeof epoch === "string"){
        n = Number(epoch);
    }
    const date = new Date(n);
    return date;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const hmsToTimestamp = (hms: string) => {
    const currentDate = new Date();
    const [hours, minutes, seconds] = hms.split(":").map(Number);
    currentDate.setHours(hours, minutes, seconds, 0);
    return Math.floor(currentDate.getTime() / 1000);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const toHMS = (ts: number) => {
    const date = new Date(ts * 1000);
    const hours = date.getUTCHours(); 
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();
    return hours * 3600 + minutes * 60 + seconds;
}

const toSeconds = (time: string) => {
    const n = time.split(":");
    return Number(n[0]) * 3600 + Number(n[1]) * 60 + Number(n[2]);
}

const toHM = (tm: number) => {
    return `${toDate(tm*1000).getUTCHours().toString().padStart(2,'0')}:${toDate(tm*1000).getUTCMinutes().toString().padStart(2,'0')}`;
}

const whole = (data: MainData) => {

    const now = new Date();

    const full = 3600 * 24;
    let current = (now.getUTCHours() * 3600 + now.getUTCMinutes() * 60 + now.getUTCSeconds() + (data.tzoffset * 3600));
    if(current < 0){
        current = full - Math.abs(current);
    }
    const sunrise = toSeconds(data.currentConditions.sunrise || "00:00:00");
    const sunset = toSeconds(data.currentConditions.sunset || "00:00:00");
    const nighttime = sunrise + (full - sunset);
    const daytime = full - nighttime;
    const day = current > sunrise && current < sunset ? true : false;
    const tillSunset = sunset - current;
    const sinceSunrise = current - sunrise;
    const tillSunrise = current < sunrise ? sunrise - current : full - current + (sunrise);
    const sinceSunset = current > sunset ? current - sunset : current + (full - sunset);

    return { full, current, sunrise, sunset, nighttime, daytime, day, tillSunrise, tillSunset, sinceSunrise, sinceSunset }
}




export { dayOfWeek, dayOfMonth, moonPhase, windDir, uvIndex, getHoursData, getDaysData, isDay, WDBG, timeCounter, getColors, extremes, fahrenheit, trimHour, toDate, toSeconds, whole,toHM}