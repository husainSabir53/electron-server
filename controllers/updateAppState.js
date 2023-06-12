const { AppState } = require("../model/model");

module.exports = async (req, res) => {
  try {
    const { openedTime, closedTime, active, clientName } = req.body;

    const state = await AppState.findOne({ name: clientName });

    if (!state) {
      // No existing state found, create a new one
      console.log("No state exist");
      const newState = new AppState({
        name: clientName,
        active: active,
        openedAt: openedTime,
        closedAt: closedTime,
      });
      await newState.save();
    } else {
      // Update the existing state
      console.log("updating state");
      state.active = active;
      state.openedAt = openedTime;
      state.closedAt = closedTime;
      await state.save();
    }
    res.send({
      status: 200,
      response: "State created or updated successfuly.",
    });
  } catch (err) {
    console.error(err)
    res.status(err.status || 400);
    res.send({
      status: err.status || 400,
      response: err.message || "Could not create or update state.",
    });
  }
};
