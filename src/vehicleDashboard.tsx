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

const VehicleDashboard: FC<VehicleDatasInterface> = ({signals, gps}) => {
    const [signalsState, setSignals] = useState<VehicleDatas>(undefined);
    const [gpsState, setGps] = useState<VehicleDatas>(undefined);

    useEffect(() => {
        setSignals(signals);
    }, [signals]);

    useEffect(() => {
        setGps(gps);
    }, [gps]);

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
          <div className="dashboard-container">
            <Top data={extractedTop} />
            <RpmGauge data={extractedRpm} />
            <MidMap value={extractedMap} />
            <SpeedGauge data={extractedSpeed} />
            <SteerWheel data={extractedSteer} />
          </div>
      
    </div>
  );
};

export { VehicleDashboard };
