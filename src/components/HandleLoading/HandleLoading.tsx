import { Col, Spin } from "antd";
import React, { PropsWithChildren } from "react";

export default function HandleLoading({
  isLoading,
  isError,
  isDisabled,
  children,
}: PropsWithChildren & {
  isLoading?: boolean;
  isError?: boolean;
  isDisabled?: boolean;
}): React.ReactElement {
  if (isLoading) {
    return (
      <Spin spinning={true} className="w-full flex gap-4 flex-col">
        <fieldset className="w-full flex gap-4 flex-col">{children}</fieldset>
      </Spin>
    );
  }

  if (isDisabled) {
    return (
      <fieldset className="w-full flex gap-4 flex-col" disabled={true}>
        {children}
      </fieldset>
    );
  }
  return <>{children}</>;
}
