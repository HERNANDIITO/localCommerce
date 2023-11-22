export interface UserInterface {
    _id: string;
    type: string;
    name: string;
    commerce?: string;
}

export interface RegisterUserInterface {
    name: string;
    user: string;
    pass: string;
}
