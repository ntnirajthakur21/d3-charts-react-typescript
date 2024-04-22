import type { DSVParsedArray } from "d3";
import { useEffect, useState } from "react";
import { csv } from "d3";

const csvUrl =
  "https://gist.githubusercontent.com/vivek2606/58b964b3fcd82a741c6d8be06ff3fc64/raw/UN_population.csv";

const row = (d: any) => {
  d.Population = +d["2020"];
  return d;
};

const useUNPopulationData = () => {
  const [data, setData] = useState<DSVParsedArray<any> | null>(null);

  useEffect(() => {
    csv(csvUrl, row).then((data) => {
      setData(data as DSVParsedArray<any>);
    });
  }, []);

  return { data };
};

export default useUNPopulationData;
