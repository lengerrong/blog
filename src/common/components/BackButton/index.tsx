import * as React from "react"
import * as styles from "./style.css"

export interface BackButtonProps {
    canGoBack: boolean;
    onClick: (e: any) => void;
}

const BackButton = ({canGoBack, onClick}: BackButtonProps) => <div className={styles.button}>back button</div>

export default BackButton
