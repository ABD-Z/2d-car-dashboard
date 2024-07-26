# 2D Car Dashboard
This is a slick car Dashboard useful for live simulation.
Use React component `VehicleDashboard` from package 2d-car-dashboard.
You should provide a correct JSON format for `gps` and `signals` props and optionayly `fps` and `zoom` props.

Desktop view:

![dashboard desktop](https://raw.githubusercontent.com/ABD-Z/2d-car-dashboard/main/dashboardPC.png)

Mobile view:

![Dashboard on mobile](https://raw.githubusercontent.com/ABD-Z/2d-car-dashboard/main/dashboardMobile.png)



## Library build

Launch in terminal `npm run build` . This will generate a folder named 2d-car-dashboard containing all necessary files.

## Download package

2d-car-dashboard package can be downloaded. Launch this command below :

`npm install 2d-car-dashboard`

## Usage

### `VehicleDashboard` component

In you application, you need first to import the corresponding component as follow :

`import { VehicleDashboard, VehicleDatas } from '2d-car-dashboard';`

Then, you can use your components as follow :

`<VehicleDashboard signals={s} gps={g} fps={f} zoom={z}/>`  

`signals`  and  `g` are of type `VehicleDatas`. 
`fps`, `zoom` and `steerwheelImage` are optional. The first two are numbers whereas the third one is the assets (image or SVG) imported as a resource.



### `gps` JSON format
This should be provided to gps prop as follow :
```json
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

### `signals` JSON format
Signals JSON provides several values that can affect the dashboard. Note that all values are required only if changes are needed.
Here is the JSON format to be provided to signals prop :
```json
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

### Optional props

#### `fps`

`fps` is used to limit the rendering to a certain frame rate. If `fps` is below or equal zero, there is no such limitation.
Default value : -1

#### `zoom`

`zoom` is used to set the zoom on dashboard's map. Bigger value corresponds to bigger zoom.
Default value : 15

#### `steerwheelImage`

This prop makes possible to change the appearance of the steer wheel image. You must provide an imported resource as in the example below :

```react
import i from "imagePath"
<VehicleDashboard signals={s} gps={g} fps={f} zoom={z} steerwheelImage={i}/>
```