import { Typography } from "antd";

export default function Home() {
    return (
        <>
            <Typography.Title className="!text-4xl !sm:text-5xl !md:text-6xl !lg:text-7xl block w-full">قُلها</Typography.Title>

            <Typography.Paragraph className="block w-full">قاموس صوتي للكلمات العربية</Typography.Paragraph>

            <Typography.Text className="block w-full">كيف بدئنا ؟</Typography.Text>

            <Typography.Text className="block w-full">لما رأيت معناة أصدقائي الاجانب في تعلم العربية خاصة عندما يتعبق الامر بالنطق قررت أن ابني هذا الموقع لتسهيل الامر عليهم،</Typography.Text>

            <Typography.Text className="block w-full">
                كيف تساعدنا ؟
                <Typography.Text className="block w-full">
                    إذا أردت مساعدتنا عن طريق المساهمة في نطق الكلمات <Typography.Link href="/contribute">إضغط هُنا</Typography.Link>
                </Typography.Text>
            </Typography.Text>
        </>
    );
}
