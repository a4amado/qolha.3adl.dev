import { DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";
import axios from "axios";
import { useToggle } from "react-use";

export default function BanUser({ userId, callback }: { userId: string; callback: Function }) {
    const [loading, setLoading] = useToggle(false);

    async function banUser() {
        setLoading(true);
        axios({
            method: "POST",
            url: `/api/user/${userId}/ban`,
        })
            .then(() => {
                setLoading(false);
                callback(userId);
            })
            .catch(() => {
                setLoading(false);
            });
    }

    return (
        <Button danger onClick={banUser} loading={loading}>
            DELETE USER <DeleteOutlined />
        </Button>
    );
}
