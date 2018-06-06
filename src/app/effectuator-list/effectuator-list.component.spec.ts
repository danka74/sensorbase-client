import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EffectuatorListComponent } from './effectuator-list.component';

describe('EffectuatorListComponent', () => {
  let component: EffectuatorListComponent;
  let fixture: ComponentFixture<EffectuatorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EffectuatorListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EffectuatorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
