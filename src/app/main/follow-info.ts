export class FollowInfo {
    public followid:number;
    public img: string;
    public followname: string;
    public followstatus:string;

    constructor(id:number, img:string, name:string, status: string){
        this.followid = id;
        this.img = img;
        this.followname = name;
        this.followstatus = status;
    }
}
