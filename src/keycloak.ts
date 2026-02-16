import Keycloak from 'keycloak-js';

// Configuration for Keycloak
// Update these values to match your Keycloak server details
const keycloakConfig = {
    url: 'http://localhost:8080/',
    realm: 'TestSSO',
    clientId: 'timeoffice',
};

const keycloak = new Keycloak(keycloakConfig);

export default keycloak;
