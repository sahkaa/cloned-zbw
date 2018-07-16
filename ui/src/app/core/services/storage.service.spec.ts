import { StorageService } from './storage.service';

describe('StorageService', () => {

  const service: StorageService = new StorageService();

  const SAMPLE_KEY: string = 'key';
  const SAMPLE_DATA: string = 'data';

  it('should store/remove the data in the correct place / persistent / localStorage available', () => {
    service.localStorageAvailable = true;

    service.setItem(SAMPLE_KEY, SAMPLE_DATA, true);
    expect(service.getItem(SAMPLE_KEY, true)).toBe(SAMPLE_DATA);
    expect(service.getItem(SAMPLE_KEY, false)).toBeNull();

    service.removeItem(SAMPLE_KEY, true);
    expect(service.getItem(SAMPLE_KEY, true)).toBeNull();
    expect(service.getItem(SAMPLE_KEY, false)).toBeNull();
  });

  it('should store/remove the data in the correct place / persistent / localStorage not-available', () => {
    service.localStorageAvailable = false;

    service.setItem(SAMPLE_KEY, SAMPLE_DATA, true);
    expect(service.getItem(SAMPLE_KEY, true)).toBe(SAMPLE_DATA);
    expect(service.getItem(SAMPLE_KEY, false)).toBeNull();

    service.removeItem(SAMPLE_KEY, true);
    expect(service.getItem(SAMPLE_KEY, true)).toBeNull();
    expect(service.getItem(SAMPLE_KEY, false)).toBeNull();
  });

  it('should store/remove the data in the correct place / non-persistent / sessionStorage available', () => {
    service.sessionStorageAvailable = true;

    service.setItem(SAMPLE_KEY, SAMPLE_DATA, false);
    expect(service.getItem(SAMPLE_KEY, false)).toBe(SAMPLE_DATA);
    expect(service.getItem(SAMPLE_KEY, true)).toBeNull();

    service.removeItem(SAMPLE_KEY, false);
    expect(service.getItem(SAMPLE_KEY, true)).toBeNull();
    expect(service.getItem(SAMPLE_KEY, false)).toBeNull();
  });

  it('should store/remove the data in the correct place / non-persistent / sessionStorage not-available', () => {
    service.sessionStorageAvailable = false;

    service.setItem(SAMPLE_KEY, SAMPLE_DATA, false);
    expect(service.getItem(SAMPLE_KEY, false)).toBe(SAMPLE_DATA);
    expect(service.getItem(SAMPLE_KEY, true)).toBeNull();

    service.removeItem(SAMPLE_KEY, false);
    expect(service.getItem(SAMPLE_KEY, true)).toBeNull();
    expect(service.getItem(SAMPLE_KEY, false)).toBeNull();
  });
});
