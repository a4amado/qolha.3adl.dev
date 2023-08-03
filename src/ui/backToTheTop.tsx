import { mergeStyles } from "@fluentui/react";
import { Button, Portal } from "@fluentui/react-components";
import { ArrowUp16Regular } from "@fluentui/react-icons";
import React from "react";

const backToTheTopBtnStyles = mergeStyles({
    position: "fixed",
    right: "25px",
    bottom: "25px",
    backgroundColor: "white",
});

export default function GoToUp() {
    return (<Button onClick={() => window.scrollTo({ top: 0, left: 0 })} className={backToTheTopBtnStyles} icon={<ArrowUp16Regular />} />
    );
}
