const express = require("express");
const Models = require("../studmod/studentModel");

const genRoute = express.Router();

genRoute
  .route("/")
  .get((req, res) => {
    Models.find({}, (err, StudentData) => {
      res.json(StudentData);
    });
  })
  .post((req, res) => {
    let newStud = new StudentData(req.body);
    newStud.save();
    res.status(201).send(newStud);
  });

genRoute.use("/:studId", (req, res, next) => {
  Models.findById(req.params.studId, (err, newStud) => {
    if (err) {
      res.status(500).send(err);
    } else {
      req.newStud = newStud;
      next();
    }
  });
});

genRoute
  .route("/:studId")
  .get((req, res) => {
    Models.findById(req.params.studId, (err, newStud) => {
      res.json(newStud);
    });
  })
  .put((req, res) => {
    Models.findById(req.params.studId, (err, newStud) => {
      newStud.studName = req.body.studName;
      newStud.studage = req.body.studage;
      newStud.studcourse = req.body.studcourse;
      newStud.studsub = req.body.studsub;
      newStud.save();
      res.json(newStud);
    });
  })
  .patch((req, res) => {
    Models.findById(req.params.studId, (err, newStud) => {
      if (req.body._id) {
        delete req.body._id;
      }
      for (let b in req.body) {
        newStud[b] = req.body[b];
      }
      newStud.save();
      res.json(newStud);
    });
  })
  .delete((req, res) => {
    Models.findById(req.params.studId, (err, newStud) => {
      newStud.remove(err => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(204).send("removed");
        }
      });
    });
  });

module.exports = genRoute;
