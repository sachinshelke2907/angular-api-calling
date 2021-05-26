import { Component, OnInit } from '@angular/core';
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

    constructor(private restService : RestServiceCallerService) {}

    ngOnInit() : void {

        let url = 'comment.json';
        const comment : Comment = {
            id : '1',
            description : 'Test Description'
        }

        let result : string;

        this.restService.create(url, comment, result);
    }
}
