import React from "react";
import { useIntl } from "react-intl";
import { Steps } from "intro.js-react";
import "intro.js/introjs.css";

const Guide = () => {
    const intl = useIntl();
  const formatMessage = (id: string): string => {
    return intl.formatMessage({ id });
  };
  const steps = [
    {
      title: "react-antd-admin",
      intro: formatMessage("guide.intro"),
    },
    {
      element: "#hamburger",
      intro: formatMessage("guide.hamburger_intro"),
    },
    {
      element: "#breadcrumb",
      intro: formatMessage("guide.breadcrumb_intro"),
    },
    {
      element: "#fullscreen",
      intro: formatMessage("guide.fullscreen_intro"),
    },
    {
      element: "#intl",
      intro: formatMessage("guide.intl_intro"),
    },
    {
      element: "#settings",
      intro: formatMessage("guide.settings_intro"),
    },
  ];
  const onExit = () => {};
  return <Steps enabled={true} steps={steps} initialStep={0} onExit={onExit} />;
};

export default Guide;
