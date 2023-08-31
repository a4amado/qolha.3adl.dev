import PageContainer from "@ui/PageContainer";
import ContributeClip from "@ui/contribute";
import classNames from "classnames";
import { useRouter } from "next/router";

export default function Page() {
    const router = useRouter();
    return (
        <PageContainer contribute={"no"}>
            <div className={classNames("w-96", "mx-auto")}>
                <ContributeClip kind="id" wordId={router.query["wordId"] || ""} afterFunc={() => window.location.replace("/")} />
            </div>
        </PageContainer>
    );
}
