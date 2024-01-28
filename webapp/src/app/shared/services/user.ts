export interface User {
    uid: string;
    email: string;
    displayName: string;
    teamID: number | null;
    emailVerified: boolean;
 }