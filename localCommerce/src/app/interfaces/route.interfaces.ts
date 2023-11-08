export interface RouteInterface {
    url?: string;
    label: string;
    isPublic: boolean;
    subsections?: RouteInterface[];
}


