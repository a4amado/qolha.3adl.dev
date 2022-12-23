import { Typography, Row } from "antd";

export default function TargetWord({ word }: { word: string }) {
  return (
    <Row>
      <Typography.Title
        style={{ fontFamily: "'Amiri Quran', serif" }}
        className="text-4xl xs:text-4xl md:text-6xl font-medium h-auto"
        itemType=""
      >
        {word}
      </Typography.Title>
    </Row>
  );
}
