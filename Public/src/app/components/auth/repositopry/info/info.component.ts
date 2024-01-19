import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent {
  dynamicSegment: any = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.dynamicSegment = params.get('repositoryName');
      console.log(this.dynamicSegment);
    });
  }
}
