import styles from "./ProgressBar.module.css";
import gStyle from "@/styles/GlobalConstants";
interface ProgressBarProps {
  totalSpace: number; // Total space available
  usedSpace: number; // Used space
}

export default function ProgressBar({
  totalSpace,
  usedSpace,
}: ProgressBarProps) {
  const calculatePercentage = (
    usedSpace: number,
    totalSpace: number
  ): string => {
    return ((usedSpace / totalSpace) * 100).toFixed(2) + "%";
  };
  return (
    <div
      className={styles.progress}
      style={{
        marginTop: `${gStyle.margin.sm}`,
        marginBottom: `${gStyle.margin.sm}`,
        backgroundImage: `linear-gradient(
            90deg,
            hsla(0, 0%, 95%, 1) 0%,
            hsla(0, 0%, 95%, 1) 10%,
            transparent 10%,
            transparent 50%,
            hsla(0, 0%, 95%, 1) 50%,
            hsla(0, 0%, 95%, 1) 60%,
            transparent 60%,
            transparent 100%
        )
        `,
        backgroundSize: "20px",
        backgroundColor: gStyle.color.primaryCyan,
      }}
    >
      <div
        className={`${styles.progressBar}`}
        style={{
          backgroundImage: `linear-gradient(
            90deg,
            hsla(0, 0%, 95%, 1) 0%,
            hsla(0, 0%, 95%, 1) 10%,
            transparent 10%,
            transparent 50%,
            hsla(0, 0%, 95%, 1) 50%,
            hsla(0, 0%, 95%, 1) 60%,
            transparent 60%,
            transparent 100%
        )
        `,
          backgroundSize: "20px",
          backgroundColor: gStyle.color.secondaryCyan,
          width: `${calculatePercentage(usedSpace, totalSpace)}`,
        }}
      ></div>
    </div>
  );
}
