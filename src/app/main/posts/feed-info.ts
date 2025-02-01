interface CommentInfo{
    commentid: string;
    commentauthor: string;
    commentbody: string;
    commenttime: Date;
}

export class FeedInfo {
    public img: string;
    public feedid: string;
    public feedauthor: string;
    public feedtext:string;
    public time: any;
    public timestamp: any;
    public comment: CommentInfo[];

    

    constructor(img:string, id: string,name:string, text: string, time: any, timestamp:any, comment){
        this.img = img;
        this.feedid = id;
        this.feedauthor = name;
        this.feedtext = text;
        this.time = time;
        this.timestamp = timestamp;
        this.comment = comment;
        }
        
    }


