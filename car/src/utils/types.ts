export interface IBrandItem {
    MasterID: string;
    Name: string;
    CoverPhoto: string;
    Spelling: string;
    tagurl: string;
    newTags: string[];
}

export interface IBrandList {
    letter: string;
    list: IBrandItem[];
}