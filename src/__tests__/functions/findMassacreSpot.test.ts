import { massacreQueryProgress, findMassacreSpot } from 'functions/findMassacreSpot';
import { errorHandlers } from '__mocks__/server/handlers/errorHandlers';
import { server } from '__mocks__/server/server';

describe('findMassacreSpot', () => {
  it.todo('should return with massacre possibilities');

  it('should throw an error if a network error occurs', async () => {
    server.use(...errorHandlers);

    expect.assertions(1);
    try {
      await findMassacreSpot();
    } catch (e) {
      expect(e).toBeTruthy();
    }
  });
});
