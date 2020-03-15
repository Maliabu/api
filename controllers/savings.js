import model from '../models'
const {
    Saving
} = model;

class Savings {
    static createSaving(req, res) {
        const {
            client,
            amount,
            clientNumber
        } = req.body;
        Saving.create({
            client,
            amount,
            clientNumber
        }).then(Saving => res.status(200).json({
            Saving: Saving
        })).catch(error => res.status(400).json({
            error: error
        }))
    }
    static listSavings(req, res) {
        Saving.findAll().then(savings => {
            res.status(200).json(savings)

        }).catch(error => res.status(400).json({
            error: error
        }))
    }
    static updateSaving(req, res) {
        const {
            client,
            amount,
            clientNumber
        } = req.body;
        return Saving.findByPk(req.params.savingId)
            .then(saving => {
                saving.update({
                    client: client || saving.client,
                    amount: amount || saving.amount,
                    clientNumber: clientNumber || saving.clientNumber
                }).then(updatedSaving => {
                    res.status(200).json({
                        message: "Saving updated successfully",
                        saving: {
                            client: client || updatedSaving.client,
                            amount: amount || updatedSaving.amount,
                            clientNumber: clientNumber || updatedSaving.clientNumber
                        }
                    })

                }).catch(error => {
                    res.status(400).json({
                        error: error
                    });
                });

            }).catch(error => {
                res.status(404).json({
                    error: error
                });
            });

    }


    static deleteSaving(req, res) {
        return Saving.findByPk(req.params.savingId)
            .then(saving => {
                saving
                    .destroy()
                    .then(() => res.status(200).send({
                        message: 'Saving successfully deleted'
                    }))
                    .catch(error => res.status(400).send(error));
            }).catch(error => res.status(400).json({
                error: error
            }))
    }

}

export default Savings;