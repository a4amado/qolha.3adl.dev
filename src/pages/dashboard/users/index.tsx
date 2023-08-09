import { Search2Icon } from "@chakra-ui/icons";
import { Box, Button, Flex, IconButton, Input, Select, Spacer, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import PageContainer from "@ui/PageContainer";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as yup from "yup"


export default function DashboardUsers() {
    return <PageContainer>

        <Tabs size={"sm"} width={"full"}>
            <TabList display={"flex"}>
                <Tab>Mixed Query</Tab>
                <Tab>Search By Email</Tab>
            </TabList>

            <TabPanels width={"full"}>

                <TabPanel>
                    <Flex width={"full"} overflowX={"auto"} flexDirection={"row"}>
                        <Box>
                            <Select onChange={console.log} size={"xs"} placeholder='filter by role'>
                                <option value='owner'>Owner</option>
                                <option value='admin'>Admin</option>
                                <option value='user'>User</option>
                            </Select>
                        </Box>
                        <Box>
                            <Select onChange={console.log} size={"xs"} placeholder='Order By'>
                                <option value='joining_date'>Joining Date</option>
                                <option value='clips'>Clips</option>
                                <option value='words'>Words</option>

                            </Select>
                        </Box>
                        <Box>
                            <Input size={"xs"} />
                        </Box>
                        <Box>
                            sss
                        </Box>
                        <Box>
                            sss
                        </Box>
                    </Flex>
                </TabPanel>

                <TabPanel>

                    <Formik validationSchema={yup.object().shape({
                        email: yup.string().email().required()
                    })} initialValues={{ email: "" }} onSubmit={console.log}>

                        {(form) => {
                            return <Form >


                                <Flex>
                                    <Flex width={"full"} flexDirection={"column"}>
                                        <Input placeholder="ahmad@ahmad.ahmad" textAlign={"center"} _focusVisible={{}} size={"xs"} as={Field} name="email" />
                                        <Box fontSize={1} as={ErrorMessage} name="email" />
                                    </Flex>
                                    <Spacer />



                                    {/* @ts-ignore */}
                                    <IconButton borderRadius={0} icon={<Search2Icon />} size={"xs"} onClick={form.handleSubmit} />
                                </Flex>

                            </Form>
                        }}

                    </Formik>

                </TabPanel>

            </TabPanels>
        </Tabs>



    </PageContainer>
}