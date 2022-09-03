import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./index.modules.less"

export default function LinkBtn(props) {

	const { url, title } = props;
	return <div className={styles.linkBtn}>
		<NavLink activeClassName={styles.selected} className={styles.navLink} to={url} {...props}>{ title }</NavLink>
	</div>
}