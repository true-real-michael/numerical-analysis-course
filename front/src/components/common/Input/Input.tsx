import React, { InputHTMLAttributes } from "react";
import styles from "./Input.module.scss";

type Props = InputHTMLAttributes<HTMLInputElement> & { label: string };
const Input: React.FC<Props> = ({ label, ...props }) => {
    return (
        <div className={`${styles.block} ${props.className}`}>
            <span>{label}</span>
            <input {...props} />
        </div>
    );
};

export default Input;
