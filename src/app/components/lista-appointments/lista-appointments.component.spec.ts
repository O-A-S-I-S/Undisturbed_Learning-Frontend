import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAppointmentsComponent } from './lista-appointments.component';

describe('ListaAppointmentsComponent', () => {
  let component: ListaAppointmentsComponent;
  let fixture: ComponentFixture<ListaAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaAppointmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
