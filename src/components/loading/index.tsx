import type { AnimationControls, Variants } from "framer-motion";
import { motion, useAnimationControls } from "framer-motion";
import Router from "next/router";
import React, { memo } from "react";
import { useFirstMountState } from "react-use";

import { Row, Spin } from "antd";

const variants: Variants = {
  active: {
    position: "fixed",
    width: "100%",
    height: "100%",
    top: "0",
    left: "0",
    zIndex: 500000,
    backgroundColor: "white",
    display: "block",
    opacity: 1,
  },
  hide: {
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },

    opacity: 0,
  },
  out: {
    display: "none",
  },
};

const Loading = () => {
  const isFirstMount = useFirstMountState();
  const controle: AnimationControls = useAnimationControls();

  const H = () => controle.start("hide").then(() => controle.start("out"));

  React.useEffect(() => {
    if (isFirstMount && Router.isReady) H();
  }, []);

  Router.events.on("routeChangeStart", () => controle.start("active"));
  Router.events.on("routeChangeComplete", H);

  return (
    <>
      <motion.div variants={variants} animate={controle} initial="active">
        <Row className="flex flex-col w-screen h-screen align-center justify-center">
          <Row className="text-center font-bold text-6xl w-full block">
            قٌلها
          </Row>
          <Spin />
        </Row>
      </motion.div>
    </>
  );
};

export default memo(Loading);
