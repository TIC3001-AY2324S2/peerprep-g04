import { ormGetAllMatch as _getAllMatch } from "../model/matching-orm.js";

const matchUsers = async (userOne, userTwo) => {};

const searchForMatch = async (options) => {
  const match = await _getAllMatch(options);
  return match;
};

export default searchForMatch;
