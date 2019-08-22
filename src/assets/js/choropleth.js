import { select, geoPath, json, zoom, scaleQuantize, schemeOrRd, event, extent } from "d3";
import { colorLegend } from "./colorLegend";
import { feature } from "./topojson";

//Dimension of Windows
const dimension = {
  width: document.querySelector(".display").clientWidth,
  height: document.querySelector(".display").clientHeight,
  margin: { top: 20, right: 20, bottom: 20, left: 20 }
};

//Destructing the dimension
const { width, height } = dimension;

//view box height and width
const viewWdith = 960 - width;
const viewHeight = 600 - height;

//create Svg element
// add viewBox and preserveAspectRatio properties,
const svg = select(".display")
  .append("svg")
  .attr("id", "canvas")
  .attr("viewBox", `0 0  ${width + viewWdith} ${height + viewHeight}`)
  .attr("perserveAspectRatio", "xMinYMid");

//tool to show information about state
const tooltip = select(".display__svg")
  .append("div")
  .attr("id", "tooltip")
  .style("position", "absolute")
  .style("padding", "5px 7px")
  .style("border", "1px #333 solid")
  .style("border-radius", "5px")
  .style("opacity", 0);

//intialize height width and data of legend
const legendData = {
  percentage: [3, 12, 21, 30, 39, 48, 57, 66],
  height: 15,
  width: 35
};
//calling color legend
colorLegend({ legendData, svg });

//color to fill the map
const colorScale = scaleQuantize().range(
  schemeOrRd[legendData.percentage.length]
);

//Append g element to svg for zooming purpose
const g = svg.append("g");

//Zoom control
//mousewheel or dblclick to zoom in or zoom out
const zoomed = zoom()
  .scaleExtent([0.5, 10])
  .translateExtent([[0, 0], [960, 600]]);
g.call(zoomed.on("zoom", () => g.attr("transform", event.transform)));

//convert json path to svg path string
const path = geoPath();

//Fetching data from external source
const render = async () => {
  const counties = json("https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json");
  const education = json("https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json");
  return await Promise.all([counties, education]);
};

//draw map
render()
  .then(([counties, education]) => {
    //remove preloader
    select("#loading").remove();
    //acc initialize as an object
    //map counties id with education fips
    //if mapped then put all education data in acc
    const countiesInfo = education.reduce((acc, data) => {
      acc[data.fips] = data;
      return acc;
    }, {});

    //convert topoJson to Geojson in order to work in d3
    const countries = feature(counties, counties.objects.counties);

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
      .on("mouseover", (d, i) => {
        tooltip
          .transition()
          .duration(200)
          .style("opacity", 1);
        tooltip
          .html(
            `
          <label>Degree Obtained: <b>${
            d.properties.bachelorsOrHigher
          }%</b> </label> 
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
      })
      .on("mouseout", () => {
        tooltip.style("opacity", 0);
      });
  })
  .catch(err => {
    throw new Error(err);
  });
