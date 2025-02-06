import {FC} from "react";
import headerStyles from "../styles/Header.module.css";

const Header: FC = () => {
    return (
        <header className={headerStyles.header}>
            <section className={headerStyles.verticalSpaceContainer}>
            <div className="header-text">Medvedev Yaroslav</div>
            <div className="header-text">Group P3212</div>
            <div className="header-text">Variant 12082</div>
            </section>
        </header>
    );
};

export default Header;