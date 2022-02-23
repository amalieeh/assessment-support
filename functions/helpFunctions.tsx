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
    {
      /*might need similiar code later, therefore kept but commented out*/
    }

    //  // retrieve data from localStorage and convert it to array
    // let candidateAssessments: AssessmentType[] =
    //   JSON.parse(localStorage.getItem(key.toString()) as string) || [];
    // console.log(candidateAssessments);

    //  // create new object
    //   let newAssessment: AssessmentType[] = {
    //       'taskNumber': taskNumber,
    //       'points': points
    //   }

    //   // add new object to array of assessments locally
    //   candidateAssessments.push(assessments)

    // store array as a string
    localStorage.setItem(key.toString(), JSON.stringify(assessments));
  }
}

export function clearLocalStorage(): void {
  if (typeof window !== "undefined") {
    localStorage.clear();
  }
}

export function reAlgorithm(assessments : AssessmentType[]) {
  chooseFrequentAssessmentBasedOnScore(ass, false)
}

function chooseFrequentAssessmentBasedOnScore(assessments : AssessmentType[], b : boolean) {
  const numberOfAGivenScore = Array.from({length: 5}, () => 0); // number of times x points are given, points = index
  var hasNullScore = false;
  assessments.map((assessment) => {
    assessment.score == null ? hasNullScore = true :
    numberOfAGivenScore[assessment.score] += 1
  });

  var n : number;
  if (b) {
    n = Math.max(...numberOfAGivenScore);
  } else {
    const reducedNumberOfAGivenScore = numberOfAGivenScore.filter(n => n != 0);
    n = Math.min(...reducedNumberOfAGivenScore);
  }
    const res : number[] = [];
    numberOfAGivenScore.forEach((item, index) => item === n ? res.push(index): null);

    const score = res[Math.floor(Math.random() * res.length)];
    const assessmentsWithMostFrequentScore =  assessments.filter(assessment => assessment.score == score);
}


const ass: AssessmentType[] = [
  {
    assessmentId: "100",
    answer: "This is my greatest answer",
    candidateId: 100,
    taskNumber: 1,
    maxPoints: 2,
    score: 1,
  },
  {
    assessmentId: "1007_23424",
    answer: "This is my answer",
    candidateId: 101,
    taskNumber: 1,
    maxPoints: 2,
    score: 1,
  },
  {
    assessmentId: "20000",
    answer: "This is my very very long answer as an example for this since we need to check how it works with lots of text",
    candidateId: 1001,
    taskNumber: 1,
    maxPoints: 2,
    score: 1,
  },
  {
    assessmentId: "1004_23424",
    answer: "This is my answer",
    candidateId: 1018,
    taskNumber: 1,
    maxPoints: 2,
    score: 2,
  },
];

