import model from '../models'
var fs = require('fs')

const {
    Bodaboda
} = model;


class Bodabodas {

    static createBodaboda(req, res) {
        const {
            firstName,
            lastName,
            date_of_birth,
            nin,
            phoneNumber,
            gurantor1_nin,
            gurantor2_nin,
        } = req.body;

        const LC1_letter = req.files.LC1_letter[0].path;
        const riding_permit = req.files.riding_permit[0].path;
        const stage_chairman_letter = req.files.stage_chairman_letter[0].path;
        const application_form = req.files.application_form[0].path;
        const passport_photo = req.files.passport_photo[0].path;
        const gurantor1_passport_photo = req.files.gurantor1_passport_photo[0].path;
        const gurantor2_passport_photo = req.files.gurantor2_passport_photo[0].path;
        const address_proof = req.files.address_proof[0].path;
        const gurantor1_stagecard = req.files.gurantor1_stagecard[0].path;
        const gurantor2_stagecard = req.files.gurantor2_stagecard[0].path;

        Bodaboda.create({
            firstName,
            lastName,
            date_of_birth,
            nin,
            phoneNumber,
            gurantor1_nin,
            gurantor2_nin,
            LC1_letter,
            riding_permit,
            stage_chairman_letter,
            application_form,
            passport_photo,
            gurantor1_passport_photo,
            gurantor2_passport_photo,
            address_proof,
            gurantor1_stagecard,
            gurantor2_stagecard
        }).then(bodaboda => res.status(200).json({
            bodaboda: bodaboda
        }))
            .catch(error => res.status(400).json({
                error: error
            }))
    }

    static listBodabodas(req, res) {
        Bodaboda.findAll()
            .then(bodabodas => {
                const response = {
                    riders: bodabodas.map(rider => {
                        return {
                            id: rider.id,
                            firstName: rider.firstName,
                            lastName: rider.lastName,
                            name: rider.firstName +" "+ rider.lastName,
                            nin: rider.nin,
                            phoneNumber: rider.phoneNumber,
                            gurantor1_nin: rider.gurantor1_nin,
                            gurantor2_nin: rider.gurantor2_nin,
                            date_of_birth: rider.date_of_birth,
                            passport_photo: 'http://127.0.0.1:3000/' + rider.passport_photo.slice(8),
                            LC1_letter: 'http://127.0.0.1:3000/' + rider.LC1_letter.slice(8),
                            application_form: 'http://127.0.0.1:3000/' + rider.application_form.slice(8),
                            stage_chairman_letter: 'http://127.0.0.1:3000/' + rider.stage_chairman_letter.slice(8),
                            gurantor1_passport_photo: 'http://127.0.0.1:3000/' + rider.gurantor1_passport_photo.slice(8),
                            gurantor2_passport_photo: 'http://127.0.0.1:3000/' + rider.gurantor2_passport_photo.slice(8),
                            gurantor1_stagecard: 'http://127.0.0.1:3000/' + rider.gurantor1_stagecard.slice(8),
                            gurantor2_stagecard: 'http://127.0.0.1:3000/' + rider.gurantor2_stagecard.slice(8),
                            address_proof: 'http://127.0.0.1:3000/' + rider.address_proof.slice(8),
                            riding_permit: 'http://127.0.0.1:3000/' + rider.riding_permit.slice(8)
                        };
                    })

                };
                res.status(200).json(response);
            }).catch(error => res.status(400).json({
                error: error
            }))
    }

    static deleteBodaboda(req, res) {
        return Bodaboda.findByPk(req.params.bodaboda_id)
            .then(bodaboda => {
                if (!bodaboda) {
                    return res.status(404).send({
                        message: 'User Not Found',
                    });
                } else {
                    bodaboda
                        .destroy()
                        .then(() => {
                            var files = [bodaboda["LC1_letter"], bodaboda["riding_permit"], bodaboda["stage_chairman_letter"], bodaboda["application_form"], bodaboda["passport_photo"], bodaboda["gurantor1_passport_photo"], bodaboda["gurantor2_passport_photo"], bodaboda["address_proof"], bodaboda["gurantor1_stagecard"], bodaboda["gurantor2_stagecard"]];
                            console.log(files)
                            var i = files.length;
                            files.forEach(filepath => {
                                fs.unlink(filepath, function (err) {
                                    i--;
                                    if (err) {
                                        console.log(err)
                                        return;
                                    } else if (i <= 0) {
                                        console.log("All files have been removed")
                                    }
                                });
                            });

                            res.status(200).json({
                                message: "Bodaboda deleted succesfully"
                            })
                        })
                        .catch(error => {
                            console.log(error)
                            res.status(400).json({
                                error: error
                            })
                        });
                }


            }).catch(error => {
                console.log(error)
                res.status(400).json({
                    error: error
                })
            })


    }
    static updateBodaboda(req, res) {
        const {
            firstName,
            lastName,
            date_of_birth,
            nin,
            phoneNumber,
            gurantor1_nin,
            gurantor2_nin,
        } = req.body;

        var LC1_letter = '';
        var riding_permit = '';
        var stage_chairman_letter = '';
        var application_form = '';
        var passport_photo = '';
        var gurantor1_stagecard = '';
        var address_proof = '';
        var gurantor1_passport_photo = '';
        var gurantor2_passport_photo = '';
        var gurantor2_stagecard = '';
        if (req.files.LC1_letter) {
            LC1_letter = req.files.LC1_letter[0].path;
        }
        if (req.files.riding_permit) {
            riding_permit = req.files.riding_permit[0].path;
        }
        if (req.files.stage_chairman_letter) {
            stage_chairman_letter = req.files.stage_chairman_letter[0].path;
        }
        if (req.files.application_form) {
            application_form = req.files.application_form[0].path;
        }
        if (req.files.passport_photo) {
            passport_photo = req.files.passport_photo[0].path;
        }
        if (req.files.gurantor1_passport_photo) {
            gurantor1_passport_photo = req.files.gurantor1_passport_photo[0].path;
        }
        if (req.files.gurantor2_passport_photo) {
            gurantor2_passport_photo = req.files.gurantor2_passport_photo[0].path;
        }
        if (address_proof) {
            address_proof = address_proof[0].path;
        }
        if (req.files.gurantor1_stagecard) {
            gurantor1_stagecard = req.files.gurantor1_stagecard[0].path;
        }
        if (req.files.gurantor2_stagecard) {
            gurantor2_stagecard = req.files.gurantor2_stagecard[0].path;
        }

        return Bodaboda.findByPk(req.params.bodaboda_id)
            .then(bodaboda => {
                if (!bodaboda) {
                    return res.status(404).send({
                        message: 'User Not Found',
                    });
                } else {
                    var files = [];
                    if (LC1_letter != '') {
                        files.push(bodaboda["LC1_letter"])
                    }
                    if (riding_permit != '') {
                        files.push(bodaboda["riding_permit"])
                    }
                    if (stage_chairman_letter != '') {
                        files.push(bodaboda["stage_chairman_letter"])
                    }
                    if (application_form != '') {
                        files.push(bodaboda["application_form"])
                    }
                    if (passport_photo != '') {
                        files.push(bodaboda["passport_photo"])
                    }
                    if (gurantor1_passport_photo != '') {
                        files.push(bodaboda["gurantor1_passport_photo"])
                    }
                    if (gurantor2_passport_photo != '') {
                        files.push(bodaboda["gurantor2_passport_photo"])
                    }
                    if (address_proof != '') {
                        files.push(bodaboda["address_proof"])
                    }
                    if (gurantor1_stagecard != '') {
                        files.push(bodaboda["gurantor1_stagecard"])
                    }
                    if (gurantor2_stagecard != '') {
                        files.push(bodaboda["gurantor2_stagecard"])
                    }
                    console.log(files)

                    var i = files.length;
                    files.forEach(filepath => {
                        fs.unlink(filepath, function (err) {
                            i--;
                            if (err) {
                                console.log(err)
                                return;
                            } else if (i <= 0) {
                                console.log("All files have been removed")
                            }
                        });
                    });
                    console.log(firstName, lastName)

                    bodaboda
                        .update({
                            firstName: firstName || bodaboda.firstName,
                            lastName: lastName || bodaboda.lastName,
                            phoneNumber: phoneNumber || bodaboda.phoneNumber,
                            date_of_birth: date_of_birth || bodaboda.date_of_birth,
                            phoneNumber: phoneNumber || bodaboda.phoneNumber,
                            nin: nin || bodaboda.nin,
                            gurantor1_nin: gurantor1_nin || bodaboda.gurantor1_nin,
                            gurantor2_nin: gurantor2_nin || bodaboda.gurantor2_nin,
                            LC1_letter: LC1_letter || bodaboda.LC1_letter,
                            riding_permit: riding_permit || bodaboda.riding_permit,
                            stage_chairman_letter: stage_chairman_letter || bodaboda.stage_chairman_letter,
                            application_form: application_form || bodaboda.application_form,
                            passport_photo: passport_photo || bodaboda.passport_photo,
                            gurantor1_passport_photo: gurantor1_passport_photo || bodaboda.gurantor1_passport_photo,
                            gurantor2_passport_photo: gurantor2_passport_photo || bodaboda.gurantor2_passport_photo,
                            address_proof: address_proof || bodaboda.address_proof,
                            gurantor1_stagecard: gurantor1_stagecard || bodaboda.gurantor1_stagecard,
                            gurantor2_stagecard: gurantor2_stagecard || bodaboda.gurantor2_stagecard


                        })
                        .then((updateBodaboda) => res.status(200).send({
                            message: 'bodaboda successfully updated',
                            bodaboda: {
                                firstName: firstName || updateBodaboda.firstName,
                                lastName: lastName || updateBodaboda.lastName,
                                phoneNumber: phoneNumber || updateBodaboda.phoneNumber,
                                date_of_birth: date_of_birth || updateBodaboda.date_of_birth,
                                phoneNumber: phoneNumber || updateBodaboda.phoneNumber,
                                nin: nin || updateBodaboda.nin,
                                gurantor1_nin: gurantor1_nin || updateBodaboda.gurantor1_nin,
                                gurantor2_nin: gurantor2_nin || updateBodaboda.gurantor2_nin,
                                LC1_letter: LC1_letter || updateBodaboda.LC1_letter,
                                riding_permit: riding_permit || updateBodaboda.riding_permit,
                                stage_chairman_letter: stage_chairman_letter || updateBodaboda.stage_chairman_letter,
                                application_form: application_form || updateBodaboda.application_form,
                                passport_photo: passport_photo || updateBodaboda.passport_photo,
                                gurantor1_passport_photo: gurantor1_passport_photo || updateBodaboda.gurantor1_passport_photo,
                                gurantor2_passport_photo: gurantor2_passport_photo || updateBodaboda.gurantor2_passport_photo,
                                address_proof: address_proof || updateBodaboda.address_proof,
                                gurantor1_stagecard: gurantor1_stagecard || updateBodaboda.gurantor1_stagecard,
                                gurantor2_stagecard: gurantor2_stagecard || updateBodaboda.gurantor2_stagecard

                            }
                        }))
                        .catch(error => res.status(400).send(error));
                }

            })

    }



}


export default Bodabodas;