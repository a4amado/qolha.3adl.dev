import React, { memo } from "react";

import { Row, Spin } from "antd";
import Router from "next/router";

const Loading = () => {
  React.useEffect(() => {
    const loadingContainer = document.getElementById("loading-container");
    if (Router.isReady) {
      loadingContainer?.classList.add("out-loading");
      setTimeout(() => {
        loadingContainer?.classList.add("hide-loading");
      }, 500);
    }
  }, []);
  return (
    <>
      <div className="active-loading" id="loading-container">
        <Row className="flex flex-col w-screen h-screen align-center justify-center">
          <Row className="text-center font-bold text-6xl w-full block">
            قٌلها
          </Row>
          <Spin />
        </Row>
      </div>
    </>
  );
};

export default Loading
