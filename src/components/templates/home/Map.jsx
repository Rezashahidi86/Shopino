import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { FiClock, FiMap, FiMapPin } from "react-icons/fi";
const position = [30.65, 58.85];

function Map() {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-lg dark:border-slate-800">
      <MapContainer
        center={position}
        zoomControl={false}
        scrollWheelZoom={true}
        zoom={13}
        className="h-[400px] w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={position}>
          <Popup>
            <div
              dir="rtl"
              className="font-IRANSansX min-w-[230px] overflow-hidden rounded-xl bg-white text-slate-800  dark:bg-[#18233a] dark:text-slate-100"
            >
              <div className="flex items-center gap-3 border-b border-slate-200 p-3 dark:border-slate-700">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
                  <FiMapPin className="text-xl" />
                </div>

                <div>
                  <p className="font-bold">شعبه مرکزی Shopino</p>
                  <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                    شعبه فروش و خدمات
                  </p>
                </div>
              </div>

              <div className="space-y-2 p-3 text-sm">
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <FiMap className="text-violet-500" />
                  <span>کویر لوت بعد تپه چهارم از سمت کرمان</span>
                </div>

                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <FiClock className="text-violet-500" />
                  <span>۹:۰۰ تا ۲۱:۰۰</span>
                </div>
              </div>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default Map;
