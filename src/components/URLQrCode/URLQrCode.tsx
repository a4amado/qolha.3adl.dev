import { QRCode, Row } from "antd";
import { memo } from "react";

function URLQrCode() {
  return <QRCode size={80} value={typeof window != "undefined" ? window.location.href : "Placeholder"} />;
}

export default memo(URLQrCode);
