import { ormCreateMatch as _createMatch } from "../model/matching-orm.js";
import { ormDeleteMatch as _deleteMatch } from "../model/matching-orm.js";
import { ormFindMatchByUserId as _findMatchByUserId } from "../model/matching-orm.js";
import { ormGetAllMatch as _getAllMatch } from "../model/matching-orm.js";
import publishToQueue from "../utils/publisher.js";
import consumeFromQueue from "../utils/consumer.js";

export async function createMatch(req, res) {
  try {
    const {
      userOne,
      userOneName,
      userTwo,
      userTwoName,
      roomKey,
      category,
      complexity,
    } = req.body;
    if (userOne && category && complexity) {
      const resp = await _createMatch(
        userOne,
        userOneName,
        userTwo,
        userTwoName,
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

export async function deleteMatch(req, res) {
  try {
    const { id } = req.body;
    if (id) {
      const resp = await _deleteMatch(id);
      if (resp === false) {
        return res.status(204).json({
          message: "Could not delete Match! (Possibly Match does not exist!)",
        });
      } else {
        console.log(`Deleted Match successfully!`);
        return res.status(200).json({ message: `Deleted Match successfully!` });
      }
    } else {
      return res.status(400).json({
        message: "Some info is missing!",
      });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Database failure when deleting Match!" });
  }
}

export async function findMatchByUserId(req, res) {
  try {
    const { userId } = req.query;
    if (userId) {
      const response = await _findMatchByUserId(userId);
      if (response.err) {
        return res
          .status(204)
          .json({ message: `Unable to find match for ${userId}` });
      } else {
        return res.status(200).json({
          data: response,
        });
      }
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Database failure when finding match!" });
  }
}

export async function joinQueue(req, res) {
  const data = req.body.data;
  const queueName = data.category;

  if (
    (data.status && data.status.toUpperCase() === "JOIN") ||
    data.status.toUpperCase() === "LEAVE"
  ) {
    if (
      !data ||
      !data.status ||
      !data.userId ||
      !data.userName ||
      !data.category ||
      !data.complexity ||
      !data.matchType
    ) {
      return res.status(400).json({
        message: "Some info is missing!",
      });
    }
  } else {
    return res.status(400).json({
      message: "Invalid status!",
    });
  }

  const myCallback = (usersInQueueMap) => {
    // console.log("Received message:", messageContent);
  };

  await publishToQueue(queueName, data);

  await consumeFromQueue(queueName, myCallback);
  res.send(
    `Message with data: ${JSON.stringify(data)} Successfully Sent to Queue`
  );
}
