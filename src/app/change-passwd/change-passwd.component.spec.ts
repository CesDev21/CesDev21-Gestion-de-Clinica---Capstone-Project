import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswdComponent } from './change-passwd.component';

describe('ChangePasswdComponent', () => {
  let component: ChangePasswdComponent;
  let fixture: ComponentFixture<ChangePasswdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangePasswdComponent]
    });
    fixture = TestBed.createComponent(ChangePasswdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
