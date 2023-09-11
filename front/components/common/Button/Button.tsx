import React, { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.scss";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;
const Button: React.FC<Props> = ({ ...props }) => {
    return (
        <button {...props} className={`${styles.button} ${props.className}`}>
            {props.children}
        </button>
    );
};

export default Button;
