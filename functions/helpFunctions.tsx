import { v4 as uuidv4 } from "uuid";
import { AssessmentType } from "../types/Types";

function cleanHtmlText(content: string) {
  if (content == undefined) {
    return "";
  }
  var cleanHtml = removeHtmlTags(content);
  var cleanHtml = cleanHtml.replace(/&#160;/g, " ");
  var cleanHtml = cleanHtml.replace(/&#230;/g, "æ");
  var cleanHtml = cleanHtml.replace(/&#248;/g, "ø");
  var cleanHtml = cleanHtml.replace(/&#229;/g, "å");
  var cleanHtml = cleanHtml.replace(/&#62;/g, ">");
  var cleanHtml = cleanHtml.replace(/&#60;/g, ";");
  var cleanHtml = cleanHtml.replace(/&#39;/g, "'");
  var cleanHtml = cleanHtml.replace(/&#34;/g, '"');
  var cleanHtml = cleanHtml.replace(/&#10;/g, "\n");
  return cleanHtml;
}

function removeHtmlTags(htmlString: string) {
  var stripedHtml = htmlString.replace(/<p>/g, "");
  var stripedHtml = stripedHtml.replace(/<\/p>/g, "\n");
  var stripedHtml = stripedHtml.replace(/<strong>/g, "\n");
  var stripedHtml = stripedHtml.replace(/<\/strong>/g, "\n");
  var stripedHtml = stripedHtml.replace(/<em>/g, "\n");
  var stripedHtml = stripedHtml.replace(/<\/em>/g, "\n");
  return stripedHtml;
}

export interface AnswerType {
  assessmentId: string;
  answer: string;
  candidateId: number;
  maxPoints: number;
  taskNumber: number;
}

export function insperaDataToTextboxObject(
  insperaData: any,
  questionNumber: number
) {
  const textboxData: AnswerType[] = [];
  if (
    questionNumber < 1 ||
    questionNumber >
      insperaData.ext_inspera_candidates[0].result.ext_inspera_questions.length
  ) {
    return textboxData;
  }
  insperaData.ext_inspera_candidates.map((candidate: any) => {
    textboxData.push({
      assessmentId: uuidv4(),
      answer: cleanHtmlText(
        candidate.result.ext_inspera_questions[questionNumber - 1]
          .ext_inspera_candidateResponses[0].ext_inspera_response
      ),
      candidateId: parseInt(candidate.result.ext_inspera_candidateId),
      maxPoints:
        candidate.result.ext_inspera_questions[questionNumber - 1]
          .ext_inspera_maxQuestionScore,
      taskNumber: questionNumber,
    });
  });
  return textboxData;
}

export function saveAssessments(
  assessments: AssessmentType[],
  key: number
): void {
  // local storage is a property of object window. Accessing localStroage is not possible until React component has mounted
  if (typeof window !== "undefined") {
    // store array as a string
    localStorage.setItem(key.toString(), JSON.stringify(assessments));
  }
}

export function saveBatch(batch: AssessmentType[], taskNumber: number) {
  const key = taskNumber.toString() + "_assessments";
  if (typeof window !== "undefined") {
    let assessments: AssessmentType[] =
      JSON.parse(localStorage.getItem(key) as string) || [];

    // add assessments from batch to assessments list locally
    batch.map((assessment) => {
      if (assessment.score != null) {
        // check if the assessment is already evaluated
        if (
          assessments.filter(function (a) {
            return a.assessmentId === assessment.assessmentId;
          }).length > 0
        ) {
          //remove existing assessment
          assessments = assessments.filter(
            (a) => a.assessmentId != assessment.assessmentId
          );
        }
        assessments.push(assessment);
      }
    });

    localStorage.setItem(key, JSON.stringify(assessments));
  }
}

export function clearLocalStorage(): void {
  if (typeof window !== "undefined") {
    localStorage.clear();
  }
}

// b = true will return outliers among those score with a high freq
export function chooseFrequentAssessmentBasedOnScore(
  assessments: AssessmentType[],
  isHighFrequency: boolean
) {
  const numberOfAGivenScore = Array.from(
    { length: assessments[0].maxPoints + 1 },
    () => 0
  ); // number of times x points are given, points = index
  var hasNullScore = false;
  assessments.map((assessment) => {
    assessment.score == null
      ? (hasNullScore = true)
      : (numberOfAGivenScore[assessment.score] += 1);
  });

  var n: number;
  if (isHighFrequency) {
    n = Math.max(...numberOfAGivenScore);
  } else {
    const reducedNumberOfAGivenScore = numberOfAGivenScore.filter(
      (n) => n <= 0
    );
    n = Math.min(...reducedNumberOfAGivenScore);
  }
  const res: number[] = [];
  numberOfAGivenScore.forEach((item, index) =>
    item === n ? res.push(index) : null
  );

  const score = res[Math.floor(Math.random() * res.length)];
  const outlierAssessments = assessments.filter(
    (assessment) => assessment.score == score
  );
}

// Returns only 1 answer so it is not overwhelming
// To unveil bias towards longer answers
export function chooseCorrelatedAssessment(
  assessments: AssessmentType[]
): AssessmentType | null {
  const maxPoints = assessments[0].maxPoints;
  const allScores = Array.from({ length: maxPoints + 1 }, (v, i) => i); // if len=5, gives [0, 1, 2, 3, 4]
  // Get the top scores ranging from 0.75*maxpoints to maxpoints
  const topScores: number[] = allScores.slice(
    -(Math.floor(maxPoints * 0.25) + 1)
  ); // The +1 is to get the number on the right index

  const noNullScoreAssessments = assessments.filter((a) => a.score != null);
  const topScoreAssessments = noNullScoreAssessments.filter((assessment) =>
    topScores.includes(assessment.score)
  );

  var lengthLongestAnswer = 0;
  assessments.map((a) =>
    a.answer.length > lengthLongestAnswer
      ? (lengthLongestAnswer = a.answer.length)
      : null
  ); // tror man kan bruke reduce elns i stedet
  var longAnswerAssessments: AssessmentType[] = assessments.filter(
    (v) => v.answer.length >= 0.75 * lengthLongestAnswer
  );

  // Get the answers that are longest and has a top score
  const correlatedAssessments: AssessmentType[] = longAnswerAssessments.filter(
    (a) => topScoreAssessments.includes(a)
  );

  // Choose one answer to return
  if (correlatedAssessments.length >= 1) {
    const index = Math.floor(Math.random() * correlatedAssessments.length);
    return correlatedAssessments[index];
  }
  return null;
}
