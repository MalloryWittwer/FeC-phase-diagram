import React, { Component } from "react";
import * as d3 from "d3";

const margin = { top: 0, right: 0, bottom: 60, left: 60 },
  width = 860 - margin.left - margin.right,
  height = 704 - margin.top - margin.bottom,
  maxComposition = 6.67,
  maxTemperature = 1759;

const x = d3.scaleLinear().domain([0, maxComposition]).range([0, width]);
const y = d3.scaleLinear().domain([0, maxTemperature]).range([height, 0]);

class PhaseDiagram extends Component {
  handleGotClicked(area) {
    const infoWindow = document.getElementById("dynamic-info");
    fetch(process.env.PUBLIC_URL + "/tooltips.json")
      .then((response) => response.json())
      .then((data) => {
        const areaData = data.filter((x) => x.id === area.id)[0];
        const { title, description } = areaData;
        document.getElementById("info-title").innerHTML = title;
        document.getElementById("info-description").innerHTML = description;
      })
      .catch((err) => console.warn("Something went wrong.", err));
  }

  componentDidMount() {
    const svg = d3
      .select("#svg-axes")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("g").attr("transform", "translate(0," + height + ")");

    const x_axis = d3.axisBottom().scale(x);
    svg.append("g").attr("transform", `translate(0, ${height})`).call(x_axis);

    const y_axis = d3.axisLeft().scale(y);
    svg.append("g").call(y_axis);

    svg
      .append("text")
      .attr("x", 0.5 * width)
      .attr("y", height)
      .attr("dy", 40)
      .text("wt%")
      .attr("text-anchor", "middle")
      .attr("fill", "#333333");

    svg
      .append("text")
      .attr("x", 0)
      .attr("y", 0.5 * height)
      .attr("dx", -280)
      .attr("dy", -365)
      .text("°C")
      .attr("text-anchor", "end")
      .attr("fill", "#333333")
      .attr("transform", "rotate(-90)");

    const clickableAreas = document.querySelectorAll(".areas path");
    clickableAreas.forEach((area) => {
      area.addEventListener("mouseover", (e) => this.handleGotClicked(area));
    });
    console.log("Diagram mounted");
  }

  render() {
    return (
      <div id="phase-diagram">
        <div id="diagram-deco"></div>
        <div id="svg-axes"></div>
        <svg id="svg-areas" preserveAspectRatio="none" viewBox="0 0 200 161.4">
          <g className="areas">
            <path
              id="liquid"
              d="m4.798e-6 -3.0459e-7h200v25.289c-29.191 7.9693-50.044 19.951-71.859 31.45-35.334-14.343-58.959-25.332-111.28-33.001l-16.861-5.6399v-18.098"
            />
            <path
              id="ferrite"
              d="m4.798e-6 161.4v-84.32l2.0098 18.547-2.0098 65.773"
            />
            <path
              id="austenite"
              d="m4.798e-6 77.084v-45.006l4.4986-8.8638c18.117 5.9861 36.386 20.657 54.626 33.525-10.875 17.484-23.045 28.991-35.592 38.757-9.4042-4.5321-17.741-10.267-23.532-18.412"
            />
            <path
              id="austenite-ferrite"
              d="m2.0098 95.631 21.522-0.13496c-8.3172-3.9012-16.39-9.0705-23.532-18.412l2.0098 18.412"
            />
            <path
              id="austenite-cementite-ledeburite"
              d="m23.532 95.496 104.61-2e-6v-38.757l-69.017 2e-6c-6.783 11.9-22.135 27.045-35.592 38.757"
            />
            <path
              id="pearlite-ferrite"
              d="m2.0098 95.631 21.522-0.13496v65.908h-23.532l2.0098-65.773"
            />
            <path
              id="pearlite-cementite"
              d="m23.532 95.496h36.005v65.908h-36.005v-65.908"
            />
            <path
              id="cementite-pearlite-ledeburite"
              d="m59.536 95.496h140.41v65.908h-140.41v-65.908"
            />
            <path
              id="liquid-cementite"
              d="m199.95 56.739v-31.45c-27.314 7.714-50.904 19.019-71.811 31.45h71.811"
            />
            <path
              id="delta"
              d="m4.798e-6 32.078v-13.98l2.0595 5.4902-2.0595 8.4895"
            />
            <path
              id="delta-gamma"
              d="m4.798e-6 32.078 2.0595-8.4895 2.4391-0.37431-4.4986 8.8638"
            />
            <path
              id="delta-liquid"
              d="m4.798e-6 18.098 2.0595 5.4902 2.4391-0.37431 12.362 0.52398-16.861-5.6399"
            />
            <path
              id="liquid-austenite"
              d="m128.14 56.739h-69.017c-22.941-17.142-39.836-26.66-54.626-33.525 22.762 0.33888 63.944 6.8151 123.64 33.525"
            />
            <path
              id="cementite-ledeburite"
              d="m128.14 56.739v38.757l71.811 2e-6v-38.757h-71.811"
            />
          </g>
        </svg>
        <svg
          id="svg-outlines"
          width="200mm"
          height="161.4mm"
          viewBox="0 0 200 161.4"
          preserveAspectRatio="none"
        >
          <g
            transform="matrix(1.4543 0 0 1.4543 -364.31 -75.866)"
            fill="none"
            stroke="#000"
            className="outlines"
          >
            <g strokeLinecap="round" strokeLinejoin="round" strokeWidth=".265">
              <path d="m250.51 52.168h137.52v17.389c-20.072 5.4798-34.411 13.719-49.411 21.626-24.296-9.8627-40.541-17.419-76.518-22.692l-11.594-3.8781v-12.444" />
              <path d="m250.51 163.15v-57.98l1.382 12.753-1.382 45.226" />
              <path d="m250.51 105.17v-30.947l3.0933-6.0949c12.457 4.1161 25.02 14.204 37.561 23.052-7.4777 12.022-15.846 19.935-24.474 26.65-6.4665-3.1164-12.199-7.0596-16.181-12.661" />
              <path d="m291.45 117.83h96.552v45.319h-96.552v-45.319" />
              <path d="m388 91.182v-21.626" />
              <path d="m250.51 74.225v-9.6127l1.4162 3.7752-1.4162 5.8375" />
              <path d="m250.51 64.612 1.4162 3.7752 1.6772-0.25738 8.5006 0.3603-11.594-3.8781" />
            </g>
            <g strokeWidth=".26458px">
              <path d="m266.69 163.15h24.757" />
              <path d="m266.69 117.83h24.757" />
              <path d="m388 117.83v-26.65h-96.835" />
              <path d="m266.69 163.15v-45.319" />
              <path d="m266.69 163.15h-16.181" />
              <path d="m266.69 117.83h-14.809" />
            </g>
          </g>
          <path
            d="m128.14 56.737v38.676"
            fill="none"
            stroke="#000"
            strokeWidth=".52917"
          />
        </svg>
        <svg
          id="svg-annotations"
          width="200mm"
          height="161.4mm"
          viewBox="0 0 200 161.4"
        >
          <g
            fontFamily="sans-serif"
            fontSize="3.5278px"
            letterSpacing="0px"
            strokeWidth=".076936"
          >
            <text x="88.272202" y="129.44077">
              <tspan
                x="88.272202"
                y="129.44077"
                fontSize="3.5278px"
                strokeWidth=".076936"
              >
                Cementite + pearlite + transformed ledeburite
              </tspan>
            </text>
            <text
              x="41.438206"
              y="127.55974"
              text-align="center"
              textAnchor="middle"
            >
              <tspan x="41.438206" y="127.55974" text-align="center">
                Pearlite
              </tspan>
              <tspan x="41.438206" y="131.96945" text-align="center">
                + cementite
              </tspan>
            </text>
            <text
              x="12.675866"
              y="127.55974"
              text-align="center"
              textAnchor="middle"
            >
              <tspan x="12.675866" y="127.55974" text-align="center">
                Pearlite
              </tspan>
              <tspan x="12.675866" y="131.96947" text-align="center">
                + ferrite
              </tspan>
            </text>
            <text x="59.270725" y="77.428978">
              <tspan
                x="59.270725"
                y="77.428978"
                fontSize="3.5278px"
                strokeWidth=".076936"
              >
                Austenite + cementite + ledeburite
              </tspan>
            </text>
            <text x="143.36244" y="77.428978">
              <tspan
                x="143.36244"
                y="77.428978"
                fontSize="3.5278px"
                strokeWidth=".076936"
              >
                Cementite + ledeburite
              </tspan>
            </text>
            <text x="160.72749" y="46.589561">
              <tspan
                x="160.72749"
                y="46.589561"
                fontSize="3.5278px"
                strokeWidth=".076936"
              >
                Liquid + cementite
              </tspan>
            </text>
            <text x="116.37236" y="25.213673">
              <tspan
                x="116.37236"
                y="25.213673"
                fontSize="3.5278px"
                strokeWidth=".076936"
              >
                Liquid
              </tspan>
            </text>
            <text x="49.4902" y="46.063248">
              <tspan
                x="49.4902"
                y="46.063248"
                fontSize="3.5278px"
                strokeWidth=".076936"
              >
                Liquid + austenite
              </tspan>
            </text>
            <text x="16.987036" y="59.512154">
              <tspan
                x="16.987036"
                y="59.512154"
                fontSize="3.5278px"
                strokeWidth=".076936"
              >
                Austenite
              </tspan>
            </text>
          </g>
        </svg>
      </div>
    );
  }
}

export default PhaseDiagram;
