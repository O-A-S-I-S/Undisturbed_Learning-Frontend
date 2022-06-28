import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateworkshopComponent } from './createworkshop.component';

describe('CreateworkshopComponent', () => {
  let component: CreateworkshopComponent;
  let fixture: ComponentFixture<CreateworkshopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateworkshopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateworkshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
