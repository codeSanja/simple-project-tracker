import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'tastic-greet',
  templateUrl: './greet.component.html',
  styleUrls: ['./greet.component.sass']
})
export class GreetComponent implements OnInit {
  @Input() name;
  @Output() greet = new EventEmitter()
  firstName;


  constructor() { }

  ngOnInit() {
  }

  greetSubmit() {
    // this.greet.emit(`Hi, ${this.name.firstName}`)
    console.log('name ::', this)
    // this.name = this.name.firstName

    console.log('Desiralised name ::', JSON.parse(this.name))
    const nameObject = JSON.parse(this.name)
    // this.name =

    console.log('Displae first name: ', nameObject.firstName)
    this.firstName = nameObject.firstName
  }

}
