import { FC, useEffect, useRef } from "react";

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
    <div id="_2d-car-dashboard-steerwheel">
      <img ref={imgRef} id="wheel" src={data.steerwheelImage} alt="car_wheel"/>
    </div>
  );
};

export { SteerWheel };
