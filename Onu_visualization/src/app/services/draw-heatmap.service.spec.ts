import { TestBed } from '@angular/core/testing';

import { DrawHeatmapService } from './draw-heatmap.service';

describe('DrawHeatmapService', () => {
  let service: DrawHeatmapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DrawHeatmapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
