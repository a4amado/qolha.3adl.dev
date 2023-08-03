import { mergeStyles } from "@fluentui/react";
import { SpinnerIos20Regular } from "@fluentui/react-icons";

export default function LoadingOverlay({ active, icon }: { active: boolean; icon?: any }) {
    return (
        <span
            className={mergeStyles({
                position: "absolute",
                top: 0,
                left: 0,

                width: "100%",
                height: "100%",
                minHeigh: "250px",
                bgcolor: "white",
                zIndex: 4,
                display: active ? "flex" : "none",
                justifyContent: "center",
                alignItems: "center",
            })}
        >
            {icon || <SpinnerIos20Regular /> }
        </span>
    );
}
