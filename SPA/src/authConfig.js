/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { LogLevel } from "@azure/msal-browser";

/**
 * Configuration object to be passed to MSAL instance on creation.
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
 */
export const msalConfig = {
    auth: {
        clientId: "b6b2e02c-f735-4f3d-8d86-00cd38dbce5d", // This is the ONLY mandatory field that you need to supply.
        authority: "https://login.microsoftonline.com/e7f89a1d-fe56-40d4-b537-7214a027bf18", // Defaults to "https://login.microsoftonline.com/common"
        redirectUri: "http://localhost:3000", // You must register this URI on Azure Portal/App Registration. Defaults to window.location.origin
        postLogoutRedirectUri: "/", // Indicates the page to navigate after logout.
        clientCapabilities: ["CP1"] // this lets the resource owner know that this client is capable of handling claims challenge.
    },
    cache: {
        cacheLocation: "localStorage", // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
    system: {
        loggerOptions: {
            /**
             * Below you can configure MSAL.js logs. For more information, visit:
             * https://docs.microsoft.com/azure/active-directory/develop/msal-logging-js
             */
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                }
            }
        }
    }
};

/**
 * Add here the endpoints and scopes when obtaining an access token for protected web APIs. For more information, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
export const protectedResources = {
    apiTodoList: {
        endpoint: "http://localhost:5000/api/todolist",
        scopes: {
            read: [ "api://b6b2e02c-f735-4f3d-8d86-00cd38dbce5d/Todolist.Read" ],
            write: [ "api://b6b2e02c-f735-4f3d-8d86-00cd38dbce5d/Todolist.ReadWrite" ]
        }
    },
    Projects: {
        endpoint: "http://localhost:5000/api/projects",
        scopes: {
            read: [ "api://b6b2e02c-f735-4f3d-8d86-00cd38dbce5d/Projects.Read" ]
        }
    },
    User: {
        endpoint: "http://localhost:5000/api/todolist",
        scopes: {
            read: [ "api://b6b2e02c-f735-4f3d-8d86-00cd38dbce5d/User.Read" ]
        }
    },
    Tasklibrary: {
        endpoint: "http://localhost:5000/api/todolist",
        scopes: {
            read: [ "api://b6b2e02c-f735-4f3d-8d86-00cd38dbce5d/Tasklibrary.ReadWriteUpdateDelete" ]
        }
    },
    Task: {
        endpoint: "http://localhost:5000/api/todolist",
        scopes: {
            read: [ "api://b6b2e02c-f735-4f3d-8d86-00cd38dbce5d/Task.ReadWriteUpdateDelete" ]        }
    },
    TasksList: {
        endpoint: "http://localhost:5000/api/todolist",
        scopes: {
            read: [ "api://b6b2e02c-f735-4f3d-8d86-00cd38dbce5d/TasksList.Read" ]
        }
    }
}

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit:
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
    scopes: [...protectedResources.apiTodoList.scopes.read, ...protectedResources.apiTodoList.scopes.write]
};
