import { getStationsinSystem } from 'edsmQueries';
import { rest } from 'msw';
import { errorHandlers } from '__mocks__/server/handlers/errorHandlers';
import { server } from '__mocks__/server/server';

describe('getStationsinSystem', () => {
  it('should call using Arugbal if not given system', async () => {
    server.use(
      rest.get('*', (req, res, ctx) => {
        const systemName = req.url.searchParams.get('systemName');

        return res(ctx.status(200), ctx.json({ name: systemName }));
      })
    );

    const resp = await getStationsinSystem();

    expect(resp).toEqual({ name: 'Arugbal' });
  });

  it('should call using the system provided', async () => {
    server.use(
      rest.get('*', (req, res, ctx) => {
        const systemName = req.url.searchParams.get('systemName');

        return res(ctx.status(200), ctx.json({ name: systemName }));
      })
    );

    const resp = await getStationsinSystem('Sol');

    expect(resp).toEqual({ name: 'Sol' });
  });

  it('should throw an error if a network error occurs', async () => {
    server.use(...errorHandlers);

    expect.assertions(1);
    try {
      await getStationsinSystem();
    } catch (e) {
      expect(e).toBeTruthy();
    }
  });
});
