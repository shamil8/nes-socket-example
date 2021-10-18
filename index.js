const Nes = require('@hapi/nes');

const wsEvents = { // socketEvents
    state: '/FUNDRAISE_STATE',
    swapped: '/FUNDRAISE_SWAPPED',
    claim: '/FUNDRAISE_CLAIM',
    token: '/STAKING_TOKEN',
};

// const client = new Nes.Client('wss://develop-samurai.cyberfi.tech/api');
const client = new Nes.Client('ws://localhost:8001');

const start = async () => {
    await client.connect();

    for (const e of Object.values(wsEvents)) {
        client.subscribe(e, (data) => {
            console.log(e, ' | ', data)
        })
    }
};

start();
