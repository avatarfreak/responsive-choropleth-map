# Data Visualization Projects - Visualize Data with a Choropleth Map

- Fulfill the below user stories and get all of the tests to pass. Give it your own personal style.

- You can use HTML, JavaScript, CSS, and the D3 svg-based visualization library. Required (non-virtual) DOM elements are queried on the moment of each test. If you use a frontend framework (like Vue for example), the test results may be inaccurate for dynamic content. We hope to accommodate them eventually, but these frameworks are not currently supported for D3 projects.

- User Story #1: My choropleth should have a title with a corresponding `id="title"`.

- User Story #2: My choropleth should have a description element with a corresponding `id="description"`.

- User Story #3: My choropleth should have counties with a corresponding `class="county"` that represent the data.

- User Story #4: There should be at least 4 different fill colors used for the counties.

- User Story #5: My counties should each have data-fips and data-education properties containing their corresponding fips and education values.

- User Story #6: My choropleth should have a county for each provided data point.

- User Story #7: The counties should have data-fips and data-education values that match the sample data.

- User Story #8: My choropleth should have a legend with a corresponding `id="legend"`.

- User Story #9: There should be at least 4 different fill colors used for the legend.

- User Story #10: I can mouse over an area and see a tooltip with a corresponding `id="tooltip"` which displays more information about the area.

- User Story #11: My tooltip should have a data-education property that corresponds to the data-education of the active area.

- Here are the datasets you will need to complete this project:

- US Education Data: https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json

- US County Data: https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json

- You can use this CDN link to run the tests in any environment you like: https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js

## Important notes

- This responsive visual graphic map is built on top of **D3 version 5** library. First thing first, to achieve responisve chart, `SVG view box` is being used.

  ```
  viewBox="minx miny width height"

  viewBox="0 0 200 150"

  ```

- **D3v5** substituted asynchronous callbacks with promises. Therefore, fetching external data is different from previous version.
  In previous the data used to be fetched in this order

  ```
  var data = d3.json(‘data.json’, function(data){
      //then do something with data
      console.log(data)
  });
  ```

- However, the promises in later version is slightly different from previous one. If, you have no idea what promises is all about? Kindly, do some research on `Javascript’s promises and fetch(url)`. The syntax in **D3v5** looks

  ```
  var data = d3.json(‘data.json’).then(function(data){
      return (data);
  }).catch(function(err){
      console.log(err)
  });
  ```

## Usage:

- Map can be zoomed in or zoomed out using mouse wheel. Point to the selected area of the map and scroll up or down to initialize zoom behaviour. Outside the map area mouse wheel return normal scrolling behaviour.
- Zoom in can be done by doubleClick.
- Panning is true.
- Information can be viewed by pointing on any area of map.
- Legend with percentage and different colors indicates degree obtained by individuals respectively to the county.

### Project Structure

```
Project
│
│   README.md
│   package.json
│
└───src
│   └───index.html
│   └───assets
│       └───js
│           └───choropleth.js
|           |___colorLegend.js
|           |____topojson.js
|           |___index.js
|
│       └───scss
│            └───main.scss
│
│
│
└───dist
```

### Technologies used

- webpack4
- Babel
- ES6
- svg
- D3.js v5

Clone this repo:

```
$ git clone https://github.com/avatarfreak/responsive-choropleth-map
```

#### Installing:

- clone this project

  - `$ git clone "https://github.com/avatarfreak/responsive-choropleth-map.git"`
  - `$ cd responsive-choropleth-map`
  - `$ npm install`
  - `$ npm run build`
  - `$ npm run start`

---

#### Author

- [avatarfreak](https://github.com/avatarfreak "avatarfreak")
