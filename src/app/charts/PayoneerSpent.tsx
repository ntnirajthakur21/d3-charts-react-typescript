import {
  csv,
  format,
  line,
  max,
  rollup,
  scaleBand,
  scaleLinear,
  sum,
} from "d3";
import type { DSVParsedArray } from "d3";
import React, { useEffect } from "react";
import AxisBottom from "../components/common/AxisBottom";
import AxisLeft from "../components/common/AxisLeft";
import useCursorPosition from "../hooks/useCursorPosition";

const csvUrl =
  "https://gist.githubusercontent.com/ntnirajthakur21/f6ae3f0e9d758119edbe97702199da4f/raw/random_name.csv";

const width = 850;
const height = 3000;
const margin = { top: 20, right: 30, bottom: 40, left: 150 };
const xAxisLabelOffset = 50;
const yAxisLabelOffset = 40;

const innerHeight = height - margin.top - margin.bottom;
const innerWidth = width - margin.left - margin.right;

type Datum = {
  Date: string;
  Description: string;
  Amount: number;
  Currency: string;
  Status: string;
  "Running Balance": number;
  "Transaction ID": string;
};

const rowTransformer = (row: any) => {
  return {
    ...row,
    amount: +row.Amount,
  };
};

const PayoneerSpent = () => {
  const [data, setData] = React.useState<DSVParsedArray<Datum> | null>(null);

  const { cursorPosition, tooltipStyle, handler } = useCursorPosition<{
    Date: string;
    Amount: number;
  }>();

  useEffect(() => {
    csv(csvUrl, rowTransformer).then((data) => {
      const filteredData = data.filter((d) => d.Amount < 0);

      const amountSpentByDate = rollup(
        filteredData,
        (v) => sum(v, (d) => d.Amount),
        (d) => d.Date
      );

      const amountSpentByDateArray = Array.from(
        amountSpentByDate,
        ([key, value]) => ({
          Date: key,
          Amount: -value,
        })
      );

      setData(amountSpentByDateArray as DSVParsedArray<Datum>);
    });
  }, []);

  const yScale = scaleBand()
    .domain((data || []).map((d) => d.Date))
    .range([0, innerHeight])
    .paddingInner(0.1);

  const xScale = scaleLinear()
    .domain([0, max(data || [], (d) => d.Amount) || 0] as [number, number])
    .range([0, innerWidth]);

  const linePath = line<Datum>()
    .x((d) => xScale(d.Amount))
    .y((d) => yScale(d.Date)! + yScale.bandwidth() / 2);

  const currencyFormat = format("$,.2r");

  if (!data) return <div>Loading...</div>;

  return (
    <>
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <AxisLeft yScale={yScale} />

          <AxisBottom xScale={xScale} innerHeight={innerHeight} />

          {data.map((d, i) => (
            <rect
              key={i}
              x={0}
              y={yScale(d.Date)!}
              width={xScale(d.Amount)}
              height={yScale.bandwidth()}
              fill="steelblue"
              {...handler({
                Date: d.Date,
                Amount: d.Amount,
              })}
            />
          ))}

          <path
            d={linePath(data) || ""}
            fill="none"
            stroke="black"
            strokeWidth="2"
          />
        </g>
      </svg>
      <div style={tooltipStyle}>
        {cursorPosition?.data?.Date}:{" "}
        {currencyFormat(cursorPosition?.data?.Amount || 0)}
      </div>
    </>
  );
};

// Domain: The domain is the input value range of the scale. For example, the domain of a scale that maps the height of students to the height of bars in a bar chart would be the range of possible student heights.
// Range: The range is the output value range of the scale. For example, the range of a scale that maps the height of students to the height of bars in a bar chart would be the pixel range of the chart.
// Scale: A scale is a function that maps input values to output values. For example, a scale that maps the height of students to the height of bars in a bar chart.
// Linear Scale: A linear scale is a scale that maps input values linearly to output values. For example, a linear scale that maps the height of students to the height of bars in a bar chart.
// Ordinal Scale: An ordinal scale is a scale that maps input values to discrete output values. For example, an ordinal scale that maps the names of students to the colors of bars in a bar chart.
// Band Scale: A band scale is an ordinal scale that maps input values to bands of output values. For example, a band scale that maps the names of students to the height of bars in a bar chart.
// Continuous Scale: A continuous scale is a scale that maps input values to continuous output values. For example, a continuous scale that maps the height of students to the height of bars in a bar chart.
// Discrete Scale: A discrete scale is a scale that maps input values to discrete output values. For example, a discrete scale that maps the names of students to the colors of bars in a bar chart.

// const data = [1,2,3,4,5];
// const height = 500, width = 500;
// const myScale = scaleLinear().domain([0, max(data)]).range([0, height]);
// Here: max(data) = 5, myScale(5) = 500
// myScale(1)=100, myScale(2)=200, myScale(3)=300, myScale(4)=400

// clamp(): The clamp method is used to specify whether the scale should clamp the output values to the range. If set to true, the scale will clamp the output values to the range. If set to false, the scale will not clamp the output values to the range.
// nice(): The nice method is used to extend the domain to the nearest round values. For example, if the domain is [0.1, 0.9], the nice method will extend the domain to [0, 1].
// ticks(): The ticks method is used to generate tick values for the scale. The method takes an optional argument that specifies the number of ticks to generate. If no argument is provided, the method will generate approximately 10 ticks.
// tickFormat(): The tickFormat method is used to format the tick values generated by the ticks method. The method takes an optional argument that specifies the format of the tick values. If no argument is provided, the method will use the default format.
// invert(): The invert method is used to map output values back to input values. For example, if the scale maps the height of students to the height of bars in a bar chart, the invert method can be used to map the height of bars back to the height of students.
// copy(): The copy method is used to create a copy of the scale. The copy method can be used to create a new scale with the same domain and range as the original scale.

// bandScale.domain([1,2,3,4,5]).range([0, 500]);
// bandScale(1) = 0, bandScale(2) = 100, bandScale(3) = 200, bandScale(4) = 300, bandScale(5) = 400
// the band scale will map the input values to bands of output values. For example, a band scale that maps the names of students to the height of bars in a bar chart.

export default PayoneerSpent;

// quantative data: data that can be measured and quantified. For example, the height of a person, the weight of a person, the temperature of a place, the speed of a car, etc.
// ordinal data: data that has a natural order. For example, the order of runners, the rating of a movie, the level of education, etc.
// nominal data: data that is used for naming or labelling variables, without any quantitative value. For example, the name of a person, the color of a car, the department in a company, etc.
// categorical data: data that can be divided into categories. For example, the hair color of people, the types of cars, the categories of movies, etc.
// continuous data: data that can take any value within a given range. For example, the height of a person could be any value from 0 to 1000 meters.
// discrete data: data that can only take certain values. For example, the number of students in a class must be a whole number.
// univariate data: data that consists of only one variable. For example, the heights of students in a class.
// bivariate data: data that consists of two variables. For example, the height and weight of students in a class.
// multivariate data: data that consists of more than two variables. For example, the height, weight, and age of students in a class.
// time series data: data that is collected at different points in time. For example, the temperature of a place at different times of the day.
// cross-sectional data: data that is collected at a single point in time. For example, the number of students in a class at a particular time.
// panel data: data that is collected over time from multiple observations. For example, the temperature of different places at different times.
// longitudinal data: data that is collected over time from the same observation. For example, the weight of a person at different ages.
// structured data: data that is organized in a specific format. For example, data in a table or a database.
// unstructured data: data that does not have a specific format. For example, text data, images, videos, etc.
// semi-structured data: data that is partially organized. For example, data in XML or JSON format.
// raw data: data that has not been processed or analyzed. For example, the data collected from a survey.
// processed data: data that has been cleaned, transformed, and analyzed. For example, the results of a statistical analysis.
// big data: data that is large in volume, variety, and velocity. For example, the data collected from social media platforms.
// small data: data that is small in volume, variety, and velocity. For example, the data collected from a small survey.
// open data: data that is freely available to the public. For example, government data, research data, etc.
// closed data: data that is not freely available to the public. For example, proprietary data, confidential data, etc.
// missing data: data that is not available for some observations. For example, the weight of a person that was not recorded.
// outlier: an observation that is significantly different from other observations in the data. For example, a temperature reading that is much higher than the other readings.
// noise: random variations in the data that are not related to the underlying pattern. For example, errors in data collection, measurement errors, etc.
// trend: a general direction in which the data is moving. For example, an increasing trend in sales over time.
// seasonality: a pattern that repeats at regular intervals. For example, the increase in sales during the holiday season.
// correlation: a measure of the relationship between two variables. For example, the correlation between temperature and ice cream sales.
// causation: a relationship between two variables where one variable causes a change in the other variable. For example, smoking causes lung cancer.
// descriptive statistics: statistics that describe the main features of the data. For example, the mean, median, mode, range, etc.
// inferential statistics: statistics that are used to make inferences or predictions about a population based on a sample. For example, hypothesis testing, confidence intervals, etc.
// population: the entire group of individuals or observations that the researcher is interested in. For example, all the students in a school.
// sample: a subset of the population that is selected for study. For example, a group of students selected for a survey.
// parameter: a numerical value that describes a population. For example, the average height of all students in a school.
// statistic: a numerical value that describes a sample. For example, the average height of a group of students selected for a survey.
// sampling: the process of selecting a sample from a population. For example, randomly selecting students for a survey.
// sampling bias: a bias that occurs when the sample is not representative of the population. For example, only surveying students from one class.
// random sampling: a sampling method where each member of the population has an equal chance of being selected. For example, using a random number generator to select students for a survey.
// stratified sampling: a sampling method where the population is divided into subgroups, and a sample is selected from each subgroup. For example, selecting students from each grade for a survey.
// convenience sampling: a sampling method where the sample is selected based on convenience. For example, surveying students who are available at a particular time.
// snowball sampling: a sampling method where existing participants recruit new participants. For example, asking survey participants to refer other potential participants.
// probability sampling: a sampling method where each member of the population has a known probability of being selected. For example, using a random number generator to select students for a survey.
// non-probability sampling: a sampling method where the probability of each member of the population being selected is not known. For example, surveying students who are available at a particular time.
// simple random sampling: a sampling method where each member of the population has an equal chance of being selected, and the selection is made without replacement. For example, selecting students for a survey without replacing them.
// systematic sampling: a sampling method where every nth member of the population is selected. For example, selecting every 10th student for a survey.
// cluster sampling: a sampling method where the population is divided into clusters, and a sample of clusters is selected. For example, selecting schools from different districts for a survey.
// sampling frame: a list of all the members of the population that can be selected for a sample. For example, a list of all the students in a school.

// continious vs quantized vs ordinal scale
// continious: a scale that can take any value within a given range. For example, the height of a person could be any value from 0 to 1000 meters.
// quantized: a scale that can only take certain values. For example, the number of students in a class must be a whole number.
// ordinal: a scale that has a natural order. For example, the order of runners
