import React from "react";

type Props = {
    output: Task2Answer[] | undefined;
    isLoading?: boolean;
};
const Output: React.FC<Props> = ({ output, isLoading }) => {
    return (
        <div>
            {output?.map((elem) => (
                <>{elem.name}</>
            ))}
        </div>
    );
};

export default Output;
