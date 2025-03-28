
import { getApiKeys } from './apiConfig';
import { generateChatCompletion, ChatMessage } from './geminiService';
import { storageService, FileMetadata } from './storageService';

export interface QuestionEvaluation {
  questionNumber: number;
  questionText: string;
  studentResponse: string;
  score: string; // e.g. "7/10"
  feedback: string;
}

export interface AssessmentEvaluation {
  studentName: string;
  studentId: string;
  assessmentTitle: string;
  assessmentId: string;
  date: string;
  questionEvaluations: QuestionEvaluation[];
  overallScore: string; // e.g. "43/60"
  overallPercentage: string; // e.g. "72%"
  generalFeedback: string;
}

export const evaluateStudentAssessment = async (
  studentName: string,
  studentId: string,
  assessmentTitle: string,
  questions: { number: number; text: string; maxScore: number }[],
  responses: { questionNumber: number; response: string }[]
): Promise<AssessmentEvaluation> => {
  // Check if API key is configured
  const { GEMINI_API_KEY } = getApiKeys();
  if (!GEMINI_API_KEY) {
    throw new Error("Gemini API key is not configured. Please set up your API keys.");
  }

  // Prepare the assessment data for AI evaluation
  const assessmentData = questions.map(q => {
    const studentResponse = responses.find(r => r.questionNumber === q.number)?.response || "No response provided";
    return `Question ${q.number}: ${q.text}\n\nStudent Response: ${studentResponse}\n\nMaximum score: ${q.maxScore}`;
  }).join("\n\n");

  // Prompt for the AI
  const prompt = `
You are an expert teacher grading a student assessment. Please evaluate the following student responses based on the questions provided. For each question:

1. Assign a score in the format "X/Y" where Y is the maximum score for the question.
2. Provide detailed, constructive feedback on the response, highlighting strengths and areas for improvement.
3. After evaluating all questions, calculate the total score, percentage, and provide general feedback on overall performance.

Format your response exactly as follows (this format will be parsed programmatically):

***EVALUATION_START***

Evaluation and Grading of Student Assessment for ${studentName}

${questions.map(q => `${q.number}. ${q.text}:
Score: [SCORE]

Feedback: [DETAILED_FEEDBACK]
`).join("\n")}

Overall Score: [TOTAL_SCORE]/[MAXIMUM_POSSIBLE] (Approx. [PERCENTAGE]%)

General Feedback:
[GENERAL_FEEDBACK]

***EVALUATION_END***

Here is the assessment to evaluate:

${assessmentData}
`;

  // Send to Gemini for evaluation
  const messages: ChatMessage[] = [
    { role: 'system', content: 'You are an AI teaching assistant specialized in evaluating student assignments fairly and constructively.' },
    { role: 'user', content: prompt }
  ];
  
  const aiResponse = await generateChatCompletion(messages, { temperature: 0.3 });
  
  // Extract the evaluation from the AI response
  const evaluationMatch = aiResponse.match(/\*\*\*EVALUATION_START\*\*\*([\s\S]*)\*\*\*EVALUATION_END\*\*\*/);
  if (!evaluationMatch) {
    throw new Error("Failed to parse AI evaluation. Please try again.");
  }
  
  const evaluationText = evaluationMatch[1].trim();
  
  // Parse the evaluation to extract structured data
  const questionEvaluations: QuestionEvaluation[] = [];
  let overallScore = "";
  let overallPercentage = "";
  let generalFeedback = "";
  
  // Extract question evaluations
  for (const question of questions) {
    const questionRegex = new RegExp(`${question.number}\\. [^:]*:\\s*\\nScore: ([^\\n]*)\\s*\\n\\s*Feedback: ([\\s\\S]*?)(?=\\n\\d+\\.|\\n\\s*Overall Score:)`, 'i');
    const match = evaluationText.match(questionRegex);
    
    if (match) {
      questionEvaluations.push({
        questionNumber: question.number,
        questionText: question.text,
        studentResponse: responses.find(r => r.questionNumber === question.number)?.response || "",
        score: match[1].trim(),
        feedback: match[2].trim()
      });
    }
  }
  
  // Extract overall score
  const overallScoreMatch = evaluationText.match(/Overall Score: ([^(]*).*?(\d+)%\)/);
  if (overallScoreMatch) {
    overallScore = overallScoreMatch[1].trim();
    overallPercentage = overallScoreMatch[2].trim();
  }
  
  // Extract general feedback
  const generalFeedbackMatch = evaluationText.match(/General Feedback:\s*([\s\S]*?)$/);
  if (generalFeedbackMatch) {
    generalFeedback = generalFeedbackMatch[1].trim();
  }
  
  // Create the assessment evaluation object
  const assessmentEvaluation: AssessmentEvaluation = {
    studentName,
    studentId,
    assessmentTitle,
    assessmentId: `ASMT-${Date.now()}`,
    date: new Date().toISOString(),
    questionEvaluations,
    overallScore,
    overallPercentage,
    generalFeedback
  };
  
  // Store the evaluation in Google Cloud Storage
  await storeAssessmentEvaluation(assessmentEvaluation);
  
  return assessmentEvaluation;
};

// Store the assessment evaluation in Google Cloud Storage
const storeAssessmentEvaluation = async (evaluation: AssessmentEvaluation): Promise<void> => {
  try {
    const { GOOGLE_CLOUD_STORAGE_KEY } = getApiKeys();
    if (!GOOGLE_CLOUD_STORAGE_KEY) {
      console.warn("Google Cloud Storage key not configured. Evaluation will not be stored.");
      return;
    }
    
    // Convert evaluation to a blob
    const evaluationBlob = new Blob([JSON.stringify(evaluation, null, 2)], { type: 'application/json' });
    const evaluationFile = new File([evaluationBlob], `${evaluation.studentId}_${evaluation.assessmentId}.json`, { type: 'application/json' });
    
    // Store in Google Cloud Storage
    await storageService.uploadFile(evaluationFile, `evaluations/${evaluation.studentId}/`);
  } catch (error) {
    console.error("Failed to store assessment evaluation:", error);
    // Continue without failing the function if storage fails
  }
};

// Retrieve a stored assessment evaluation
export const getStoredAssessmentEvaluation = async (
  studentId: string,
  assessmentId: string
): Promise<AssessmentEvaluation | null> => {
  try {
    const { GOOGLE_CLOUD_STORAGE_KEY } = getApiKeys();
    if (!GOOGLE_CLOUD_STORAGE_KEY) {
      throw new Error("Google Cloud Storage key not configured.");
    }
    
    // For demo purposes, we'll return mock data
    // In a real implementation, this would retrieve from storage
    const mockEvaluation: AssessmentEvaluation = {
      studentName: "John Doe",
      studentId,
      assessmentTitle: "Computer Science Basics",
      assessmentId,
      date: new Date().toISOString(),
      questionEvaluations: [
        {
          questionNumber: 1,
          questionText: "Functions of Operating Systems",
          studentResponse: "The operating system is like the boss of the computer. It makes sure all programs run smoothly, files are stored properly, and devices like printers work.",
          score: "7/10",
          feedback: "Your explanation of the OS as the \"boss\" of the computer is a good metaphor. You covered key functions such as managing programs, handling files, and ensuring device functionality. However, it's important to clarify that the OS is software, not hardware. Make sure to specify its role in memory management and security in more detail."
        },
        {
          questionNumber: 2,
          questionText: "Generations of Computers",
          studentResponse: "There are five generations of computers. First used vacuum tubes, second used transistors, third used integrated circuits, fourth used microprocessors, and the fifth is using AI but not fully quantum computing yet.",
          score: "8/10",
          feedback: "You provided a concise overview of the five generations of computers, highlighting the key technologies used in each. However, your note about the 5th generation not fully utilizing quantum computing is accurate but could be expanded. Consider mentioning more about how AI is being integrated into current technologies."
        }
      ],
      overallScore: "43/60",
      overallPercentage: "72",
      generalFeedback: "You have shown a solid understanding of computer concepts. Your answers are mostly accurate, but focus on providing more details and making distinctions between hardware and software clearer. Keep improving!"
    };
    
    return mockEvaluation;
  } catch (error) {
    console.error("Failed to retrieve assessment evaluation:", error);
    return null;
  }
};

// Fetch all evaluations for a student
export const getStudentEvaluations = async (
  studentId: string
): Promise<AssessmentEvaluation[]> => {
  try {
    const { GOOGLE_CLOUD_STORAGE_KEY } = getApiKeys();
    if (!GOOGLE_CLOUD_STORAGE_KEY) {
      throw new Error("Google Cloud Storage key not configured.");
    }
    
    // For demo purposes, return mock data
    // In a real implementation, this would list files in storage
    return [
      await getStoredAssessmentEvaluation(studentId, "ASMT-12345"),
      await getStoredAssessmentEvaluation(studentId, "ASMT-67890")
    ].filter(Boolean) as AssessmentEvaluation[];
  } catch (error) {
    console.error("Failed to retrieve student evaluations:", error);
    return [];
  }
};
