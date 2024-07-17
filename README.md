# 2D Car Dashboard
This is a slick car Dashboard useful for live simulation.
Use React component `VehicleDashboard` from package 2d-car-dashboard.
You should provide a correct JSON format for `gps` and `signals` props.

## Library build

Launch in terminal `npm run build` . This will generate a folder named 2d-car-dashboard containing all necessary files.

## Download package

2d-car-dashboard package can be downloaded. Launch this command below :

`npm install 2d-car-dashboard`

## Usage

### `VehicleDashboard` component

In you application, you need first to import the corresponding component as follow :

`import { VehicleDashboard } from '2d-car-dashboard';`

Then, you can use your components as follow :

`<VehicleDashboard signals={s} gps={g}/>`



### GPS JSON format
This should be provided to gps prop as follow :
```
{
  "Latitude": {
      "value": "48.994404",
      "unit": "°"},
    
  "Longitude": {
      "value": "2.224964",
      "unit": "°"
  },
  "UIN": "CAR'S UIN"
}
```

Car's position will be displayed on the map.

### Signals JSON format
Signals JSON provides several values that can affect the dashboard. Note that all values are required only if changes are needed.
Here is the JSON format to be provided to signals prop :
```
{
  "ETAT_OUVRANTS": {
      "value": "0",
      "unit": ""
  },
  "ANGLE_VOLANT": {
      "value": "119.700000",
      "unit": "Degré"
  },
  "FREINAGE_EN_COURS": {
      "value": "0",
      "unit": ""
  },
  "REGIME_MOTEUR": {
      "value": "8191.875000",
      "unit": "tr/min"
  },
  "VITESSE_VEH_ROUES_AV": {
      "value": "0",
      "unit": "km/h"
  },
  "VITESSE_ROUE_ARG": {
      "value": "0.450000",
      "unit": "km/h"
  },
  "VITESSE_ROUE_ARD": {
      "value": "0.470000",
      "unit": "km/h"
  },
  "PSEUDO_CONSO_CARBURANT": {
      "value": "0",
      "unit": "mm3"
  },
  "PRESSION_ATMO": {
      "value": "985.000000",
      "unit": "hPa"
  },
  "IHM_CLIGNO_ECO": {
      "value": "0",
      "unit": ""
  },
  "DDE_ALLUM_LED_ORANGE": {
      "value": "0",
      "unit": ""
  },
  "ETAT_FEUX_CROIST": {
      "value": "0",
      "unit": ""
  },
  "MODE_ECO": {
      "value": "1.000000",
      "unit": ""
  },
  "INFO_NIV_CARB": {
      "value": "0",
      "unit": "L"
  },
  "ETAT_FEUX_ROUTE": {
      "value": "0",
      "unit": ""
  },
  "SENS_ROULAGE": {
      "value": "1.000000",
      "unit": ""
  },
  "VITESSE_VEHICULE": {
      "value": "0",
      "unit": "km/h"
  },
  "DMD_DELEST_ABS_ESP": {
      "value": "0",
      "unit": ""
  },
  "BOUC_CEINT_PASS": {
      "value": "1.000000",
      "unit": ""
  },
  "BOUC_CEINT_COND": {
      "value": "2.000000",
      "unit": ""
  },
  "KILOMETRAGE": {
      "value": "1802.000000",
      "unit": "km"
  },
  "UIN": "CAR'S UIN"
}
```
