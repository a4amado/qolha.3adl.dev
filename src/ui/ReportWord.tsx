import React from "react";
import { ModalBody, useDisclosure } from "@chakra-ui/react";
import { Button, Modal, ModalContent, ModalHeader, ModalFooter, ModalCloseButton, ModalOverlay } from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";

export default function ReportWord({ wordID }: { wordID: string }) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Button onClick={onOpen} leftIcon={<WarningIcon />} variant="solid">
                Report
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} size="md">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>ابلغ عن الكلمة</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <span>ما سبب الابلاغ ؟</span>
                        {/* <Select className="mx-2" defaultValue="اختر سبب الابلاغ" style={{ width: 250 }} options={["كاني", "ماني"].map((e) => ({ value: e, lable: e.toUpperCase() }))}></Select> */}
                    </ModalBody>
                    <ModalFooter>
                        <Button mr={3} onClick={onClose}>
                            إلغاء
                        </Button>
                        <Button colorScheme="blue">إبلاغ</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
