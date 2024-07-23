import { FC, useEffect, useState } from "react";
//components
import {
  MidMap,
  RpmGauge,
  Top,
  SpeedGauge,
  SteerWheel,
} from "./Components";
//types
import { VehicleDatas, VehicleDatasInterface } from "./vehicleDashboard.types";
//Helpers
import {
  rpmgKeys,
  speedKeys,
  topKeys,
  mapKeys,
  steerKeys,
} from "./Helpers";

const VehicleDashboard: FC<VehicleDatasInterface> = ({signals, gps, fps=-1, zoom=15}) => {
    const [signalsState, setSignals] = useState<VehicleDatas>(undefined);
    const [gpsState, setGps] = useState<VehicleDatas>(undefined);
    const [drawState, setDraw] = useState<boolean>(true);


    useEffect(() => {
      if (drawState) {
        setSignals(signals);
        setGps(gps);
        if (fps > 0) {
          setDraw(false); 
          setTimeout(() => {setDraw(true);}, 1000/fps);
        }
      }
    }, [signals, gps]);

    function extractKeys(signals: VehicleDatas, keys: string[]) {
        if (signals) {
          return Object.fromEntries(
            Object.entries(signals).filter(([key]) => keys.includes(key))
          );
        } else {
          return;
        }
      }
      //keys extraction
      const extractedTop = extractKeys(signalsState, topKeys);
      const extractedRpm = extractKeys(signalsState, rpmgKeys);
      const extractedSpeed = extractKeys(signalsState, speedKeys);
      const extractedMap = extractKeys(gpsState, mapKeys);
      const extractedSteer = extractKeys(signalsState, steerKeys);

  return (
    <div>
          <div id="dashboard-container">
            <Top data={extractedTop} />
            <RpmGauge data={extractedRpm} />
            <MidMap value={ {...extractedMap, "zoom":zoom} } />
            <SpeedGauge data={extractedSpeed} />
            <SteerWheel data={extractedSteer} />
          </div>
      
    </div>
  );
};

export { VehicleDashboard };
