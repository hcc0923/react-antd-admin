import React, { useState, useEffect } from "react";
import { Tooltip } from "antd";
import { FullscreenOutlined } from "@ant-design/icons";

const FullScreen = () => {
  const [fullScreen, setFullScreen] = useState(false);

  const handleRequestFullScreen = () => {
    const docEl = document.documentElement;

    const platforms = [
      "requestFullscreen",
      "mozRequestFullScreen",
      "webkitRequestFullScreen",
    ];
    for (let index = 0; index < platforms.length; index++) {
      if (docEl[platforms[index]]) {
        docEl[platforms[index]]();
        break;
      }
    }
  };
  const handleExitFullscreen = () => {
    const platforms = [
      "exitFullscreen",
      "mozCancelFullScreen",
      "webkitCancelFullScreen",
    ];

    for (let index = 0; index < platforms.length; index++) {
      if (document[platforms[index]]) {
        document[platforms[index]]();
        break;
      }
    }
  };
  const handleFullScrren = () => {
    fullScreen ? handleExitFullscreen() : handleRequestFullScreen();
  };
  const handleWatchFullScreen = () => {
    const platforms = [
      { event: "fullscreenchange", method: "fullscreenElement" },
      { event: "mozfullscreenchange", method: "mozFullScreen" },
      { event: "webkitfullscreenchange", method: "webkitIsFullScreen" },
    ];

    platforms.forEach((platform) => {
      document.addEventListener(
        platform.event,
        () => {
          setFullScreen(`${document[platform.method]}`);
        },
        false
      );
    });
  };
  useEffect(() => {
    handleWatchFullScreen();
  });

  return (
    <Tooltip placement="bottom" title={"全屏"}>
      <FullscreenOutlined onClick={handleFullScrren} />
    </Tooltip>
  );
};

export default FullScreen;
