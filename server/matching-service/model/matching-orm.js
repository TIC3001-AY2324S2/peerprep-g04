import {
  getAllMatch,
  createMatch,
  deleteMatch,
  findMatchById,
} from "./repository.js";

export async function ormGetAllMatch(options = "") {
  const { userOne, userTwo, category, complexity } = options;
  // construct the filter
  const filter = {};
  if (userOne) filter.userOne = userOne;
  if (userTwo) filter.userTwo = userTwo;
  if (category) filter.category = category;
  if (complexity) filter.complexity = complexity;

  try {
    const result = await getAllMatch(filter);
    if (result.length !== 0) {
      return result;
    }
    return null;
  } catch (err) {
    return { err };
  }
}

export async function ormCreateMatch(
  userOne,
  userTwo = null,
  roomKey = null,
  category,
  complexity
) {
  try {
    const newMatch = await createMatch({
      userOne,
      userTwo,
      roomKey,
      category,
      complexity,
    });
    await newMatch.save();
    return true;
  } catch (err) {
    console.log("ERROR: Could not create new Match" + err);
    return { err };
  }
}

export async function ormDeleteMatch(id) {
  try {
    const result = await deleteMatch(id);

    if (result.deletedCount === 0) {
      return false;
    }

    return true;
  } catch (err) {
    console.log("ERROR: Could not delete Match");
    return { err };
  }
}

export async function ormFindMatchById(id) {
  try {
    const result = await findMatchById(id);
    if (result.length !== 0) {
      return result;
    }
    return null;
  } catch (err) {
    return { err };
  }
}
