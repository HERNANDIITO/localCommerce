import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommerceComponentComponent } from './commerce-component.component';

describe('CommerceComponentComponent', () => {
  let component: CommerceComponentComponent;
  let fixture: ComponentFixture<CommerceComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommerceComponentComponent]
    });
    fixture = TestBed.createComponent(CommerceComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
