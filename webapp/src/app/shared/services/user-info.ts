export interface UserInfo {
    uid: string;
    teamID: undefined | number
    playerFirstName: undefined | string;
    playerLastName: undefined | string;
    playerName: undefined | string;
    teamName: undefined | string;
    playerRegion: undefined | string;
}


export interface UserInfoResponse {
    name?: string;
    id?: number;
    player_first_name?: string;
    player_last_name?: string;
    player_name?: string;
    player_region_name?: string;
}


export interface LeagueData {
    leagueName: string;
    rank: number;
    leagueMode: string;
}

export interface UserLeague {
    code: string;
    rank: number;
}

