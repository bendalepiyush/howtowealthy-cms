import { useEffect, useState } from "react";
import { nseIndexData } from "../../../../src/api/nse-index-data";

const NseMarketIndexAnalytics = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://www.nseindia.com/api/allIndices", {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "en-US,en;q=0.9,hi;q=0.8",
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      setData(result.data);
    };

    fetchData();
  }, []);
  return (
    <div>
      {data.map((item) => {
        return (
          <p key={item.key}>
            {item.indexSymbol} ||| {item.last}{" "}
          </p>
        );
      })}
    </div>
  );
};

export default NseMarketIndexAnalytics;
