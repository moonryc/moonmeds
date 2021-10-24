import express = require('express');
import passport = require('passport');
import {IBackendResponse} from "../../Types/BackendResponseType";
import {UserModel} from "../../Schemas/user";


const personsRouter = express.Router();


const jwtRequired = passport.authenticate('jwt', {session: false});


personsRouter.get('/getPersons', jwtRequired, (req, res) => {
    let response: IBackendResponse = {
        alert: {
            message: "updated Person List",
            numberOfOccurrences: 1,
            severity: "success",
            notificationDate: new Date()
        },
        error: false,
        response: null
    }

    passport.authenticate('jwt', {session: false}, async (err, user) => {
        //if error
        if (err || !user) {
            response.error = true;
            response.alert.severity = "error"
            if (err) {
                if (typeof err != typeof "") {

                    response.alert.message = JSON.stringify(err);
                } else {
                    response.alert.message = err;
                }
            } else {
                response.alert.message = "Error in authenticating user";
            }
            return res.send(response)
        } else {
            try {
                let userData = await UserModel.findById(user.userId)
                if (userData != null) {
                    if ('persons' in userData) {
                        if (userData["persons"] != null) {
                            response.response = userData["persons"];
                        }
                    }
                } else {
                    response.response = "Currently you have no People"
                }
                return res.send(response)

            } catch (error) {

                response.alert.message = JSON.stringify(error)
                response.alert.severity = "error"
                response.response = error
                res.send(response)
            }
        }
    })(req, res)


});

personsRouter.put('/addPerson', jwtRequired, (req, res) => {
    let response: IBackendResponse = {
        alert: {
            message: "added a new person ",
            numberOfOccurrences: 1,
            severity: "success",
            notificationDate: new Date()
        },
        error: false,
        response: null
    }

    passport.authenticate('jwt', {session: false}, async (err, user) => {
        //if error
        if (err || !user) {
            response.error = true;
            response.alert.severity = "error"
            if (err) {
                if (typeof err != typeof "") {

                    response.alert.message = JSON.stringify(err);
                } else {
                    response.alert.message = err;
                }
            } else {
                response.alert.message = "Error in authenticating user";
            }
            return res.send(response)
        } else {
            try {
                let isError;
                console.log(req.body.payload)
                UserModel.findByIdAndUpdate(user.userId, {$set: {persons: req.body.payload}}, {new: true}, (err, doc) => {
                    if (err) {
                        isError = err
                    }
                })

                if (isError) {
                    response.alert.severity = "error"
                    if (typeof err != typeof "") {
                        response.alert.message = JSON.stringify(err);
                    } else {
                        response.alert.message = err;
                    }
                }
                console.log("error is here")
                return res.send(response)

                // let {persons} = userData

            } catch (error) {

                response.alert.message = JSON.stringify(error)
                response.alert.severity = "error"
                response.response = error
                res.send(response)
            }
        }
    })(req, res)
})


personsRouter.put('/deleteSelectedPerson', jwtRequired, (req, res) => {
    let response: IBackendResponse = {
        alert: {
            message: "Deleted selected person",
            numberOfOccurrences: 1,
            severity: "success",
            notificationDate: new Date()
        },
        error: false,
        response: null
    }

    passport.authenticate('jwt', {session: false}, async (err, user) => {
        //if error
        if (err || !user) {
            response.error = true;
            response.alert.severity = "error"
            if (err) {
                if (typeof err != typeof "") {

                    response.alert.message = JSON.stringify(err);
                } else {
                    response.alert.message = err;
                }
            } else {
                response.alert.message = "Error in authenticating user";
            }
            return res.send(response)
        } else {
            try {
                let isError;
                UserModel.findByIdAndUpdate(user.userId, {$set: {persons: req.body.payload}}, {new: true}, (err, doc) => {
                    if (err) {
                        isError = err
                    }
                })

                if (isError) {
                    response.alert.severity = "error"
                    if (typeof err != typeof "") {
                        response.alert.message = JSON.stringify(err);
                    } else {
                        response.alert.message = err;
                    }
                }
                return res.send(response)

            } catch (error) {

                response.alert.message = JSON.stringify(error)
                response.alert.severity = "error"
                response.response = error
                res.send(response)
            }
        }
    })(req, res)
})

export default personsRouter;