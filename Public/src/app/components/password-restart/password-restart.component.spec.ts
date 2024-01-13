import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordRestartComponent } from './password-restart.component';

describe('PasswordRestartComponent', () => {
  let component: PasswordRestartComponent;
  let fixture: ComponentFixture<PasswordRestartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasswordRestartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PasswordRestartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
