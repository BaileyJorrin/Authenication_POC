import { PublicClientApplication } from "@azure/msal-browser";

//Used for setting scope and variables to sync with AzureAD
export const msalConfig = {
  auth: {
    clientId: process.env.REACT_APP_AD_CLIENT_ID,
    authority: process.env.REACT_APP_AD_AUTHORITY, // This is a URL (e.g. https://login.microsoftonline.com/{your tenant ID})
    redirectUri: process.env.REACT_APP_ADURL_STRING,
    postLogoutRedirectUri: process.env.REACT_APP_ADURL_STRING +"/landing",
  },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
};

//Specify which API's can be called
export const protectedEndpoints = {
  demoApi: {
    endpoint: process.env.REACT_APP_API_STRING,
  },
};

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequest = {
  scopes: ["User.Read"],
};


// Add the endpoints here for Microsoft Graph API services you'd like to use.
export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com",
};
