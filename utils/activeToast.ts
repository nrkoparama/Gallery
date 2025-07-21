import React from "react";
import {toast} from "sonner";

interface optionsType {
    icon?: React.ReactNode,
    duration?: number,
    description?: string
}

export const setToast = (label: string, options: optionsType) => {
    toast(label, options)
}

