import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService} from './services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'OrcaTrain';

  constructor(private service: AppService, private router: Router, private activatedRoute: ActivatedRoute) {}


}
