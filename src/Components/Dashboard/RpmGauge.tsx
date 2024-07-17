import { FC, useEffect, useRef, useState } from "react";
import ReactDOMServer from "react-dom/server";
import {
  arc,
  line,
  range,
  scaleLinear,
  select,
  transition,
  easeCubicInOut,
} from "d3";
//Helpers
import {
  setGreenSignalFillValue,
  setRedSignalFillValue,
  setBlueSignalFillValue,
  setOrangeSignalFillValue,
  colors,
  DEFAULT_REFRESH_RATE,
  r,
  ticksData,
  degToRad,
  scale,
} from "../../Helpers";
//Assets
import { Svgs } from "../../Assets";
//Types
import { DataTypes } from "../../vehicleDashboard.types";
import { SvgComponentsType } from "./dashboard.types";

let needleRef: any;
let rpmText: any;

const RpmGauge: FC<DataTypes> = ({ data }) => {
  const svgRef = useRef(null);
  const [engineSignalFill, setEngineSignalFill] = useState("");
  const [beltCondSignalFill, setBeltCondSignalFill] = useState("");
  const [beltPassSignalFill, setBeltPassSignalFill] = useState("");
  const [dippedSignalFill, setDippedSignalFill] = useState("");
  const [highSignalFill, setHighSignalFill] = useState("");
  const [lockSignalFill, setLockSignalFill] = useState("");
  const [batterySignalFill, setBatterySignalFill] = useState("");
  const [oilSignalFill, setOilSignalFill] = useState("");

  const [beltCondValue, setBeltCondValue] = useState(0);
  const [beltPassValue, setBeltPassValue] = useState(0);
  const [engineValue, setEngineValue] = useState(0);
  const [dippedValue, setDippedValue] = useState(0);
  const [highValue, setHighValue] = useState(0);
  const [lockValue, setLockValue] = useState(0);
  const [batteryValue, setBatteryValue] = useState(0);
  const [oilValue, setOilValue] = useState(0);

  useEffect(() => {
    generate();
  }, [
    svgRef,
    engineSignalFill,
    beltPassSignalFill,
    beltCondSignalFill,
    batterySignalFill,
    oilSignalFill,
    dippedSignalFill,
    highSignalFill,
    lockSignalFill,
  ]);

  useEffect(() => {
    if (
      data?.BOUC_CEINT_COND?.value &&
      Number(data?.BOUC_CEINT_COND?.value) !== beltCondValue
    ) {
      setBeltCondValue(Number(data?.BOUC_CEINT_COND?.value));
    }
    if (
      data?.BOUC_CEINT_PASS?.value &&
      Number(data?.BOUC_CEINT_PASS?.value) !== beltPassValue
    ) {
      setBeltPassValue(Number(data?.BOUC_CEINT_PASS?.value));
    }
    if (
      data?.PEM_STATOR_TEMP?.value &&
      Number(data?.PEM_STATOR_TEMP?.value) !== engineValue
    ) {
      setEngineValue(Number(data?.PEM_STATOR_TEMP?.value));
    }
    if (
      data?.ETAT_FEUX_CROIST?.value &&
      Number(data?.ETAT_FEUX_CROIST?.value) !== dippedValue
    ) {
      setDippedValue(Number(data?.ETAT_FEUX_CROIST?.value));
    }
    if (
      data?.ETAT_FEUX_ROUTE?.value &&
      Number(data?.ETAT_FEUX_ROUTE?.value) !== highValue
    ) {
      setHighValue(Number(data?.ETAT_FEUX_ROUTE?.value));
    }
    if (
      data?.ETAT_OUVRANTS?.value &&
      Number(data?.ETAT_OUVRANTS?.value) !== lockValue
    ) {
      setLockValue(Number(data?.ETAT_OUVRANTS?.value));
    }
    if (
      data?.ETAT_OUVRANTS?.value &&
      Number(data?.ETAT_OUVRANTS?.value) !== batteryValue
    ) {
      setBatteryValue(Number(data?.ETAT_OUVRANTS?.value));
    }
    if (
      data?.ETAT_OUVRANTS?.value &&
      Number(data?.ETAT_OUVRANTS?.value) !== oilValue
    ) {
      setOilValue(Number(data?.ETAT_OUVRANTS?.value));
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      if (data?.REGIME_MOTEUR) {
        setValueRpm(Number(data?.REGIME_MOTEUR?.value), DEFAULT_REFRESH_RATE);
      }
      setBeltCondSignalFill(setRedSignalFillValue(beltCondValue));
      setBeltPassSignalFill(setRedSignalFillValue(beltPassValue));
      setEngineSignalFill(setRedSignalFillValue(engineValue));
      setDippedSignalFill(setGreenSignalFillValue(dippedValue));
      setHighSignalFill(setBlueSignalFillValue(highValue));
      setLockSignalFill(setRedSignalFillValue(lockValue));
      setBatterySignalFill(setRedSignalFillValue(batteryValue)); //ADD REAL SIGNAL KEY WHEN AVAILABLE
      setOilSignalFill(setOrangeSignalFillValue(oilValue)); //ADD REAL SIGNAL KEY WHEN AVAILABLE
    }
  }, [data]);

  const setValueRpm = (value: number, duration: number) => {
    const minAngle = -160;
    const maxAngle = 90;
    const angleRange = maxAngle - minAngle;
    const angle = minAngle + scale(value, 8000) * angleRange;

    if (needleRef) {
      transition()
        .select(() => needleRef.node())
        .duration(duration)
        .ease(easeCubicInOut)
        .attr("transform", `rotate(${angle})`);
      rpmText.text((value / 1000).toFixed(1));
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
    const outerRadius = r - 10;
    const innerRadius = 0;

    const circle = arc()
      .innerRadius(0)
      .outerRadius(outerRadius)
      .startAngle(innerRadius)
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
    const maxAngle = 90;
    const angleRange = maxAngle - minAngle;

    const ticks = ticksData
      .reduce((acc, curr) => {
        if (curr.value === 0) {
          return acc;
        } else {
          return acc.concat(range(curr.value - 10, curr.value + 10));
        }
      }, [] as number[])
      .filter((d: number) => d % 2 === 0 && d <= 80);

    lg.selectAll("line")
      .data(ticks)
      .enter()
      .append("line")
      .attr("class", "tickline")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 0)
      .attr("y2", (d: number) => (d % 5 === 0 ? "12" : "7"))
      .attr("transform", (d: number) => {
        const scale = scaleLinear().range([0, 1]).domain([0, 80]);
        const ratio = scale(d);
        const newAngle = minAngle + ratio * angleRange;
        const deviation = d % 5 === 0 ? 12 : 17;
        return `rotate(${newAngle}) translate(0, ${deviation - r})`;
      })
      .style("stroke", (d: number) => (d >= 70 ? colors[3] : colors[2]))
      .style("stroke-width", (d: number) => (d % 5 === 0 ? "3" : "1"));

    // tick texts
    lg.selectAll("text")
      .data(ticksData)
      .enter()
      .append("text")
      .attr("transform", (d: { value: number }) => {
        const scale = scaleLinear().range([0, 1]).domain([0, 80]);
        const ratio = scale(d.value);
        const newAngle = degToRad(minAngle + ratio * angleRange);
        const y = (55 - r) * Math.cos(newAngle);
        const x = -1 * (52 - r) * Math.sin(newAngle);
        return `translate(${x}, ${y + 7})`;
      })
      .text((d: { value: number }) => (d.value !== 0 ? d.value / 10 : ""))
      .attr("fill", (d: { value: number }) =>
        d.value >= 70 ? colors[3] : colors[2]
      )
      .attr("font-size", "30")
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
    // big text in center

    // rpm x 1000 text
    tg.append("text")
      .text("1/min x 1000")
      .attr("font-size", "11")
      .attr("text-anchor", "middle")
      .attr("fill", colors[2])
      .attr("x", "0")
      .attr("y", "45px")
      .style("position", "absolute")
      .style("z-index", "10");

    const ig = lg.append("g");

    const svgComponents: SvgComponentsType = [
      {
        component: <Svgs.HighBeam />,
        x: 6,
        y: 134,
        width: 35,
        height: 35,
        fill: highSignalFill,
      },
      {
        component: <Svgs.DippedLight />,
        x: 52,
        y: 120,
        width: 35,
        height: 35,
        fill: dippedSignalFill,
      },
      {
        component: <Svgs.SeatBeltCond />,
        x: 86,
        y: 94,
        width: 30,
        height: 30,
        fill: beltCondSignalFill,
      },
      {
        component: <Svgs.SeatBeltPass />,
        x: 108,
        y: 60,
        width: 30,
        height: 30,
        fill: beltPassSignalFill,
      },
      {
        component: <Svgs.Lock />,
        x: 120,
        y: 30,
        width: 30,
        height: 30,
        fill: lockSignalFill,
      },
      {
        component: <Svgs.EngineTemp />,
        x: -15,
        y: 75,
        width: 30,
        height: 30,
        append: tg,
        fill: engineSignalFill,
      },
      {
        component: <Svgs.Battery />,
        x: -60,
        y: 64,
        width: 30,
        height: 30,
        append: tg,
        fill: batterySignalFill,
      },
      {
        component: <Svgs.Oil />,
        x: 30,
        y: 60,
        width: 40,
        height: 40,
        append: tg,
        fill: oilSignalFill,
      },
      // Add more SVG components with their positions, widths, and heights here
    ];

    // Loop through the array and append each SVG component to the group with its position, width, and height
    svgComponents.forEach(
      ({ component, x, y, width, height, transform, fill, append }) => {
        // Convert the SVG component to a string of HTML
        const svgString = ReactDOMServer.renderToString(component);

        let attributes = `x="${x}" y="${y}" width="${width}" height="${height}"`;
        if (transform) {
          attributes += ` transform="${transform}"`;
        }
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

    rpmText = tg
      .append("text")
      .attr("font-size", "60")
      .attr("text-anchor", "middle")
      .attr("fill", colors[2])
      .attr("x", "0")
      .attr("y", "25px")
      .style("position", "absolute")
      .style("z-index", "10");
  };

  //render
  return (
    <div className='rpm-gauge dash-gauge'>
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

export { RpmGauge };
