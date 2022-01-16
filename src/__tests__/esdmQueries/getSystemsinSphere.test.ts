import { getSystemsinSphere } from 'src/edsmQueries';
import { rest } from 'msw';
import { errorHandlers } from 'src/__mocks__/server/handlers/errorHandlers';
import { server } from 'src/__mocks__/server/server';

describe('getSystemsinSphere', () => {
  it('should call using Arugbal and distance 50 if not given system', async () => {
    server.use(
      rest.get('*', (req, res, ctx) => {
        const systemName = req.url.searchParams.get('systemName');
        const distance = req.url.searchParams.get('radius');

        return res(ctx.status(200), ctx.json([{ name: systemName, distance }]));
      })
    );

    const resp = await getSystemsinSphere();

    expect(resp).toEqual([{ name: 'Arugbal', distance: '50' }]);
  });

  it('should call using the system provided', async () => {
    server.use(
      rest.get('*', (req, res, ctx) => {
        const systemName = req.url.searchParams.get('systemName');
        const distance = req.url.searchParams.get('radius');

        return res(ctx.status(200), ctx.json([{ name: systemName, distance }]));
      })
    );

    const resp = await getSystemsinSphere('Sol');

    expect(resp).toEqual([{ name: 'Sol', distance: '50' }]);
  });

  it('should call using the distance provided', async () => {
    server.use(
      rest.get('*', (req, res, ctx) => {
        const systemName = req.url.searchParams.get('systemName');
        const distance = req.url.searchParams.get('radius');

        return res(ctx.status(200), ctx.json([{ name: systemName, distance }]));
      })
    );

    const resp = await getSystemsinSphere('Sol', 25);

    expect(resp).toEqual([{ name: 'Sol', distance: '25' }]);
  });

  it('should throw an error if a network error occurs', async () => {
    server.use(...errorHandlers);

    expect.assertions(1);
    try {
      await getSystemsinSphere();
    } catch (e) {
      expect(e).toBeTruthy();
    }
  });
});
