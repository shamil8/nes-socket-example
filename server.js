const Hapi = require('@hapi/hapi');
const Nes = require('@hapi/nes');

const server = new Hapi.Server({ port: 8001 });

const wsEvents = { // socketEvents
    state: '/FUNDRAISE_STATE',
    swapped: '/FUNDRAISE_SWAPPED',
    claim: '/FUNDRAISE_CLAIM',
    token: '/STAKING_TOKEN',
};

const start = async () => {

    await server.register(Nes);

    Object.values(wsEvents).forEach(e => server.subscription(e));
    console.log('Started Hapi!')

    await server.start();

    setInterval(() => {
        server.publish(wsEvents.state, { id: 5, status: 'complete' });
    }, 5000)
};

start();