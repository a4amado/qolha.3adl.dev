import { Popover, Col, Collapse } from "antd";
import { memo } from "react";
import { useToggle } from "react-use";

const { Panel } = Collapse
function AudioElement({ url, key}: { url: string, key: string }) {
    
    return  <p>{url}</p>
}

export default memo(AudioElement)