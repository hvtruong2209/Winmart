import { ClientNav } from "component/clientnav";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { getUrlImage } from "Utils";
import "./index.scss";
import { Footer } from "component/footer";
import { ListProduct } from "component/listproduct";
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label: "San Francisco",
    imgPath: getUrlImage("ads2.png"),
  },
  {
    label: "Bird",
    imgPath: getUrlImage("ads3.jpg"),
  },
  {
    label: "Indonesia",
    imgPath: getUrlImage("ads4.png"),
  },
  {
    label: "Serbia",
    imgPath: getUrlImage("ads1.png"),
  },
];

export const Home = () => {
  const [activeStep, setActiveStep] = useState(0);
  const theme = useTheme();
  const [timeRemaining, setTimeRemaining] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Hàm tính toán thời gian còn lại đến cuối ngày
    const calculateTimeRemaining = () => {
      const now = new Date();
      const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
      const timeDiff = endOfDay.getTime() - now.getTime();

      if (timeDiff > 0) {
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        return { hours, minutes, seconds };
      } else {
        return { hours: 0, minutes: 0, seconds: 0 };
      }
    };

    const interval = setInterval(() => {
      const remaining = calculateTimeRemaining();
      setTimeRemaining(remaining);

      if (remaining.hours <= 0 && remaining.minutes <= 0 && remaining.seconds <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <>
      <ClientNav />
      <div className="flex flex-col items-center mt-1 bg-bgGray">
        <div className="advertisement flex justify-center">
          <div className="container-wrap flex">
            <div className="advertisement-image-left">
              <AutoPlaySwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
              >
                {images.map((step, index) => (
                  <div key={step.label}>
                    {Math.abs(activeStep - index) <= 2 ? (
                      <Box
                        component="img"
                        sx={{
                          // height: 255,
                          display: "block",
                          overflow: "hidden",
                          width: "100%",
                        }}
                        src={step.imgPath}
                        alt={step.label}
                      />
                    ) : null}
                  </div>
                ))}
              </AutoPlaySwipeableViews>
            </div>
            <div className="flex flex-col flex-1 ml-1">
              <img src={getUrlImage("ads10.png")} alt="av" className=""></img>
              <img src={getUrlImage("ads11.jpg")} alt="av"></img>
            </div>
          </div>
        </div>
        <div className="container-wrap header-notification">
          <div className="text-lg font-semibold">Duy nhất hôm nay</div>
          <div className="text-sm flex">
            <span style={{ lineHeight: "30px" }}>Kết thúc trong</span>
            <div className="ml-1 flex">
              <div className="time">{String(timeRemaining.hours).padStart(2, "0")}</div>
              <div className="time">{String(timeRemaining.minutes).padStart(2, "0")}</div>
              <div className="time">{String(timeRemaining.seconds).padStart(2, "0")}</div>
            </div>
          </div>
        </div>
        <ListProduct></ListProduct>
      </div>
      <Footer />
    </>
  );
};
