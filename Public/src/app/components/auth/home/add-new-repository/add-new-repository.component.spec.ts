import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewRepositoryComponent } from './add-new-repository.component';

describe('AddNewRepositoryComponent', () => {
  let component: AddNewRepositoryComponent;
  let fixture: ComponentFixture<AddNewRepositoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddNewRepositoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddNewRepositoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
