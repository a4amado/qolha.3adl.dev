import { Spin } from "antd"; // Import Ant Design component
import { SpinProps } from "antd/es/spin"; // Import SpinProps type
import { FC } from "react"; // Import FC type

// Define props type
interface LoadingComponentProps extends SpinProps {
    isLoading: boolean;
}

// Define the LoadingComponent as a functional component
const LoadingComponent: FC<LoadingComponentProps> = ({ isLoading, ...rest }) => {
    if (!isLoading) return null; // Return null when not loading

    return (
        <div
            className="absolute flex justify-center items-center top-0 left-0 w-full h-full bg-white z-4"
            {...rest}
        >
            <Spin />
        </div>
    );
};

export default LoadingComponent;
