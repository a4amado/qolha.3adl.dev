import { Button } from "antd";
import { UpOutlined } from "@ant-design/icons";
import classNames from "classnames";

export default function GoToUp() {
    function goToTop() {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }

    return <Button className={classNames("fixed", "bottom-2", "right-2")} onClick={goToTop} type="default" shape="circle" icon={<UpOutlined />} />;
}
