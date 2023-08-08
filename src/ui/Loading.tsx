import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Spinner, Center, VStack } from "@chakra-ui/react";

const Loading = () => {
    const router = useRouter();

    useEffect(() => {
        if (!router.isReady) return;
        const loadingContainer = document.getElementById("loading-container");
        loadingContainer?.classList.add("out-loading");
        setTimeout(() => loadingContainer?.classList.add("hide-loading"), 500);
    }, [router.isReady]);

    return (
        <div className="active-loading" id="loading-container">
            <Center h="100vh">
                <VStack spacing={4}>
                    <div className="text-center font-bold text-6xl w-full block">قٌلها</div>
                    <Spinner />
                </VStack>
            </Center>
        </div>
    );
};

export default Loading;
