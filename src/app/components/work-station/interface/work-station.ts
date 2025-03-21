export interface WorkStation {
    dateCreated: string;
    id: string;
    isActive: boolean;
    name: string;
    nameWorkArea: string | null;
    workAreaId: string;
}

export interface SaveWorkStation {
    id: string;
    name: string;
    workAreaId: string;
}
