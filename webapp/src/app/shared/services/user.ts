export interface User {
    uid: string;
    email: string;
    emailVerified: boolean;
    managerName: string | null;
    teamName: string | null;
    teamID: number | null;
 }