export interface ScrollSpyItemOptions {
    el: HTMLElement;
    callback: () => void;
    offset?: number;
    reference?: ScrollSpyItemReference;
}
export declare type ScrollSpyItemReference = "top" | "bottom";
export declare type ScrollSpyCallback = () => void;
export interface ScrollSpyItem extends ScrollSpyItemOptions {
    offset: number;
    reference: ScrollSpyItemReference;
    pos: number;
}
export declare function clean(): void;
export declare function getItems(): readonly (Readonly<ScrollSpyItem>)[];
export declare function add(param: ScrollSpyItemOptions): void;
export declare function debug(): ScrollSpyItem[];
//# sourceMappingURL=scrollspy.d.ts.map