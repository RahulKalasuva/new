const passportConfig = {
    credentials: {
        tenantID: "e7f89a1d-fe56-40d4-b537-7214a027bf18",
        clientID: "b6b2e02c-f735-4f3d-8d86-00cd38dbce5d"
    },
    metadata: {
        authority: "login.microsoftonline.com",
        discovery: ".well-known/openid-configuration",
        version: "v2.0"
    },
    settings: {
        validateIssuer: true,
        passReqToCallback: true,
        loggingLevel: "info",
        loggingNoPII: true,
    },
    protectedRoutes: {
        todolist: {
            endpoint: "/api/todolist",
            delegatedPermissions: {
                read: ["Todolist.Read", "Todolist.ReadWrite"],
                write: ["Todolist.ReadWrite"]
            }
        },
        projects: {
            endpoint: "/api/projects",
            delegatedPermissions: {
                read: ["Projects.Read"]
            }
        }
    }
}

module.exports = passportConfig;
