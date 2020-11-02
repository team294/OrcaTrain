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

  constructor(private appService: AppService, private router: Router, private activatedRoute: ActivatedRoute) {}

  showMenu() {
    return this.appService.getShowMenu();
  }

  logout() {
    this.appService.logout();
    this.router.navigate(['/login']);
  }

}
