import React from "react";
import { Button, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, useDisclosure, useToast } from "@chakra-ui/react";
import axios from "axios";

export default function RateRecord({ id }: { id: string }) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Button onClick={onOpen}>قيّم</Button>
            {/* @ts-ignore */}
            <AlertDialog isOpen={isOpen} onClose={onClose} leastDestructiveRef={undefined}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader>قيم هذا الصوت</AlertDialogHeader>
                        <AlertDialogBody>
                            <Rate clipID={id} type="BAD" text="سئ" onClose={onClose} />
                            <Rate clipID={id} type="GOOD" text="لا غٌبار علية" onClose={onClose} />
                            <Rate clipID={id} type="OK" text="مقبول" onClose={onClose} />
                        </AlertDialogBody>
                        <AlertDialogFooter></AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
}

function Rate({ type, onClose, text, clipID }: { type: "GOOD" | "BAD" | "OK"; onClose: () => void; text: string; clipID: string }) {
    const [isLoading, setIsLoading] = React.useState(false);
    const toast = useToast();

    async function doRate() {
        setIsLoading(true);
        try {
            await axios({
                method: "POST",
                url: `/api/rate/${clipID}/append`,
                data: {
                    rate: type === "BAD" ? "0" : type === "GOOD" ? "100" : "50",
                },
            });
            setIsLoading(false);
            onClose();
            toast({
                title: "Rating Submitted",
                description: "Your rating has been submitted successfully.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            setIsLoading(false);
            onClose();
            toast({
                title: "Error",
                description: "An error occurred while submitting the rating.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    }

    return <Button isLoading={isLoading} onClick={doRate}  >text</Button>
}
