import { PropsWithChildren } from "react";

export default function PageContainer(props: PropsWithChildren) {
    return <div className="block mx-auto w-full max-w-4xl px-4 py-2">{props.children}</div>;
}
