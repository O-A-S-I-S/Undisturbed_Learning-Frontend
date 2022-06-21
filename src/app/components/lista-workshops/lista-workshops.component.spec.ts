import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaWorkshopsComponent } from './lista-workshops.component';

describe('ListaWorkshopsComponent', () => {
  let component: ListaWorkshopsComponent;
  let fixture: ComponentFixture<ListaWorkshopsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaWorkshopsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaWorkshopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
