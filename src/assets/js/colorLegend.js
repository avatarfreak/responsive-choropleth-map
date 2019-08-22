import {scaleQuantize, schemeOrRd} from "d3"

export const colorLegend = (props) => {
  const {legendData, svg} =props
  const width = 900
  const color = scaleQuantize()
    .range(schemeOrRd[legendData.percentage.length]);
  color.domain([0, 66]);

  const legend = svg
    .append("g")
    .attr("id", "legend")
    .attr(
      "transform",
      `translate(${width - legendData.percentage.length * legendData.width}, 0)`
    );
  legend
    .selectAll("rect")
    .data(legendData.percentage)
    .enter()
    .append("rect")
    .attr("width", legendData.width)
    .attr("height", legendData.height)
    .attr("x", (d, i) => i * legendData.width)
    .attr("fill", (d, i) => color(d));
    

  legend
    .selectAll("text")
    .data(legendData.percentage)
    .enter()
    .append("text")
    .attr("x", (d, i) => i * legendData.width)
    // position the labels below the rectangle elements
    .attr("y", legendData.height *2)
    .style("font-size", "0.7rem")
    .style("fill", "#fcfcfc")
    .text(d => `${d}%`);
};
