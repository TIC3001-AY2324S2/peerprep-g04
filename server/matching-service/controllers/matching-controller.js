import { ormCreateMatch as _createMatch } from "../model/matching-orm.js";
import { ormDeleteMatch as _deleteMatch } from "../model/matching-orm.js";
import { ormFindMatchById as _findMatchById } from "../model/matching-orm.js";

export async function createMatch(req, res) {
  try {
    const { userOne, userTwo, roomKey, category, complexity } = req.body;
    if (userOne && userTwo && roomKey && category && complexity) {
      const resp = await _createMatch(
        userOne,
        userTwo,
        roomKey,
        category,
        complexity
      );

      if (resp.err) {
        return res.status(409).json({
          message:
            "Could not create a new Match! (Possibly Match Already Exists!)",
        });
      } else {
        console.log(`Created new Match successfully!`);
        return res
          .status(201)
          .json({ message: `Created new Match successfully!` });
      }
    } else {
      return res.status(400).json({
        message: "Some info is missing!",
      });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Database failure when creating new Match!" });
  }
}
