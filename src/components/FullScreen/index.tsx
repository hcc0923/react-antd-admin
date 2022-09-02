import React from "react";
import { Tooltip } from "antd";
import { FullscreenOutlined } from "@ant-design/icons";
import { useIntl } from "react-intl";
import screenfull from "screenfull";

const FullScreen = () => {
  const intl = useIntl();
  const formatMessage = (id: string): string => {
    return intl.formatMessage({ id });
  };
  const handleFullScrren = () => {
    screenfull.toggle();
  };
  return (
    <Tooltip placement="bottom" title={formatMessage("fullscreen.title")}>
      <FullscreenOutlined onClick={handleFullScrren} />
    </Tooltip>
  );
};

export default FullScreen;
