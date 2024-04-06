import { createMatch, deleteMatch, findMatchById } from "./repository.js";

export async function ormCreateMatch(
  userOne,
  userTwo,
  roomKey,
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
    console.log("ERROR: Could not create new Match");
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
