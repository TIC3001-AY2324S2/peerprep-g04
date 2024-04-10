import { ormGetAllMatch as _getAllMatch } from "../model/matching-orm.js";
import { ormCreateMatch as _createMatch } from "../model/matching-orm.js";
import publishToQueue from "./publisher.js";

const matchUsers = async (userOne, userTwo) => {
  const roomKey = `${userOne}-${userTwo}`;
  const category = "Array";
  const complexity = "Easy";

  publishToQueue("Array", {
    status: "MATCHED",
    userId: userOne,
    userTwoId: userTwo,
    category: "Array",
    complexity: "Easy",
  });

  await _createMatch(userOne, userTwo, roomKey, category, complexity);
};

// This function takes in the user we are trying to match, and traverse the queue to find a match
export const searchForMatchSameComplexity = async (
  requestingUserId,
  userQueue
) => {
  try {
    // Iterate through the userQueue to find a match
    const requestingUserData = userQueue.get(requestingUserId);
    const requestingUserComplexity = JSON.parse(
      requestingUserData.content
    ).complexity;
    const queueName = JSON.parse(requestingUserData.content).category;

    if (userQueue.size > 1) {
      userQueue.forEach(async (value, key) => {
        if (key !== requestingUserId) {
          if (
            requestingUserComplexity === JSON.parse(value.content).complexity
          ) {
            await matchUsers(requestingUserId, parseInt(key));
            return true;
          }
        }
      });
    }
    return false;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const searchForMatchAnyComplexity = async (
  requestingUserId,
  userQueue
) => {
  return false;
};
