import Logo from "@/images/logo-inline-new.svg";
import CitySearch from "@/components/CitySearch";

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-slate-950 via-blue-600 to-sky-300">
      <div className="to-primary-100 container w-full m-auto min-h-screen flex items-center flex-col space-y-2 p-8 md:p-16">
        <img src={Logo.src} className="h-12 mb-6"/>
          <CitySearch/>
      </div>
    </div>
  );
}
