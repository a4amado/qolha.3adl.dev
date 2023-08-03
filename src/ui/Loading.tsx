import React from "react";

import Router from "next/router";
import { Spinner } from "@blueprintjs/core";
import { SpinnerBase, SpinnerSize, mergeStyles } from "@fluentui/react";

const Loading = () => {
    React.useEffect(() => {
        if (!Router.isReady) return;
        const loadingContainer = document.getElementById("loading-container");
        loadingContainer?.classList.add("out-loading");
        setTimeout(() => loadingContainer?.classList.add("hide-loading"), 500);
    }, []);
    return (
        <>
            <div className="active-loading" id="loading-container">
                <div className={mergeStyles({
                    display: "flex",
                    flexDirection: "column",
                    width: "100vw", height: "100vh",
                    alignItems: "center",
                    justifyContent: "center"
                })}>
                    قٌلها
                    <SpinnerBase size={SpinnerSize.large} />
                </div>
            </div>
        </>
    );
};

export default Loading;
