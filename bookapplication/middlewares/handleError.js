export const HandleErrors = (func) => async (req, res, next) => {
  console.log("Triggered Endpoint: ", req.originalUrl);
  try {
    await func(req, res, next);
  } catch (error) {
    console.error("Error Handler", error);
    res.status(404).json(error);
    next();
  }
};
