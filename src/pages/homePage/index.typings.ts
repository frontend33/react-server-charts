export type Deal = {
    id?: string;
    date: Date | string;
    value: number;
}

export interface Deals {
    dealsList: Deal[];
    isNext: boolean;
}
