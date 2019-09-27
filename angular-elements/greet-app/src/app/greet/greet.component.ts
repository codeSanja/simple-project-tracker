import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'tastic-greet',
  templateUrl: './greet.component.html',
  styleUrls: ['./greet.component.sass']
})
export class GreetComponent implements OnInit {
  @Input() firstName;
  @Output() greet = new EventEmitter()
  name

  constructor() { }

  ngOnInit() {

    console.log('ngOnInit ::', this)

    this.firstName = this.firstName

  }

  greetSubmit(firstName) {
    console.log('greetSubmit :: firstName', firstName)

    this.greet.next(firstName)
  }

}
