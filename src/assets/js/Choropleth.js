import { geoPath, zoom, event, extent } from "d3";
import { feature } from "./topojson";

export const Choropleth = (selection, props) => {
  const { width, height, data, colorScale, tooltip } = props;

  //dataset
  const counties = data[0];
  const education = data[1];

  //create Svg element
  //add viewBox and preserveAspectRatio properties,
  const svg = selection
    .attr("viewBox", `0 0  ${width} ${height}`)
    .attr("perserveAspectRatio", "xMinYMid meet");

  //Append g element to svg for zooming purpose
  const g = svg
    .selectAll("g")
    .data([null])
    .join("g");

  // Zoom control
  // mousewheel or dblclick to zoom in or zoom out
  const zoomed = zoom()
    .scaleExtent([1, 10])
    .translateExtent([[0, 0], [960, 600]]);
  g.call(zoomed.on("zoom", () => g.attr("transform", event.transform)));

  //convert json path to svg path string
  const path = geoPath();

  //convert topoJson to Geojson in order to work in d3
  const countries = feature(counties, counties.objects.counties);

  //acc initialize as an object
  //map counties id with education fips
  //if mapped then put all education data in acc
  const countiesInfo = education.reduce((acc, data) => {
    acc[data.fips] = data;
    return acc;
  }, {});

  //copy the values of all countries and countiesInfo into one object
  countries.features.forEach(d => {
    Object.assign(d.properties, countiesInfo[d.id]);
  });

  colorScale.domain(
    extent(countries.features, d => d.properties.bachelorsOrHigher)
  );

  //plot graph
  g.selectAll("path")
    .data(countries.features)
    .join("path")
    .attr("class", "county")
    .attr("d", path)
    .attr("fill", d => colorScale(d.properties.bachelorsOrHigher))
    .attr("data-fips", d => d.properties.fips)
    .attr("data-education", d => d.properties.bachelorsOrHigher)
    .on("mouseover", showToolTip)
    .on("mouseout", () => {
      tooltip.style("opacity", 0);
    });

  function showToolTip(d) {
    tooltip
      .transition()
      .duration(200)
      .style("opacity", 1);
    tooltip
      .html(
        `
          <label>Degree Obtained: <b>${d.properties.bachelorsOrHigher}%</b> </label> 
          <br>
          <label>Area: <b>${d.properties.area_name}</b> </label> 
          <br>
          <label>state: <b>${d.properties.state}</b></label> 
          `
      )
      .attr("data-education", d.properties.bachelorsOrHigher)
      .style(
        "left",
        `${event.pageX < width / 2 ? event.pageX : event.pageX - 250}px`
      )
      .style(
        "top",
        `${event.pageY < height / 2 ? event.pageY : event.pageY - 100}px`
      );
  }
};
