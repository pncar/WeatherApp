import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import citiesData from "@/data/cities.json";

  
const cities = citiesData as City[];

const GET = async(request: NextRequest, {params}: {params: Promise<{ search: string}>}) => {
    const { search } = await params;
    try{
        const prev = cities[Math.floor(Math.random() * cities.length)].name;
        const cityArray = cities.filter((city: City)=>{ return city.name.toLowerCase().includes(search.toLowerCase())}).slice(0,10);
        return NextResponse.json({msg: `Random: ${Math.round(Math.random()*100)}`, city: prev, cityArray});
    }catch(e){
        console.log(e);
    }
}

export { GET }