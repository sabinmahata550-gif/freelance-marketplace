import util from "util";
import { FREELANCE_MARKETPLACE_PROPOSAL_PROMPT } from "../constants/prompt.js";
import promptAI from "../util/ai.js";

const generateProposal = async (jobTitle, description) => {

  try {

    const prompt = util.format(
      FREELANCE_MARKETPLACE_PROPOSAL_PROMPT,
      jobTitle,
      description
    );

    const proposal = await promptAI(prompt);

    return proposal;

  } catch (error) {

    throw new Error("AI proposal generation failed");
  }

};

export default { generateProposal };