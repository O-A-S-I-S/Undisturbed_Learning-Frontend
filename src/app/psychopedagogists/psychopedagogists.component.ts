import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-psychopedagogists',
  templateUrl: './psychopedagogists.component.html',
  styleUrls: ['./psychopedagogists.component.css']
})
export class PsychopedagogistsComponent implements OnInit {
  id: number;

  constructor(private route: ActivatedRoute) { 
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
  }

}
