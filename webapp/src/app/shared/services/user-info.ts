export interface UserInfo {
    uid: string;
    teamID: null | number
    playerFirstName: null | string;
    playerLastName: null | string;
    playerName: null | string;
    teamName: null | string;
    managerRegion: null | string;
}


export interface UserInfoSession {
    name: string;
    player_first_name: string;
    player_last_name: string;
    player_name: string;
    id: number;
}