import { FC, useEffect, useRef, useState } from "react";
import ReactDOMServer from "react-dom/server";
import { arc, line, range, select, transition, easeCubicInOut } from "d3";
//Helpers
import {
  setOrangeSignalFillValue,
  setRedSignalFillValue,
  degToRad, scale, colors, ticksDataSpeed, DEFAULT_REFRESH_RATE, r
} from "../../Helpers";
//Assets
import { Svgs } from "../../Assets/images";
//Types
import { DataTypes } from "../../vehicleDashboard.types";
import { SvgComponentsType } from "./dashboard.types";


let needleRef: any;
let speedText: any;
let kiloText: any;

const SpeedGauge: FC<DataTypes> = ({ data }) => {
  const svgRef = useRef(null);
  const [breakSignalFill, setBreakSignalFill] = useState("");
  const [absSignalFill, setAbsSignalFill] = useState("");
  const [stabSignalFill, setStabSignalFill] = useState("");
  const [bonnetSignalFill, setBonnetSignalFill] = useState("");
  const [trunkSignalFill, setTrunkSignalFill] = useState("");
  const [doorSignalFill, setDoorsSignalFill] = useState("");
  const [absValue, setAbsValue] = useState(0);
  const [breakValue, setBreakValue] = useState(0);
  const [stabValue, setStabValue] = useState(0);
  const [bonnetValue, setBonnetValue] = useState(0);
  const [trunkValue, setTrunkValue] = useState(0);
  const [doorsValue, setDoorsValue] = useState(0);

  useEffect(() => {
    generate();
  }, [
    breakSignalFill,
    absSignalFill,
    doorSignalFill,
    trunkSignalFill,
    bonnetSignalFill,
    stabSignalFill,
  ]);
  useEffect(() => {
    if (
      data?.REGUL_ABR?.value &&
      Number(data?.REGUL_ABR?.value) !== absValue
    ) {
      setAbsValue(Number(data?.REGUL_ABR?.value));
    }
    if (
      data?.FREINAGE_EN_COURS?.value &&
      Number(data?.FREINAGE_EN_COURS?.value) !== breakValue
    ) {
      setBreakValue(Number(data?.FREINAGE_EN_COURS?.value));
    }
    if (
      data?.ESPACT?.value &&
      Number(data?.ESPACT?.value) !== stabValue
    ) {
      setStabValue(Number(data?.ESPACT?.value));
    }
    if (
      data?.OUV_CAPOT_ALE_EVE_US?.value &&
      Number(data?.OUV_CAPOT_ALE_EVE_US?.value) !== bonnetValue
    ) {
      setBonnetValue(Number(data?.OUV_CAPOT_ALE_EVE_US?.value));
    }
    if (
      data?.ETAT_CPO_LUNETTE?.value &&
      Number(data?.ETAT_CPO_LUNETTE?.value) !== trunkValue
    ) {
      setTrunkValue(Number(data?.ETAT_CPO_LUNETTE?.value));
    }
    if (
      data?.ETAT_CPO_COND_REPLI?.value &&
      Number(data?.ETAT_CPO_COND_REPLI?.value) !== doorsValue
    ) {
      setDoorsValue(Number(data?.ETAT_CPO_COND_REPLI?.value));
    }
  }, [data]);
  useEffect(() => {
    if (data) {
      const {
        VITESSE_VEHICULE,
        KILOMETRAGE,
      } = data;
      if (VITESSE_VEHICULE) {
        setValueSpeed(Number(VITESSE_VEHICULE?.value), DEFAULT_REFRESH_RATE);
      }
      if (KILOMETRAGE) {
        kiloText.text(`${Number(KILOMETRAGE?.value)} km`);
      }
      setBreakSignalFill(setRedSignalFillValue(breakValue));
      setAbsSignalFill(setRedSignalFillValue(absValue));
      setStabSignalFill(setRedSignalFillValue(stabValue));
      setBonnetSignalFill(setOrangeSignalFillValue(bonnetValue));
      setTrunkSignalFill(setOrangeSignalFillValue(trunkValue));
      setDoorsSignalFill(setOrangeSignalFillValue(doorsValue));
    }
  }, [data]);

  const setValueSpeed = (value: number, duration: number) => {
    const minAngle = -160;
    const maxAngle = 150;
    const angleRange = maxAngle - minAngle;
    const angle = minAngle + scale(value, 300) * angleRange;

    if (needleRef) {
      transition()
        .select(() => needleRef.node())
        .duration(duration)
        .ease(easeCubicInOut)
        .attr("transform", `rotate(${angle})`);

      speedText.text(value.toFixed(1));
    }
  };

  const generate = () => {
    const svg = select(svgRef.current);
    // gradients
    const defs = svg.append("defs");

    const gradient = defs
      .append("linearGradient")
      .attr("id", "gradient1")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "50%")
      .attr("y2", "100%");
    gradient
      .append("stop")
      .attr("offset", "50%")
      .attr("stop-color", colors[4])
      .attr("stop-opacity", 1);
    gradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", colors[5])
      .attr("stop-opacity", 1);

    const g = svg.append("g");

    // outer circle
    const outerRadius = 200 - 10;
    const innerRadius = 0;

    const circle = arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)
      .startAngle(0)
      .endAngle(2 * Math.PI);

    g.append("path")
      .attr("d", circle as any)
      .attr("fill", "url(#gradient1)")
      .attr("stroke", colors[1])
      .attr("stroke-width", "7")
      .attr("transform", `translate(200, 200)`);

    // ticks
    const lg = svg
      .append("g")
      .attr("class", "label")
      .attr("transform", `translate(${r}, ${r})`);
    const minAngle = -160;
    const maxAngle = 150;
    const angleRange = maxAngle - minAngle;

    const ticks = ticksDataSpeed
      .reduce((acc, curr) => {
        if (curr.value === 0) {
          return [0, 1, 2, 3, 4, 5];
        } else {
          return acc.concat(range(curr.value - 10, curr.value + 10));
        }
      }, [] as number[])
      .filter((d: number) => d % 5 === 0 && d <= 300);

    lg.selectAll("line")
      .data(ticks)
      .enter()
      .append("line")
      .attr("class", "tickline")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 0)
      .attr("y2", (d: number) => (d % 20 === 0 || d === 0 ? "12" : "7"))
      .attr("transform", (d: number) => {
        const ratio = scale(d, 300);
        const newAngle = minAngle + ratio * angleRange;
        const deviation = d % 20 === 0 || d === 0 ? 12 : 17;
        return `rotate(${newAngle}) translate(0, ${deviation - r})`;
      })
      .style("stroke", (d: number) =>
        d === 30 || d === 50 ? colors[3] : colors[2]
      )
      .style("stroke-width", (d: number) =>
        d % 5 === 0 || d === 0 ? "3" : "1"
      );

    // ticks text
    lg.selectAll("text")
      .data(ticksDataSpeed)
      .enter()
      .append("text")
      .attr("transform", (d: { value: number; color: string }) => {
        const ratio = scale(d.value, 300);
        const newAngle = degToRad(minAngle + ratio * angleRange);
        const deviation = d.value === 30 || d.value === 50 ? 45 : 50;
        const y = (deviation - r) * Math.cos(newAngle);
        const x = -1 * (deviation - r) * Math.sin(newAngle);
        return `translate(${x}, ${y + 7})`;
      })
      .text((d: { value: number; color: string }) =>
        d.value !== 0 ? d.value : ""
      )
      .attr("fill", (d: { value: number; color: string }) => d.color)
      .attr("font-size", (d: { value: number; color: string }) => {
        return d.value === 30 || d.value === 50 ? "16" : "20";
      })
      .attr("text-anchor", "middle");

    // needle
    const pointerHeadLength = r * 0.88;
    const lineData = [
      [0, -pointerHeadLength],
      [0, 15],
    ];
    const needleLine = line();
    const ng = svg
      .append("g")
      .data([lineData])
      .attr("class", "pointer")
      .attr("stroke", colors[3])
      .attr("stroke-width", "6")
      .attr("stroke-linecap", "round")
      .attr("transform", `translate(${r}, ${r})`)
      .attr("z-index", "1");

    needleRef = ng
      .append("path")
      .attr("d", needleLine as any)
      .attr("transform", `rotate(${-160})`);

    // inner circle
    const tg = svg.append("g").attr("transform", `translate(${r}, ${r})`);

    const innerArcOuterRadius = r - 80;
    const innerArcInnerRadius = 0;

    const innerArc = arc()
      .innerRadius(innerArcInnerRadius)
      .outerRadius(innerArcOuterRadius)
      .startAngle(0)
      .endAngle(2 * Math.PI);

    tg.append("path")
      .attr("d", innerArc as any)
      .attr("stroke", colors[0])
      .attr("stroke-width", "2")
      .attr("fill", "url(#gradient1)")
      .attr("z-index", "10");

    const ig = lg.append("g");

    const svgComponents: SvgComponentsType = [
      {
        component: <Svgs.Break />,
        x: 10,
        y: 134,
        width: 35,
        height: 35,
        fill: breakSignalFill,
      },
      {
        component: <Svgs.ABS />,
        x: 56,
        y: 120,
        width: 35,
        height: 35,
        fill: absSignalFill,
      },
      {
        component: <Svgs.Stab />,
        x: 90,
        y: 94,
        width: 35,
        height: 35,
        fill: stabSignalFill,
      },
      {
        component: <Svgs.Bonnet />,
        x: 112,
        y: 60,
        width: 35,
        height: 35,
        fill: bonnetSignalFill,
      },
      {
        component: <Svgs.Trunk />,
        x: 124,
        y: 30,
        width: 35,
        height: 35,
        fill: trunkSignalFill,
      },
      {
        component: <Svgs.Doors />,
        x: 132,
        y: -5,
        width: 35,
        height: 35,
        fill: doorSignalFill,
      },

      // Add more SVG components with their positions, widths, and heights here
    ];

    // Loop through the array and append each SVG component to the group with its position, width, and height
    svgComponents.forEach(
      ({ component, x, y, width, height, fill, append }) => {
        // Convert the SVG component to a string of HTML
        const svgString = ReactDOMServer.renderToString(component);
        let attributes = `x="${x}" y="${y}" width="${width}" height="${height}"`;
        if (fill) {
          attributes += ` fill="${fill}"`;
        }

        // Modify the SVG string to include attributes
        const modifiedSvgString = svgString.replace(
          "<svg",
          `<svg ${attributes}`
        );

        if (append) {
          // Append the modified SVG string as HTML inside the group element
          append.html(append.html() + modifiedSvgString);
        } else {
          // Append the modified SVG string as HTML inside the group element
          ig.html(ig.html() + modifiedSvgString);
        }
      }
    );
    // big text in center
    speedText = tg
      .append("text")
      .attr("font-size", "60")
      .attr("text-anchor", "middle")
      .attr("fill", colors[2])
      .attr("x", "0")
      .attr("y", "25px")
      .style("position", "absolute")
      .style("z-index", "10");

    // km/h text
    tg.append("text")
      .text("km/h")
      .attr("font-size", "11")
      .attr("text-anchor", "middle")
      .attr("fill", colors[2])
      .attr("x", "0")
      .attr("y", "45px")
      .style("position", "absolute")
      .style("z-index", "10");

    kiloText = tg
      .append("text")
      .text(
        data?.KILOMETRAGE?.value
          ? `${Number(data?.KILOMETRAGE?.value)} km`
          : "--"
      )
      .attr("font-size", "20")
      .attr("text-anchor", "middle")
      .attr("fill", colors[2])
      .attr("x", "0")
      .attr("y", "85px")
      .style("position", "absolute")
      .style("z-index", "10");
  };

  //render
  return (
    <div className='dash-gauge' id='speed-gauge'>
      <svg
        ref={svgRef}
        transform={`translate(0,0)`}
        viewBox="0 0 400 400"
        width={400}
        height={400}
      ></svg>
    </div>
  );
};

export { SpeedGauge };
