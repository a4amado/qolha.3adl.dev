import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Select, Space, Tabs } from "antd";
import PageContainer from "@ui/PageContainer";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as yup from "yup";

const { TabPane } = Tabs;

export default function DashboardUsers() {
    return (
        <PageContainer>
            <Tabs size="small" tabBarGutter={20} style={{ width: "100%" }}>
                <TabPane tab="Mixed Query" key="mixedQuery">
                    <Space size={10}>
                        <Select onChange={console.log} size="small" placeholder="Filter by role">
                            <Select.Option value="owner">Owner</Select.Option>
                            <Select.Option value="admin">Admin</Select.Option>
                            <Select.Option value="user">User</Select.Option>
                        </Select>
                        <Select onChange={console.log} size="small" placeholder="Order by">
                            <Select.Option value="joining_date">Joining Date</Select.Option>
                            <Select.Option value="clips">Clips</Select.Option>
                            <Select.Option value="words">Words</Select.Option>
                        </Select>
                        <Input size="small" />
                        <div className="hidden">sss</div>
                        <div className="hidden">sss</div>
                    </Space>
                </TabPane>

                <TabPane tab="Search By Email" key="searchByEmail">
                    <Formik
                        validationSchema={yup.object().shape({
                            email: yup.string().email().required(),
                        })}
                        initialValues={{ email: "" }}
                        onSubmit={console.log}
                    >
                        {(form) => (
                            <Form>
                                <Space>
                                    <div className="w-full">
                                        <Field name="email">
                                            {({ field }) => (
                                                <Input
                                                    {...field}
                                                    placeholder="ahmad@ahmad.ahmad"
                                                    className="text-center"
                                                    size="small"
                                                    bordered={false}
                                                />
                                            )}
                                        </Field>
                                        <ErrorMessage name="email" />
                                    </div>
                                    <Button
                                        type="primary"
                                        icon={<SearchOutlined />}
                                        size="small"
                                        onClick={form.handleSubmit}
                                        style={{ borderRadius: 0 }}
                                    />
                                </Space>
                            </Form>
                        )}
                    </Formik>
                </TabPane>
            </Tabs>
        </PageContainer>
    );
}
