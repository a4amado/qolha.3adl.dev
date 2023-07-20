import React  from "react";

 import Router from "next/router";
import { Spinner } from "@blueprintjs/core";

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
                <div className="flex flex-col w-screen h-screen align-center justify-center">
                    <div className="text-center font-bold text-6xl w-full block">قٌلها</div>
                    <Spinner  />
                </div>
            </div>
        </>
    );
};

export default Loading;
