import React, { useState, useEffect, Fragment } from "react";
import TopCard from "./TopCard";
import CenterContent from "./CenterContent";
import FooterTable from "./FooterTable";
import { getTopCard, getCenterContent, getFooterTable } from "@/api/home";
import './index.less';

const Home = () => {
  const [topCard, setTopCard] = useState([]);
  const [centerContent, setCenterContent] = useState([]);
  const [footerTable, setFooterTable] = useState([]);

  const handleGetTopCard = () => {
    getTopCard()
      .then((response) => {
        const { data } = response;
        setTopCard(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleGetCenterContent = () => {
    getCenterContent()
      .then((response) => {
        const { data } = response;
        setCenterContent(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleGetFooterTable = () => {
    getFooterTable()
      .then((response) => {
        const { data } = response;
        setFooterTable(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    handleGetTopCard();
    handleGetCenterContent();
    handleGetFooterTable();
  }, []);

  const { visitData, uploadData, downloadData, progressData } = centerContent;
  return (
    <Fragment>
      <a
        href="https://github.com/hcc960923/react-antd-admin"
        target="_blank"
        rel="noopener noreferrer"
        className="github-logo"
      ></a>
      <TopCard topCard={topCard} />
      <CenterContent
        extraTitle="增长量"
        visitData={visitData}
        uploadData={uploadData}
        downloadData={downloadData}
        progressData={progressData}
      />
      <FooterTable title="学习计划" dataSource={footerTable}></FooterTable>
    </Fragment>
  );
};

export default Home;
