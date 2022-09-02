import React, { useState } from "react";
import { useIntl } from "react-intl";
import { Space, Input, Button } from "antd";
import QRCode from "qrcode";
import SpinCard from "@/components/SpinCard";

const QrCode = () => {
  const [spinning, setSpinning] = useState(false);
  const [url, setUrl] = useState("https://juejin.cn/");
  const [qr, setQr] = useState("");
  const intl = useIntl();
  const formatMessage = (id: string): string => {
    return intl.formatMessage({ id });
  };
  const generateQRCode = () => {
    setSpinning(true);
    QRCode.toDataURL(url, { scale: 8, margin: 0 })
      .then((data) => {
        setQr(data);
      })
      .catch((error) => {
        console.log(error);
        formatMessage("module.qrcode.generate_error");
      })
      .finally(() => {
        setSpinning(false);
      });
  };
  return (
    <SpinCard spinning={spinning} title={formatMessage("module.qrcode.title")}>
      <Space>
        <Input
          className="w-64"
          placeholder={formatMessage("module.qrcode.placeholder")}
          onChange={(event) => setUrl(event.target.value)}
        />
        <Button type="primary" onClick={generateQRCode}>
          {formatMessage("module.qrcode.generate")}
        </Button>
      </Space>
      <div className="mt-8">
        {qr && (
          <Space>
            <img src={qr} width="200" />
            <Button type="link" href={qr} download="qrcode.png">
              Download
            </Button>
          </Space>
        )}
      </div>
    </SpinCard>
  );
};

export default QrCode;
