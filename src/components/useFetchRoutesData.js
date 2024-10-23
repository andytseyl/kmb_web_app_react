import { useEffect, useState } from "react";

const useFetchRoutesData = () => {
  const [allData, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const api = " https://data.etabus.gov.hk/v1/transport/kmb/route/";
    const res = await fetch(api);
    if (!res.ok) {
      console.error("fectch failed");
      return null;
    }
    const data = await res.json();
    setData(data);
  };
  return allData;
};

export default useFetchRoutesData;
