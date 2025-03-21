import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormWorkAreaComponent } from './form-work-area.component';

describe('FormWorkAreaComponent', () => {
  let component: FormWorkAreaComponent;
  let fixture: ComponentFixture<FormWorkAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormWorkAreaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormWorkAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
