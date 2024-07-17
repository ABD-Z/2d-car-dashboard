import ReactDOMServer from 'react-dom/server';

//Right signal DDE_CLNGNT_DRT - Left signal DDE_CLNGNT_GCHE - Dipped beam signal  ETAT_FEUX_CROIST - 1 || 1.000000 ON - 0 OFF
export const setGreenSignalFillValue = (
  GREEN_SIGNAL_VALUE?: number
): string => {
  if (GREEN_SIGNAL_VALUE && GREEN_SIGNAL_VALUE !== undefined) {
    return GREEN_SIGNAL_VALUE === 1 ||
      GREEN_SIGNAL_VALUE === (1.000000)
      ? "#86C662"
      : "#636363";
  }
  return "#636363";
};

//Lock signal ETAT_OUVRANTS - Engine Temp signal PEM_STATOR_TEMP - Seat belt signal BOUC_CEINT_COND - BOUC_CEINT_PASS - Battery NO SIGNAL YET - Oil NO SIGNAL YET - 1 || 1.000000 ON - 0 OFF
export const setRedSignalFillValue = (
  RED_SIGNAL_VALUE?: number
): string => {
  if (RED_SIGNAL_VALUE && RED_SIGNAL_VALUE !== undefined) {
    return RED_SIGNAL_VALUE === 1 ||
      RED_SIGNAL_VALUE === (1.000000)
      ? "#FC0313"
      : "#636363";
  }
  return "#636363";
};

//High beam signal ETAT_FEUX_ROUTE -
export const setBlueSignalFillValue = (
  BLUE_SIGNAL_VALUE?: number
): string => {
  if (BLUE_SIGNAL_VALUE && BLUE_SIGNAL_VALUE !== undefined) {
    return BLUE_SIGNAL_VALUE === 1 ||
      BLUE_SIGNAL_VALUE === (1.000000)
      ? "#29D8FF"
      : "#636363";
  }
  return "#636363";
};

//Trunk ETAT_CPO_LUNETTE - Bonnet OUV_CAPOT_ALE_EVE_US
export const setOrangeSignalFillValue = (
  ORANGE_SIGNAL_VALUE?: number
): string => {
  if (ORANGE_SIGNAL_VALUE && ORANGE_SIGNAL_VALUE !== undefined) {
    return ORANGE_SIGNAL_VALUE === 1 ||
      ORANGE_SIGNAL_VALUE === (1.000000)
      ? "#DC6601"
      : "#636363";
  }
  return "#636363";
};

//Set SOC color icon by value percentage
export const getSocColor = (SOC_SIGNAL?: number): string => {
  if (
    SOC_SIGNAL &&
    Number(SOC_SIGNAL) >= 0 &&
    Number(SOC_SIGNAL) <= 25
  ) {
    return "#FC0313";
  } else if (
    SOC_SIGNAL &&
    Number(SOC_SIGNAL) > 25 &&
    Number(SOC_SIGNAL) <= 50
  ) {
    return "#DC6601";
  } else if (SOC_SIGNAL && Number(SOC_SIGNAL) > 50) {
    return "#86C662";
  } else {
    return "#636363";
  }
};

//Convert SVG to Data URL
export const svgToDataURL = (svgElement: JSX.Element): string => {
  const svgString = ReactDOMServer.renderToStaticMarkup(svgElement);
  return `data:image/svg+xml;base64,${btoa(svgString)}`;
};