export class FeedInfo {
    public img: string;
    public feedauthor: string;
    public feedtext:string;
    public time: any;
    public timestamp: any;

    constructor(img:string, name:string, text: string, time: any, timestamp:any){
        this.img = img;
        this.feedauthor = name;
        this.feedtext = text;
        this.time = time;
        this.timestamp = timestamp;
    }
}
