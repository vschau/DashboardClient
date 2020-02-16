import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-session-sales',
  templateUrl: './session-sales.component.html',
  styleUrls: ['./session-sales.component.css']
})
export class SessionSalesComponent implements OnInit {
  calc2Cols = '2 2 calc(10em + 10px);';
  /** 10px is the missing margin of the missing box */
  calc3Cols = '3 3 calc(15em + 20px)';
  /** 20px is the missing margin of the two missing boxes */
  constructor() { }

  ngOnInit() {
  }

}
