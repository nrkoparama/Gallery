import React from "react";

interface ToastTypes {
    label: string,
    options: {
        icon?: React.ReactNode,
        description?: string,
        duration?: number
    },
}

export type {ToastTypes};

