export interface Auth {
    userName: string;
    password: string;
}

export interface ResponseAuth {
    expiration: string;
    token: string;
}