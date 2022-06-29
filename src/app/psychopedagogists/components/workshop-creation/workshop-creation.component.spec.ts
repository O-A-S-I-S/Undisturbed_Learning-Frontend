import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopCreationComponent } from './workshop-creation.component';

describe('WorkshopCreationComponent', () => {
  let component: WorkshopCreationComponent;
  let fixture: ComponentFixture<WorkshopCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkshopCreationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkshopCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
