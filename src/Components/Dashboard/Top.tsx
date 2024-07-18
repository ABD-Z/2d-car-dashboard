import { FC, useEffect, useRef, useState } from "react";
import ReactDOMServer from "react-dom/server";
import { select } from "d3";
//Assets
import { Svgs } from "../../Assets/images";
//Helpers
import { getSocColor, setGreenSignalFillValue } from "../../Helpers";
//types
import { DataTypes } from "../../vehicleDashboard.types";
import { SvgComponentsType } from "./dashboard.types";



const Top: FC<DataTypes> = ({ data }) => {
  //state
  const svgRef = useRef<SVGSVGElement | null>(null);
  const uinTextRef = useRef<SVGTextElement | null>(null);
  const carbTextRef = useRef<SVGTextElement | null>(null);
  const socTextRef = useRef<SVGTextElement | null>(null);

  const [leftSignalFill, setLeftSignalFill] = useState("");
  const [rightSignalFill, setRightSignalFill] = useState("");
  const [socSignalFill, setSocSignalFill] = useState("");
  const [socValue, setSocValue] = useState(0);
  const [gcheValues, setGcheValues] = useState(0)
  const [drtValues, setDrtValues] = useState(0)

  //useEffect
  useEffect(() => {
    generate();
  }, [rightSignalFill, leftSignalFill, socSignalFill]);

  useEffect(() => {
    if (
      data?.VALEUR_SOC_ETENDUE?.value &&
      Number(data?.VALEUR_SOC_ETENDUE?.value) !== socValue
    ) {
      setSocValue(Number(data?.VALEUR_SOC_ETENDUE?.value));
    }
    if (
      data?.DDE_CLNGNT_DRT?.value &&
      Number(data?.DDE_CLNGNT_DRT?.value) !== drtValues
    ) {
      setDrtValues(Number(data?.DDE_CLNGNT_DRT?.value));
    }
    if (
      data?.DDE_CLNGNT_GCHE?.value &&
      Number(data?.DDE_CLNGNT_GCHE?.value) !== gcheValues
    ) {
      setGcheValues(Number(data?.DDE_CLNGNT_GCHE?.value));
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      const {
        UIN,
        INFO_NIV_CARB,
        VALEUR_SOC_ETENDUE,
      } = data;
      if (uinTextRef.current) {
        select(uinTextRef.current).text(UIN || "--");
      }
      if (carbTextRef.current && INFO_NIV_CARB) {
        select(carbTextRef.current).text(`${Number(INFO_NIV_CARB?.value)}L`);
      }
      if (socTextRef.current && VALEUR_SOC_ETENDUE) {
        select(socTextRef.current).text(
          `${Number(VALEUR_SOC_ETENDUE?.value)}%`
        );
      }
      setRightSignalFill(setGreenSignalFillValue(gcheValues));
      setLeftSignalFill(setGreenSignalFillValue(drtValues));
      setSocSignalFill(getSocColor(socValue));
    }
  }, [data]);

  //functions
  const generate = () => {
    const svg = select(svgRef.current);
    // Clear existing elements
    svg.selectAll("*").remove();
    const g = svg.append("g");

    const svgComponents: SvgComponentsType = [
      {
        component: <Svgs.LeftTurnSignal />,
        x: 625,
        y: 35,
        width: 30,
        height: 30,
        fill: leftSignalFill,
      },
      {
        component: <Svgs.RightTurnSignal />,
        x: 85,
        y: 35,
        width: 30,
        height: 30,
        fill: rightSignalFill,
      },
      {
        component: <Svgs.SOC />,
        x: 545,
        y: 35,
        width: 30,
        height: 30,
        fill: socSignalFill,
      },
      { component: <Svgs.UpBottomLine />, x: 0, y: 30, width: 740, height: 50 },
      { component: <Svgs.UpTopDots />, x: 30, y: 5, width: 680, height: 30 },
      { component: <Svgs.GasPump />, x: 140, y: 37, width: 25, height: 25 },
      { component: <Svgs.RedLine />, x: 235, y: 35, width: 25, height: 25 },
      { component: <Svgs.RedLine />, x: 520, y: 35, width: 25, height: 25 },
    ];

    svgComponents.forEach(
      ({ component, x, y, width, height, fill }) => {
        const svgString = ReactDOMServer.renderToString(component);
        let attributes = `x="${x - 10}" y="${y}" width="${width}" height="${height}"`;
        if (fill) { attributes += ` fill="${fill}"`; }
        const modifiedSvgString = svgString.replace("<svg", `<svg ${attributes}`);
        g.html(g.html() + modifiedSvgString);
      });

    // carburant
    carbTextRef.current = g
      .append("text")
      .attr("font-size", "16")
      .attr("text-anchor", "middle")
      .attr("fill", "black")
      .attr("x", "195px")
      .attr("y", "55px")
      .style("position", "absolute")
      .node() as SVGTextElement;

    // uin
    uinTextRef.current = g
      .append("text")
      .attr("font-size", "16")
      .attr("text-anchor", "middle")
      .attr("fill", "black")
      .attr("x", "390px")
      .attr("y", "55px")
      .style("position", "absolute")
      .node() as SVGTextElement;

    // soc
    socTextRef.current = g
      .append("text")
      .attr("font-size", "16")
      .attr("text-anchor", "middle")
      .attr("fill", "black")
      .attr("x", "600px")
      .attr("y", "55px")
      .style("position", "absolute")
      .node() as SVGTextElement;
  };
  //render
  return (
    <div id='top'>
      <svg
        ref={svgRef}
        viewBox="0 0 720 80"
        transform={`translate(0,0)`}
        height={80}
        width={720}
      ></svg>
    </div>
  );
};

export { Top };
