import React from "react";
import {Post} from "@/types/Post";
import {Blog} from "@/types/Blog";

type PaginationAction = { type?: string, value?: number };
type PaginationProps = { items: Post[] | Blog[] } & React.HTMLAttributes<HTMLDivElement>

export type {PaginationAction, PaginationProps};