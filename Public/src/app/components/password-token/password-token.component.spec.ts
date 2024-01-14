import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordTokenComponent } from './password-token.component';

describe('PasswordTokenComponent', () => {
  let component: PasswordTokenComponent;
  let fixture: ComponentFixture<PasswordTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasswordTokenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PasswordTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
