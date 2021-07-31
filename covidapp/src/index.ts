import '../css/main.css';
import "core-js/stable";
import "regenerator-runtime/runtime";


import {FillCovidData} from "./FillCovidData";
import {FillCountries} from "./FillCountries";


import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
onload = ()=>{

    FillCovidData();
    FillCountries();



// Create chart instance
const chart = am4core.create("chartdiv", am4charts.XYChart);      
// Add data
chart.data = [{
    "country": "India",
    "cases": 1200,
  }, {
    "country": "America ",
    "cases": 1920,
  }, {
    "country": "Austria",
    "cases": 3564,
  }, {
    "country": "South Korea",
    "cases": 5453,
     }, {
    "country": "UK",
    "cases": 2142
  }, {
    "country": "Australia",
    "cases":3542
  }, {
    "country": "Las Vegas",
    "cases": 1234
  }, {
    "country": "Bahrain",
    "cases": 1935
  }, {
    "country": "Japan",
    "cases":3393
  },{
      "country":"Bhutan",
      "cases": 172
  },{
    "country":"Brazil",
    "cases": 234
},{
    "country":"Bangladesh",
    "cases": 344
},{
    "country":"Egypt",
    "cases": 126
},{
    "country":"Estonia",
    "cases": 1922
},{
    "country":"Cuba",
    "cases": 3562
},{
    "country":"Guinea",
    "cases": 5452
},{
    "country":"Iceland",
    "cases": 2146
},{
    "country":"Indonesia",
    "cases": 3543
},{
    "country":"Italy",
    "cases": 3684
}
];

// Create axes
const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "country";
categoryAxis.title.text = "Countries";

const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.title.text = "covid cases ";

// Create series
const series = chart.series.push(new am4charts.ColumnSeries());
series.dataFields.valueY = "cases";
series.dataFields.categoryX = "country";
series.name = "Covid cases";
series.columns.template.tooltipText = "Series: {name}\nCategory: {categoryX}\nValue: {valueY}";
series.columns.template.fill = am4core.color("#104547"); // fill

const series2 = chart.series.push(new am4charts.LineSeries());
series2.name = "Units";
series2.stroke = am4core.color("#CDA2AB");
series2.strokeWidth = 3;
series2.dataFields.valueY = "units";
series2.dataFields.categoryX = "country";}