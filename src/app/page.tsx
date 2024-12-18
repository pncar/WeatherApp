import Logo from "@/images/logo-inline-new.svg";
import CitySearch from "@/components/CitySearch";

export default function Home() {
  return (
    <div className="">
      <div className="to-primary-100 container w-full m-auto min-h-screen flex items-center justify-center flex-col space-y-6 p-8 md:p-0">
        <img src={Logo.src} className="h-12"/>
        <CitySearch/>
      </div>
    </div>
  );
}
