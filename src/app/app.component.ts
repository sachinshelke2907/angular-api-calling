import { Component, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment.local';
import { Comment } from './models/comment.model';
import { RestServiceCallerService } from './rest-service-caller.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    
    title = environment.title;
    commentList : Comment[] = [];
    url = 'comment.json';

    constructor(private restService : RestServiceCallerService) {}

    ngOnInit() : void {
        this.onLoadComment();
    }

    private add(comment : Comment) {
        this.commentList.push(comment);
    }

    /**
     * This method help use list real time as comment get added
     * 
     * @param rows 
     */
    private addCommentInList(rows : Comment[]) : void {
        
        this.commentList = [];

        for(let row of rows){
            this.add(row);
        }
    }

    /**
     * 
     * @param comment 
     */
    onSubmit(comment : Comment) : void {
        let result : string;
        this.restService.create(this.url, comment);
        this.onLoadComment();
    }

    /**
     * 
     */
    onLoadComment() : void {

        this.restService.fetchAll(this.url).subscribe(comments => {
            this.addCommentInList(comments as Comment[]);
            // this.commentList = posts as Comment[];
            console.log(this.commentList);
        },
        error => {
          console.log(error.message);
        });
    }
}
