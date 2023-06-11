// React import
import { useRef, useEffect } from "react";
// import ReactDOM from 'react-dom/client'
// D3 import
import * as d3 from "d3";

type Data = {
  date: string;
  value: number;
};

interface IBasicLineChartProps {
  width: number;
  height: number;
  top: number;
  right: number;
  bottom: number;
  left: number;
  fill: string;
}

function draw(ref: HTMLDivElement | null, props: IBasicLineChartProps) {
  const width = props.width - props.left - props.right;
  const height = props.height - props.top - props.bottom;

  const svg = d3
    .select(ref)
    .append("svg")
    .attr("width", width + props.left + props.right)
    .attr("height", height + props.top + props.bottom)
    .append("g")
    .attr("transform", `translate(${props.left},${props.top})`);

  d3.dsv(",", "/line.csv", (d) => {
    const res = d as unknown as {
      Date: string;
      Open: number;
    };
    const date = d3.timeParse("%Y-%m-%d")(res.Date);
    const retObj = {
      date,
      value: +res.Open,
    };
    return retObj;
  }).then((data) => {
    const x = d3
      .scaleTime()
      .domain(
        d3.extent(data, (d) => {
          return d.date;
        }) as [Date, Date]
      )
      .range([0, width]);
    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    const y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(data, (d) => {
          return Math.max(
            ...data.map((dt) => (dt as unknown as Data).value),
            0
          );
        }),
      ] as number[])
      .range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));

    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", props.fill)
      .attr("stroke-width", 1.5)
      .attr(
        "d",
        // @ts-ignore
        d3
          .line()
          .x((d) => x((d as unknown as { date: number }).date))
          .y((d) => y((d as unknown as { date: any; value: any }).value))
      );
  });

  return () => {
    svg.remove();
  };
}

export const PlotD3 = (props: IBasicLineChartProps) => {
  const ref = useRef<HTMLDivElement>(null);

  // this is

  // useEffect = function call
  //   - passing a callback
  //     - return a cleanup

  useEffect(() => {
    return draw(ref.current, props);
  }, [props]);

  // This is rendering a new graph each time I "hot save"
  // I had this issue with ArcGIS API earlier, but I don't remember how I solved it
  // Both situations are slightly different. I tried some of the stratigies implemented in Map2D and initMap2D
  return <div className="h-4/5 w-4/5 p-0 m-0" ref={ref}></div>;
};