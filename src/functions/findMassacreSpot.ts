import { BehaviorSubject } from 'rxjs';
import {
  getBodiesinSystem,
  getFactionsinSystem,
  getSystemsinSphere,
  IPossibility,
  ISphereSystem,
} from 'edsmQueries';

/**
 * Progress message that can be subscribed to for the `findMassacreSpot` function.
 */
const massacreQueryProgress = new BehaviorSubject('');

/**
 * Using the systemName as the origin point, this function searches the range for a possible massacre spot.
 *
 * "Massacre spot" in this context is a system with a hazrez that has at least one populated system within 10 lightyears.
 *
 * If you wish to see progress messages, `massacreQueryProgress` is available for subscription
 *
 * @param systemName
 * @param range
 * @returns
 */
const findMassacreSpot = async (systemName = 'Bibaridji', range = 50) => {
  massacreQueryProgress.next('Retrieving Systems');
  let systemList = await getSystemsinSphere(systemName, range);
  systemList = systemList.filter((s) => Object.keys(s.information).length !== 0);

  massacreQueryProgress.next(`Retrieving Body Information for ${systemList.length} systems`);
  systemList = await getSystemswithRings(systemList);

  massacreQueryProgress.next(`Retrieving Faction Information for ${systemList.length} systems`);
  systemList = await getSystemswithAnarchyFaction(systemList);

  const possibilities = await finalizePossibilities(systemList);

  massacreQueryProgress.next(
    `Process complete: ${possibilities.length} Possible Massacre Systems.`
  );
  return JSON.stringify(possibilities);
};

const getSystemswithRings = async (systemList: ISphereSystem[]) => {
  // wanted to do a reduce here, but async await makes that difficult.
  let hasRingsList: ISphereSystem[] = [];
  for (const system of systemList) {
    const systemBodyList = await getBodiesinSystem(system.name);
    const systemBodies = systemBodyList.bodies;
    const bodieswithRings = systemBodies.filter((v) => v.rings);
    if (bodieswithRings.length > 0) {
      hasRingsList = [...hasRingsList, system];
    }
  }
  return hasRingsList;
};

const getSystemswithAnarchyFaction = async (systemList: ISphereSystem[]) => {
  let hasAnarchyList: ISphereSystem[] = [];
  for (const system of systemList) {
    const systemFactionInfo = await getFactionsinSystem(system.name);
    if (systemFactionInfo.factions?.length > 0) {
      for (const faction of systemFactionInfo.factions) {
        if (faction.government.toLowerCase() === 'anarchy') {
          hasAnarchyList = [...hasAnarchyList, system];
        }
      }
    }
  }
  return hasAnarchyList;
};

const finalizePossibilities = async (systemList: ISphereSystem[]) => {
  let possibilities: IPossibility[] = [];
  for (const [i, system] of systemList.entries()) {
    massacreQueryProgress.next(
      `Checking for populated systems. ${i} of ${systemList.length}. System: ${system.name}`
    );
    const closeSystems = await getPopulatedSystemswithin10LY(system);
    if (closeSystems.length > 0) {
      const sysName = system.name;
      const dis = system.distance;
      const closeSys = closeSystems.map((v) => v.name);
      possibilities = [
        ...possibilities,
        { systemName: sysName, distance: dis, missionSystems: closeSys },
      ];
    }
  }
  return possibilities;
};

const getPopulatedSystemswithin10LY = async (system: ISphereSystem) => {
  let closeSystems: ISphereSystem[] = await getSystemsinSphere(system.name, 10);
  closeSystems = closeSystems.filter((v) => Object.keys(v.information).length !== 0);
  closeSystems = closeSystems.filter((v) => v.information.population > 100);
  return closeSystems;
};

export { findMassacreSpot, massacreQueryProgress };

export default findMassacreSpot;
