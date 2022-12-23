import { Button, Row } from "antd";
import Router from "next/router";
import React from "react";
import Header from "../components/header";
import PageContainer from "../components/PageContainer";
import TargetWord from "../components/TargetWord/TargetWord";
import { GetServerSideProps } from "next/types";
import * as yup from "yup";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (!ctx.query.q && !ctx.query.word) return { props: { home: true } };

  const quertSchema = yup.object().shape({
    q: yup.string().required(),
    word: yup.string().required(),
  });

  try {
    const v = await quertSchema.validate(ctx.query);
  } catch (error: any) {
    const err: yup.ValidationError = error;
    return {
      props: {
        error: true,
        msg: err.message,
      },
    };
  }

  return {
    props: {
      word: true,
      query: ctx.query,
    },
  };
};

export default function Page(props: any) {
  const isHome = !!props.home;
  const isError = !!props.error;
  const isWord = !!props.word;

  return (
    <>
      <Row className="flex flex-col">
        <Header isSearch={true} />
        <PageContainer>
          {isError && <TargetWord word="حدثَ خطاََ ما." />}
          <Row>
            {isHome && "HOME"}
            {isError && "Error"}
            {isWord && "Word"}
          </Row>
        </PageContainer>
      </Row>
    </>
  );
}
