
import { Button } from "@blueprintjs/core";
import React from "react";
 
export default function GoToUp() {
    function gotToUp() {
        window.scrollTo({ top: 0, left: 0 });
    }

    return (
        <Button onClick={gotToUp} className="fixed right-2 bottom-2 bg-white " icon="arrow-up" />
    );
}
