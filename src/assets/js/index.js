import { select, json, schemeYlOrRd, scaleQuantize } from "d3";
import "../scss/main.scss";
import { Choropleth } from "./Choropleth";
import { ColorLegend } from "./ColorLegend";

const svg = select(".display__svg").append("svg");
const counties = json( "https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json");
const education = json( "https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json");

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

const colorScale = scaleQuantize().range(
  schemeYlOrRd[legendData.percentage.length]
  );
  
let data;
Promise.all([counties, education])
  .then(res => {
    data = res;
    window.addEventListener("resize", render);
    render();
  })
  .catch(err => {
    throw new Error(err);
  });

function render() {
  //remove preloader
  select("#loading").remove();

  //Dimension of Window
  const width = 960;
  const height = 600;
  const margin = { top: 20, right: 20, bottom: 20, left: 20 };
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  Choropleth(svg, {
    data,
    width,
    height,
    margin,
    innerHeight,
    innerWidth,
    tooltip,
    colorScale
  });

  ColorLegend(svg, { legendData, colorScale });
}
