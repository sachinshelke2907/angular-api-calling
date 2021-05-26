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
    @Output() commentList : Comment[] = [];
    url = 'comment.json';

    constructor(private restService : RestServiceCallerService) {}

    ngOnInit() : void {
        this.onLoadComment();
    }

    onSubmit(comment : Comment) : void {
        let result : string;
        this.restService.create(this.url, comment);
    }

    onLoadComment() : void {

        this.restService.fetchAll(this.url).subscribe(posts => {
            this.commentList = posts as Comment[];
            console.log(this.commentList);
        },
        error => {
          console.log(error.message);
        });
    }
}