export type Deal = {
    id: string;
    date: Date;
    value: number;
}

export interface Deals {
    deals: Deal[],
}

