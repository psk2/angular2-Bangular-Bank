import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-circular',
  templateUrl: './circular.component.html',
  styleUrls: ['./circular.component.css']
})
export class CircularComponent implements OnInit { 
  public happyText = "I love you";
  public ToLoop = [
    'dfajfakdfj',
    'dfajfakdfj',
    'dfajfakdfj'
  ];
  constructor() { }

  ngOnInit() {
    this.happyText = "i miss you";
  }
  makemehappier(){
    this.happyText = "you are mine";
  }

}
