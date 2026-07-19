import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: Router,
          useValue: { navigate: jasmine.createSpy('navigate') },
        },
      ],
    });

    service = TestBed.inject(AuthService);
    localStorage.clear();
  });

  it('normalizes roles from a base64url JWT payload', () => {
    const payload = JSON.stringify({ role: 'admin' });
    const base64UrlPayload = btoa(payload)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/g, '');
    const token = `header.${base64UrlPayload}.signature`;

    localStorage.setItem('agri-flow-token', token);

    expect(service.getUserRoles()).toEqual(['ADMIN']);
  });
});
