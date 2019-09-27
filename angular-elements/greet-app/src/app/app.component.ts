import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'greet-app';

  addGreeter() {
    const container = document.getElementById('container')
    container.innerHTML = '<app-greet></app-greet>'
  }
}
