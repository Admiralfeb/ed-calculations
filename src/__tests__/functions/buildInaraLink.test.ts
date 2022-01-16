import { buildInaraLink } from 'functions/buildInaraLink';

describe('Build Inara Link', () => {
  it('should build a system', () => {
    const response = buildInaraLink({ searchType: 'system', value: 'HIP 4120' });
    expect(response).toEqual('https://inara.cz/starsystem/?search=HIP%204120');
  });

  it('should build a station', () => {
    const response = buildInaraLink({
      searchType: 'station',
      system: 'Arugbal',
      value: 'Meaney Dock',
    });
    expect(response).toEqual('https://inara.cz/station/?search=Arugbal%20[Meaney%20Dock]');
  });

  it('should build a fleet carrier', () => {
    const response = buildInaraLink({ searchType: 'fleetcarrier', value: 'HYZ-321' });
    expect(response).toEqual('https://inara.cz/station/?search=HYZ-321');
  });

  it('should build a faction', () => {
    const response = buildInaraLink({
      searchType: 'minorfaction',
      value: 'United Systems Cooperative',
    });
    expect(response).toEqual(
      'https://inara.cz/minorfaction/?search=United%20Systems%20Cooperative'
    );
  });
});
