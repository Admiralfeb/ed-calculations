const INARA_BASE_URL = 'https://inara.cz';

/**
 * Search Type.
 *
 * If a station, then system station are required.
 */
type InaraSearch =
  | { searchType: 'system'; value: string }
  | { searchType: 'station'; system: string; value: string }
  | { searchType: 'fleetcarrier'; value: string }
  | { searchType: 'minorfaction'; value: string };

/**
 * Builds inara search links for your application.
 *
 * If the search object is malformed, it will return an error.
 *
 *
 *
 * @param search searchType: system|station|fleetcarrier|minorfaction, value, system (only applicable if requesting station)
 * @returns link to inara for search api
 */
export const buildInaraLink = (search: InaraSearch): string => {
  if (search.searchType && search.value) {
    switch (search.searchType) {
      case 'system':
        return `${INARA_BASE_URL}/starsystem/?search=${encodeURIComponent(search.value)}`;
      case 'station':
        if (search.system) {
          return `${INARA_BASE_URL}/station/?search=${encodeURIComponent(
            search.system
          )}%20[${encodeURIComponent(search.value)}]`;
        } else {
          throw new Error('system not defined');
        }
      case 'fleetcarrier':
        return `${INARA_BASE_URL}/station/?search=${encodeURIComponent(search.value)}`;
      case 'minorfaction':
        return `${INARA_BASE_URL}/minorfaction/?search=${encodeURIComponent(search.value)}`;
    }
  } else {
    throw new Error('searchType or value not defined');
  }
};

export default buildInaraLink;
