import React from "react";
import { Tooltip } from "antd";
import { FullscreenOutlined } from "@ant-design/icons";
import { useIntl } from "react-intl";
import screenfull from "screenfull";

const FullScreen: React.FC = () => {
  const intl = useIntl();
  const formatMessage = (id: string): string => {
    return intl.formatMessage({ id });
  };
  const handleFullScrren = () => {
    screenfull.toggle();
  };
  return (
    <div id="fullscreen">
      <Tooltip placement="bottom" title={formatMessage("fullscreen.title")}>
        <FullscreenOutlined onClick={handleFullScrren} />
      </Tooltip>
    </div>
  );
};

export default FullScreen;
