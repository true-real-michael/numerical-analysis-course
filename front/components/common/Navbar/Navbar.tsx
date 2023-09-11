import React from "react";
import styles from "./Navbar.module.scss";
import Link from "next/link";
import { links } from "./links";

const Navbar = () => {
    return (
        <div className={styles.frame}>
            {links.map((link) => (
                <Link key={link.name} href={link.href}>
                    {link.name}
                </Link>
            ))}
        </div>
    );
};

export default Navbar;
