import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'tastic-greet',
  templateUrl: './greet.component.html',
  styleUrls: ['./greet.component.sass']
})
export class GreetComponent implements OnInit {
  @Input() name;
  @Output() greet = new EventEmitter()


  constructor() { }

  ngOnInit() {
  }

  greetSubmit() {
    this.greet.emit(`Hi, ${this.name.firstName}`)
    console.log('name ::', this.name)
    this.name = this.name.firstName
  }

}
