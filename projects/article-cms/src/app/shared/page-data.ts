import { Article } from './article';

export interface PageData {
    current_page?: number;
    data?: Article[];
    first_page_url?: string;
    from?: string;
    last_page?: number;
    last_page_url?: string;
    links?: Link[];
    next_page_url?: string;
    path?: string;
    per_page?: number;
    prev_page_url?: string;
    to?: number;
    total?: number;
}

export interface Link {
    url?: string;
    label?: string | number;
    active?: boolean;
}