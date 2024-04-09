import { ormCreateMatch as _createMatch } from "../model/matching-orm.js";
import { ormDeleteMatch as _deleteMatch } from "../model/matching-orm.js";
import { ormFindMatchById as _findMatchById } from "../model/matching-orm.js";
import { ormGetAllMatch as _getAllMatch } from "../model/matching-orm.js";
import publishToQueue from "../utils/publisher.js";
import consumeFromQueue from "../utils/consumer.js";

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

// export async function deleteMatch(req, res) {
//   try {
//     const { id } = req.body;
//     if (id) {
//       const resp = await _deleteMatch(id);
//       if (resp === false) {
//         return res.status(404).json({
//           message: "Could not delete Match! (Possibly Match does not exist!)",
//         });
//       } else {
//         console.log(`Deleted Match successfully!`);
//         return res.status(200).json({ message: `Deleted Match successfully!` });
//       }
//     } else {
//       return res.status(400).json({
//         message: "Some info is missing!",
//       });
//     }
//   } catch (err) {
//     return res
//       .status(500)
//       .json({ message: "Database failure when deleting Match!" });
//   }
// }

// export async function findMatchById(req, res) {
//   try {
//     const { id } = req.body;
//     if (id) {
//       const resp = await _findMatchById(id);
//       if (resp === null) {
//         return res.status(404).json({
//           message: "Could not find Match! (Possibly Match does not exist!)",
//         });
//       } else {
//         console.log(`Found Match successfully!`);
//         return res.status(200).json({ message: `Found Match successfully!` });
//       }
//     } else {
//       return res.status(400).json({
//         message: "Some info is missing!",
//       });
//     }
//   } catch (err) {
//     return res
//       .status(500)
//       .json({ message: "Database failure when finding Match!" });
//   }
// }

export async function publishMessageToQueue(req, res) {
  const queueName = req.body.queueName;
  const data = req.body.data;
  publishToQueue(queueName, data);
  res.send(
    `Message with data: ${JSON.stringify(data)} Successfully Sent to Queue`
  );
}

export async function consumeMessageFromQueue(req, res) {
  const queueName = req.body.queueName;
  const userId = req.body.userId;
  const myCallback = (messageContent) => {
    console.log("Received message:", messageContent);
  };

  consumeFromQueue(queueName, myCallback);
  res.send(
    `User ${userId.toString()} is now waiting for messages in ${queueName}.`
  );
}
