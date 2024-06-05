"use client";
import React, { useEffect, useState } from "react";
import styles from "./Modal.module.css";
import IconBase from "../icons/IconBase";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  size?:
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "full";
  body: React.ReactNode;
  footer?: React.ReactNode;
  isClosable?: boolean;
}

export default function Modal({
  isOpen,
  onClose,
  size = "md",
  body,
  footer,
  isClosable = true,
}: ModalProps) {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    } else {
      document.removeEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);
  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget && isClosable) {
      onClose();
    }
  };

  const closeModal = () => {
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className={styles.overlay} onClick={handleOverlayClick}>
          <div className={`${styles.modal} ${styles[`modal-${size}`]}`}>
            {isClosable && (
              <button className={styles.close} onClick={closeModal}>
                <IconBase slug="icon-close" />
              </button>
            )}
            <div className={styles.body}>{body}</div>
            {footer && <div className={styles.footer}>{footer}</div>}
          </div>
        </div>
      )}
    </>
  );
}
