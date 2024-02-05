import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PullRequestesComponent } from './pull-requestes.component';

describe('PullRequestesComponent', () => {
  let component: PullRequestesComponent;
  let fixture: ComponentFixture<PullRequestesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PullRequestesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PullRequestesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
