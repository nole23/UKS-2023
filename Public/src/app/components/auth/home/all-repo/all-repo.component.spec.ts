import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllRepoComponent } from './all-repo.component';

describe('AllRepoComponent', () => {
  let component: AllRepoComponent;
  let fixture: ComponentFixture<AllRepoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllRepoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllRepoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
