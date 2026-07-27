const express = require("express");
const campsiteRouter = express.Router();

/*  Consider setting status codes explicitly within each handler rather than defaulting to 200 in .all(). It works as you override later, but it's clearer to set headers in .all() and set status codes in the specific handlers. For example, use res.status(201) for successful POST creation, 200 for standard success, 204 for delete with no body, and 403 for unsupported operations. */

campsiteRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res) => {
    res.end("Will send all the campsites to you");
  })
  .post((req, res) => {
    res.statusCode = 201;
    res.end(
      `Will add the campsite: ${req.body.name} with description: ${req.body.description}`,
    );
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /campsites");
  })
  .delete((req, res) => {
    // res.statusCode = 204;
    res.end("Deleting all campsites");
  });

campsiteRouter
  .route("/:campsiteId")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res) => {
    res.end(
      `Will send details of the campsite: ${req.params.campsiteId} to you`,
    );
  })
  .post((req, res) => {
    res.statusCode = 403;
    res.end(
      `POST operation is not supported on /campsites/${req.params.campsiteId}`,
    );
  })
  .put((req, res) => {
    res.write(`Updating the campsite: ${req.params.campsiteId}\n`);
    res.end(
      `Will update the campsite: ${req.body.name} with description: ${req.body.description}`,
    );
  })
  .delete((req, res) => {
    res.end(`Deleting campsite: ${req.params.campsiteId}`);
  });

module.exports = campsiteRouter;
