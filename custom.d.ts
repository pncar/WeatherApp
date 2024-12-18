declare type Data = {
    name: string
}

declare type Conds = {
    temp: number,
    icon: string,
    conditions: Conds,
    cloudcover: number,
    humidity: number,
    windspeed: number,
    pressure: number,
    visibility: number,
    uvindex: number,
    precip: number,
    preciptype?: string[],
    dew: number,
    solarradiation: number,
    solarenergy: number,
    datetime: string,
    datetimeEpoch: number,
    moonphase: number | 0.5,
    isHour: boolean,
    description?: string,
    winddir?: number,
    sunset?: string,
    sunrise?: string,
    sunriseEpoch?: number | 0,
    sunsetEpoch?: number | 0,
    precipprob?: number,
    tempmax?: number,
    tempmin?: number
}

declare interface Day extends Conds {
    hours: Conds[],
    sunriseEpoch: number,
    sunsetEpoch: number
}

declare type MainData = {
    address: string,
    alerts: string[],
    currentConditions: Conds,
    days: Day[],
    description: string,
    latitude: number,
    longitude: number,
    queryCost: number,
    resolvedAddress: string,
    stations: Station[],
    timezone: string,
    tzoffset: number
}

declare type Station = {
    contribution: number,
    distance: number,
    id: string,
    latitude: number,
    longitude: number,
    name: string,
    quality: number,
    useCount: number
}

declare type HourData = {
    title: string,
    temp: number,
    humidity: number,
    precipprob: number,
    windspeed: number
}

declare type DayData = {
    title: string,
    temp: number,
    tempmax: number,
    tempmin: number,
    range: number[]
}
