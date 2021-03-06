import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { JwtService } from './jwt.service';
import { PaAccountApiService } from './pa-account-api.service';
import { PaDataService } from './padata.service';
import { ProgramsServiceApiService } from './programs-service-api.service';

describe('PaDataService', () => {
  const mockJwtService = jasmine.createSpyObj('JwtService', {
    getToken: () => '',
  });

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: PaAccountApiService,
        },
        {
          provide: ProgramsServiceApiService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }),
  );

  it('should create', () => {
    const service: PaDataService = TestBed.get(PaDataService);
    expect(service).toBeTruthy();
  });
});
