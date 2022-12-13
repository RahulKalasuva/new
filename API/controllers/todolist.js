const {hasRequiredDelegatedPermissions,} = require('../config/permissionUtils');

const authConfig = require('../authConfig');

exports.getTodo = (req, res, next) => {
    console.log("------->",req.authInfo)
    if (hasRequiredDelegatedPermissions(req.authInfo, authConfig.protectedRoutes.todolist.delegatedPermissions.read)) {
        try {
            /**
             * The 'oid' (object id) is the only claim that should be used to uniquely identify
             * a user in an Azure AD tenant. The token might have one or more of the following claim,
             * that might seem like a unique identifier, but is not and should not be used as such,
             * especially for systems which act as system of record (SOR):
             *
             * - upn (user principal name): might be unique amongst the active set of users in a tenant but
             * tend to get reassigned to new employees as employees leave the organization and
             * others take their place or might change to reflect a personal change like marriage.
             *
             * - email: might be unique amongst the active set of users in a tenant but tend to get
             * reassigned to new employees as employees leave the organization and others take their place.
             */
            const owner = req.authInfo['oid'];
            // const id = req.params.id;

            // const todo = db.get('todos')
            //     .filter({ owner: owner })
            //     .find({ id: id })
            //     .value();

            console.log("Hello1111")

            res.status(200).send("permissions");
        } catch (error) {
            next(error);
        }
    } else {
        next(new Error('User does not have the required permissions'))
    }
}
