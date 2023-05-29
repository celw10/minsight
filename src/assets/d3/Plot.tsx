// React import
import { useRef, useEffect } from "react";
// D3 import
import * as d3 from "d3";

export const LineChart = (props: any) => {
    const svgRef = useRef(null);
  
    useEffect(() => {
      // D3 Code
  
      // Dimensions
      let dimensions = {
        width: 1000,
        height: 500,
        margins: 50,
        containerWidth: 900,
        containerHeight: 400,
      };
  
      // dimensions.containerWidth = dimensions.width - dimensions.margins * 2;
      // dimensions.containerHeight = dimensions.height - dimensions.margins * 2;
  
      // SELECTIONS
      const svg = d3
        .select(svgRef.current)
        .classed("line-chart", true)
        .attr("width", dimensions.width)
        .attr("height", dimensions.height);
      const container = svg
        .append("g")
        .classed("container", true)
        .attr("transform", `translate(${dimensions.margins}, ${dimensions.margins})`);
  
      // Draw Circle
      container.append("circle").attr("r", 25);
    }, [props.Data, svgRef.current]); // redraw chart if data changes
  
    return <svg ref={svgRef} />;
  };

  //https://ncoughlin.com/posts/d3-react/
  // get a test plot working