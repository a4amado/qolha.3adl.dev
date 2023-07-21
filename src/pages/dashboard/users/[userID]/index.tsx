import dynamic from "next/dynamic";
import { useRouter } from "next/router";

// @ts-ignore
const DynamicPage = dynamic(() => import("../index").then((module) => module.default));

export default function Home() {
    const router = useRouter();

    // @ts-ignore
    return <DynamicPage userID={router.query.userID} />;
}
