import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormWorkStationComponent } from './form-work-station.component';

describe('FormWorkStationComponent', () => {
  let component: FormWorkStationComponent;
  let fixture: ComponentFixture<FormWorkStationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormWorkStationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormWorkStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
