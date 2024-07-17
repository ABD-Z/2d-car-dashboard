import { FC, useEffect, useRef } from "react";
//Assets
import volant from "../../Assets/Images/volant-peugeot.png"

const SteerWheel: FC<{ data: any }> = ({ data }) => {
  let imgRef: any = useRef();

  const setAngleValue = (value: number) => {
    imgRef?.current.setAttribute('style', `transform:rotate(${value}deg)`);
  };

  useEffect(() => {
    if (imgRef && data?.ANGLE_VOLANT) {
      setAngleValue(data?.ANGLE_VOLANT?.value);
    }
  }, [data]);

  //render
  return (
    <div className="steerwheel">
      <img ref={imgRef} id="wheel" src={volant} alt="car_wheel" width="660" />
    </div>
  );
};

export { SteerWheel };
