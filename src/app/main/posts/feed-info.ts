export class FeedInfo {
    public img: string;
    public feedid: string;
    public feedauthor: string;
    public feedtext:string;
    public time: any;
    public timestamp: any;
    public comment: object;

    constructor(img:string, id: string,name:string, text: string, time: any, timestamp:any, comment:object){
        this.img = img;
        this.feedid = id;
        this.feedauthor = name;
        this.feedtext = text;
        this.time = time;
        this.timestamp = timestamp;
        this.comment = comment;
    }
}
