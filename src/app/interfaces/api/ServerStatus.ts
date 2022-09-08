export interface ServerStatus {
    HTTPCode?: number,
    QueryTimestamp: number,
    ResponseTime?: number,
    Status: string,
}

export type Servers = {[key: string]: {[key: string]: ServerStatus}}
