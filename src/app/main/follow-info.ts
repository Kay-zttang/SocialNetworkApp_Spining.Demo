export class FollowInfo {
    public img: string;
    public followname: string;
    public followstatus:string;

    constructor(img:string, name:string, status: string){
        this.img = img;
        this.followname = name;
        this.followstatus = status;
    }
}
