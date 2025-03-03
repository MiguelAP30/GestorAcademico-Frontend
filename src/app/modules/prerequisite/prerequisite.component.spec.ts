import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrerequisiteComponent } from './prerequisite.component';

describe('PrerequisiteComponent', () => {
  let component: PrerequisiteComponent;
  let fixture: ComponentFixture<PrerequisiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrerequisiteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrerequisiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
