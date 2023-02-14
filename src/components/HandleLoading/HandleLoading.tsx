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
        return <Spin spinning={true}><fieldset>{children}</fieldset></Spin>;
    }

    if (isDisabled) {
        return <fieldset disabled={true}>{children}</fieldset>;
    }
    return <>{children}</>;
}
