import {
  createQuestion,
  deleteQuestion,
  findAllQuestions,
  findQuestionById,
  updateQuestion,
  findQuestionByTitle
} from "./repository.js";

export async function ormCreateQuestion(
  title,
  description,
  category,
  complexity
) {
  try {
    const validDuplicate = await findQuestionByTitle(title);
    if (validDuplicate) {
      return false;
    }
    const newQuestion = await createQuestion({
      title,
      description,
      category: JSON.stringify(category),
      complexity,
    });
    await newQuestion.save();
    return true;
  } catch (err) {
    console.log("ERROR: Failed to create question.");
    return { err };
  }
}

export async function ormDeleteQuestion(id) {
  try {
    const result = await deleteQuestion(id);

    if (result.deletedCount === 0) {
      return false;
    }

    return true;
  } catch (err) {
    console.log("ERROR: Could not delete question");
    return { err };
  }
}

export async function ormUpdateQuestion(
  id,
  title,
  description,
  category,
  complexity
) {
  try {
    const validDuplicate = await findQuestionByTitle(title);
    if (validDuplicate && id != validDuplicate.id) {
      console.log("validDuplicate");
      console.log(validDuplicate);
      return false;
    }
    const result = await updateQuestion(
      id,
      title,
      description,
      JSON.stringify(category),
      complexity
    );
    console.log(result);

    // Commented out because we assume all requests are from front-end and thus question Id is correctly provided
    /*
    // Checking if Question Modified
    if (result.modifiedCount === 0) {
      return false;
    }*/

    return true;
  } catch (err) {
    console.log("ERROR: Could not update Question data");
    return { err };
  }
}

export async function ormFindAllQuestions(search = "") {
  const queryOptions = search
    ? { title: { $regex: search, $options: "i" } }
    : {};
  try {
    const result = await findAllQuestions(queryOptions);

    if (result.length !== 0) {
      return result;
    }
    return null;
  } catch (err) {
    return { err };
  }
}

export async function ormFindQuestionById(id) {
  try {
    const result = await findQuestionById(id);
    if (result.length !== 0) {
      return result;
    }
    return null;
  } catch (err) {
    return { err };
  }
}

export async function ormVlidateDuplicationByTitle(title) {
  try {
    const result = await findQuestionByTitle(title);
    if (result.length !== 0) {
      return result;
    }
    return null;
  } catch (err) {
    return { err };
  }
}