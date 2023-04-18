import React from "react";
import styles from "./Battle.module.css";

interface Props {
  children: JSX.Element;
}
const AttackDialog = ({ children }: Props) => {
  return <div className={styles.attackDialog}>{children}</div>;
};

export default AttackDialog;
