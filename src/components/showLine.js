import { useEffect, useState } from "react";
import moment from "moment";

const useFetchChoseRoutes = ({ searchedLine }) => {
  const [routeInfo, setRouteInfo] = useState(null);
  const [stopNameList, setStopNameList] = useState(null);
  const [etaList, setEtaList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (Object.keys(searchedLine).length === 0) return null;

      const url = "https://data.etabus.gov.hk/v1/transport/kmb/route-stop/";
      const api = `${url}${searchedLine.route}/${
        searchedLine.bound === "O" ? "outbound" : "inbound"
      }/${searchedLine.service_type}`;
      const res = await fetch(api);

      const api1 = "https://data.etabus.gov.hk/v1/transport/kmb/stop/";
      const res1 = await fetch(api1);

      if (!res.ok || !res1.ok) {
        console.error("fectch failed");
        return null;
      }
      const data0 = await res.json();
      setRouteInfo(data0);

      const data1 = await res1.json();
      setStopNameList(data1);

      const routeStopID = data0.data
        .map((id) => {
          const stopID = data1.data.filter((stops) => stops.stop === id.stop);
          return stopID.length > 0 ? stopID[0].stop : null;
        })
        .filter((id) => id !== null);

      const url2 = "https://data.etabus.gov.hk/v1/transport/kmb/eta/";
      const etaResults = [];

      for (const stop_id of routeStopID) {
        const res2 = await fetch(
          `${url2}/${stop_id}/${searchedLine.route}/${searchedLine.service_type}`
        );
        const etaData = await res2.json();
        console.log("ETA Data:", etaData);
        etaResults.push(etaData);
      }
      setEtaList(etaResults);
    };

    fetchData();
  }, [searchedLine]);

  return { routeInfo, stopNameList, etaList };
};

const ShowLine = ({ searchedLine }) => {
  const { routeInfo, stopNameList, etaList } = useFetchChoseRoutes({
    searchedLine,
  });

  if (!routeInfo || !stopNameList) {
    return <div></div>;
  }

  const pairedStops = routeInfo.data.map((route, idx) => {
    const stopName = stopNameList.data.filter(
      (stops) => stops.stop === route.stop
    );
    const etaData = etaList[idx];
    const eta =
      etaData && etaData.data && etaData.data.length > 0
        ? etaData.data[0].eta
        : "未知時間";
    return { name: stopName[0]?.name_tc || "未知站名", eta: eta };
  });

  return (
    <div>
      {pairedStops.map((stops, index = Math.random()) => (
        <button className="pb-2 pt-2 flex justify-between min-w-full odd:bg-gray-100 even:bg-gray-200 hover:bg-red-300 active:bg-red-500 focus:outline-none focus:bg-red-300">
          <div key={index} className="">
            {index + 1}. {stops.name}
          </div>
          <div>預計到站時間: {moment(stops.eta).format("HH:mm")}</div>
        </button>
      ))}
    </div>
  );
};
export default ShowLine;
