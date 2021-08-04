import { Component } from '@angular/core';
import { ClassServiceAuth } from '../Shared/autorize.service';

@Component({
  selector: 'navbarcmp',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class ClassNavbarComponent {
  title = 'Crunchy-Royal-Pizza';
  constructor(public auth:ClassServiceAuth) {
        
  }
}
