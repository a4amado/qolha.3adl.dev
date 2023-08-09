import { IconButton } from "@chakra-ui/react";
import { ArrowUpIcon } from "@chakra-ui/icons";

export default function GoToUp() {
    function goToTop() {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }

    return <IconButton onClick={goToTop} position={"fixed"} right={"10px"} bottom={"10px"} bgColor={"white"} aria-label="Go to Top" icon={<ArrowUpIcon />} />;
}
