import React from 'react';
import { 
    Card, 
    message 
} from "antd";
import { 
    StepBackwardOutlined,
    StepForwardOutlined,
    FastBackwardOutlined,
    FastForwardOutlined,
    ShrinkOutlined,
    ArrowsAltOutlined,
    QuestionOutlined,
    QuestionCircleOutlined,
    PlusOutlined,
    PlusCircleOutlined,
    PauseOutlined,
    PauseCircleOutlined,
    EditOutlined,
    FormOutlined,
    CopyOutlined,
    ScissorOutlined,
    DeleteOutlined,
    SnippetsOutlined,
    AreaChartOutlined,
    PieChartOutlined,
    BarChartOutlined,
    DotChartOutlined,
    LineChartOutlined,
    RadarChartOutlined,
    AndroidOutlined,
    AppleOutlined,
    WindowsOutlined,
    IeOutlined,
    ChromeOutlined,
    GithubOutlined,
    AccountBookOutlined,
    AimOutlined,
    AlertOutlined,
    ApartmentOutlined,
    ApiOutlined,
    AppstoreAddOutlined,
    BankOutlined,
    BellOutlined,
    BarsOutlined,
    CloudDownloadOutlined,
    CloudUploadOutlined,
    CommentOutlined,
    ExpandOutlined,
    HeartOutlined,
    MehOutlined,
    ReloadOutlined,
    UserAddOutlined,
    UserDeleteOutlined,
} from "@ant-design/icons";
import copy from 'copy-to-clipboard';


const icons = [
    { key: "UserAddOutlined", value: <UserAddOutlined />},
    { key: "UserDeleteOutlined", value: <UserDeleteOutlined />},
    { key: "BankOutlined", value: <BankOutlined />},
    { key: "BellOutlined", value: <BellOutlined />},
    { key: "BarsOutlined", value: <BarsOutlined />},
    { key: "CloudDownloadOutlined", value: <CloudDownloadOutlined />},
    { key: "CloudUploadOutlined", value: <CloudUploadOutlined />},
    { key: "CommentOutlined", value: <CommentOutlined />},
    { key: "ExpandOutlined", value: <ExpandOutlined />},
    { key: "HeartOutlined", value: <HeartOutlined />},
    { key: "MehOutlined", value: <MehOutlined />},
    { key: "ReloadOutlined", value: <ReloadOutlined />},
    { key: "StepBackwardOutlined", value: <StepBackwardOutlined />},
    { key: "StepForwardOutlined", value: <StepForwardOutlined />},
    { key: "FastBackwardOutlined", value: <FastBackwardOutlined />},
    { key: "FastForwardOutlined", value: <FastForwardOutlined />},
    { key: "ShrinkOutlined", value: <ShrinkOutlined />},
    { key: "ArrowsAltOutlined", value: <ArrowsAltOutlined />},
    { key: "QuestionOutlined", value: <QuestionOutlined />},
    { key: "QuestionCircleOutlined", value: <QuestionCircleOutlined />},
    { key: "PlusOutlined", value: <PlusOutlined />},
    { key: "PlusCircleOutlined", value: <PlusCircleOutlined />},
    { key: "PauseOutlined", value: <PauseOutlined />},
    { key: "PauseCircleOutlined", value: <PauseCircleOutlined />},
    { key: "EditOutlined", value: <EditOutlined />},
    { key: "FormOutlined", value: <FormOutlined />},
    { key: "CopyOutlined", value: <CopyOutlined />},
    { key: "ScissorOutlined", value: <ScissorOutlined />},
    { key: "DeleteOutlined", value: <DeleteOutlined />},
    { key: "SnippetsOutlined", value: <SnippetsOutlined />},
    { key: "AreaChartOutlined", value: <AreaChartOutlined />},
    { key: "PieChartOutlined", value: <PieChartOutlined />},
    { key: "BarChartOutlined", value: <BarChartOutlined />},
    { key: "DotChartOutlined", value: <DotChartOutlined />},
    { key: "LineChartOutlined", value: <LineChartOutlined />},
    { key: "RadarChartOutlined", value: <RadarChartOutlined />},
    { key: "AndroidOutlined", value: <AndroidOutlined />},
    { key: "AppleOutlined", value: <AppleOutlined />},
    { key: "WindowsOutlined", value: <WindowsOutlined />},
    { key: "IeOutlined", value: <IeOutlined />},
    { key: "ChromeOutlined", value: <ChromeOutlined />},
    { key: "GithubOutlined", value: <GithubOutlined />},
    { key: "AccountBookOutlined", value: <AccountBookOutlined />},
    { key: "AimOutlined", value: <AimOutlined />},
    { key: "AlertOutlined", value: <AlertOutlined />},
    { key: "ApartmentOutlined", value: <ApartmentOutlined />},
    { key: "ApiOutlined", value: <ApiOutlined />},
    { key: "AppstoreAddOutlined", value: <AppstoreAddOutlined />},
];

function Icon() {
    const handleCopyToClipboard = (item) => {
        copy(`<${item.key} />`);
        message.success(`<${item.key} />已复制到剪切板！`, 1);
    }
    return (
        <Card title="常用图标">
            <ul className="flex flex-wrap overflow-hidden mx-0 my-3">
                {
                    icons.map((item, index) => (
                        <li 
                            key={index} 
                            onClick={handleCopyToClipboard.bind(this, item)} 
                            className="w-1/6 h-full overflow-hidden text-center justify-center list-none cursor-pointer hover:text-green-500 hover:bg-black">
                            <span className="block mt-3 mx-0 mb-2 text-2xl">{item.value}</span>
                            <span className="block">{item.key}</span>
                        </li>
                    ))
                }
            </ul>
        </Card>
    );
}

export default Icon;