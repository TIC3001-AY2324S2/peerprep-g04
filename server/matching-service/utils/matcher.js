import { ormGetAllMatch as _getAllMatch } from "../model/matching-orm.js";
import { ormCreateMatch as _createMatch } from "../model/matching-orm.js";
import publishToQueue from "./publisher.js";

const matchUsers = async (userOne, userTwo, category, complexity) => {
  if (!userOne || !userTwo || !category || !complexity) {
    throw new Error("All fields are required");
  }

  const roomKey = `${userOne}-${userTwo}`;

  publishToQueue(category, {
    status: "MATCHED",
    userId: userOne,
    userTwoId: userTwo,
    category: category,
    complexity: complexity,
  });

  await _createMatch(userOne, userTwo, roomKey, category, complexity);
};

// This function takes in the user we are trying to match, and traverse the queue to find a match
export const searchForMatch = async (
  requestingUserId,
  userQueue,
  anyComplexity = false
) => {
  try {
    // Iterate through the userQueue to find a match
    const requestingUserData = userQueue.get(requestingUserId);
    const requestingUserComplexity = JSON.parse(
      requestingUserData.content
    ).complexity;
    const category = JSON.parse(
      requestingUserData.content
    ).category.toUpperCase();

    if (userQueue.size > 1) {
      for (let [key, value] of userQueue.entries()) {
        if (key !== requestingUserId) {
          if (!anyComplexity) {
            if (
              requestingUserComplexity.toUpperCase() ===
              JSON.parse(value.content).complexity.toUpperCase()
            ) {
              await matchUsers(
                requestingUserId,
                key,
                category,
                JSON.parse(value.content).complexity
              );
              return true;
            }
          } else {
            await matchUsers(
              requestingUserId,
              parseInt(key),
              category,
              JSON.parse(value.content).complexity
            );
            return true;
          }
        }
      }
    }
    return false;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
