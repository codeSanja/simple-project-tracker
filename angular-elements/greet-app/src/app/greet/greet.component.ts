import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'tastic-greet',
  templateUrl: './greet.component.html',
  styleUrls: ['./greet.component.sass']
})
export class GreetComponent implements OnInit {
  @Input() name;


  constructor() { }

  ngOnInit() {
  }

}
