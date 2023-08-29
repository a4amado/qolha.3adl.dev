import { Flex, FlexProps, Spinner } from "@chakra-ui/react";

export default function LoadingComponent({
    isLoading,
    ...rest
}: {
    isLoading: boolean;
} & FlexProps) {
    if (!isLoading) return <></>
    return (
        <Flex {...rest} position="absolute" justifyContent={"center"} alignItems={"center"} top={0} left={0} width="100%" height="100%" bgColor="white" zIndex={4} >
            <Spinner />
        </Flex>
    );
}
