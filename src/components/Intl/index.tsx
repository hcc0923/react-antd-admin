import React from "react";
import { connect } from "react-redux";
import { ConfigProvider } from "antd";
import { IntlProvider } from "react-intl";
import enUS from "antd/es/locale/en_US";
import zhCN from "antd/es/locale/zh_CN";
import en from "@/lang/en.json";
import zh from "@/lang/zh.json";

const Intl: React.FC = (props: any) => {
  const { settings } = props;
  const localLang = settings["intl"];
  const i18nData: any = { en, zh };
  const languageMap: any = {
    en: enUS,
    zh: zhCN,
  };

  return (
    <IntlProvider
      key={localLang}
      locale={localLang}
      messages={i18nData[localLang]}
    >
      <ConfigProvider locale={languageMap[localLang]}>
        {props.children}
      </ConfigProvider>
    </IntlProvider>
  );
};

const mapStateToProps = (state: object) => state;

export default connect(mapStateToProps)(Intl);
