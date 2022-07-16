import React, { Fragment, useState, useEffect  }from 'react';
import TopCard from "./TopCard";
import CenterContent from "./CenterContent";
import FooterTable from "./FooterTable";


function Dashboard() {
  const [topCard, setTopCard] = useState([]);
  const [centerContent, setCenterContent] = useState([]);
  const [footerTable, setFooterTable] = useState([]);
  const { $http } = React;

  const getTopCard = () => {
    $http.get('/dashboard/getTopCard')
        .then(response => {
          const { data } = response;
          setTopCard(data);
        })
        .catch(error => {
          console.log(error);
        });
  }
  const getCenterContent = () => {
    $http.get('/dashboard/getCenterContent')
        .then(response => {
          const { data } = response;
          setCenterContent(data);
        })
        .catch(error => {
          console.log(error);
        });
  }
  const getFooterTable = () => {
    $http.get('/dashboard/getFooterTable')
        .then(response => {
          const { data } = response;
          setFooterTable(data);
        })
        .catch(error => {
          console.log(error);
        });
  }
  useEffect(() => { 
    getTopCard();
    getCenterContent();
    getFooterTable();
  }, []);
  
  const { visitData, uploadData, downloadData, progressData } = centerContent;
  return (  
    <Fragment>
      <TopCard
        topCard={topCard}
      />
      <CenterContent
        extraTitle="增长量"
        visitData={visitData}
        uploadData={uploadData}
        downloadData={downloadData}
        progressData={progressData}
      />
      <FooterTable
          title="学习计划"
          dataSource={footerTable}>
      </FooterTable>
    </Fragment>
  );
}

export default Dashboard;