import { assignInWith } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { ApprovalType, AssessmentType } from '../types/Types';
import data from '../data/IT2810Høst2018.json';

function replaceUndefined(content: string) {
  if (content == undefined) {
    return '';
  }
  return content;
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
      answer: replaceUndefined(
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
  assessments: ApprovalType[],
  key: string
): void {
  // local storage is a property of object window. Accessing localStroage is not possible until React component has mounted
  if (typeof window !== 'undefined') {
    // store array as a string
    localStorage.setItem(key, JSON.stringify(assessments));
  }
}

export function getAssessments(taskNumbers: number[]): number[][] {
  //convert tasknumbers to string
  const tasks = taskNumbers.map(String);
  let approvedAssessments: number[] = [];
  let startedAssessments: number[] = [];

  // check if task is approved by looking up in localStorage
  if (typeof window !== 'undefined') {
    tasks.map((taskNumber: string) => {
      const approvedKey = taskNumber + '_approved';
      const startedKey = taskNumber + '_assessments';
      if (approvedKey in localStorage) {
        approvedAssessments.push(parseInt(taskNumber));
      } else if (startedKey in localStorage) {
        startedAssessments.push(parseInt(taskNumber));
      }
    });
  }
  return [approvedAssessments, startedAssessments];
}

export function saveBatch(batch: AssessmentType[], taskNumber: number) {
  const key = taskNumber.toString() + '_assessments';
  if (typeof window !== 'undefined') {
    let assessments: AssessmentType[] =
      JSON.parse(localStorage.getItem(key) as string) || [];

    // add assessments from batch to assessments list locally
    batch.map((assessment) => {
      if (assessment.score !== '') {
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
      } else {
        assessments = assessments.filter(
          (a) => a.assessmentId != assessment.assessmentId
        );
      }
    });
    if (assessments.length > 0) {
      localStorage.setItem(key, JSON.stringify(assessments));
    }
  }
}

export function clearLocalStorage(): void {
  if (typeof window !== 'undefined') {
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
    assessment.score === ''
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

export function uploadDataToLocalstorage() {
  const totalTasks: number =
    data.ext_inspera_candidates[0].result.ext_inspera_questions.length;
  const taskNumbers: number[] = Array.from(Array(totalTasks).keys());

  //check if data is already uploaded to localstorage
  if (typeof window !== 'undefined') {
    taskNumbers.map((taskNum: number) => {
      const key: string = (taskNum + 1).toString() + '_data';
      const dataToBeUploaded: AnswerType[] = [];
      // data is not uploaded
      if (!(key in localStorage)) {
        data.ext_inspera_candidates.map((candidate: any) => {
          // create answer objects and add to list
          dataToBeUploaded.push({
            assessmentId: uuidv4(),
            answer: replaceUndefined(
              candidate.result.ext_inspera_questions[taskNum]
                .ext_inspera_candidateResponses[0].ext_inspera_response
            ),
            candidateId: parseInt(candidate.result.ext_inspera_candidateId),
            maxPoints:
              candidate.result.ext_inspera_questions[taskNum]
                .ext_inspera_maxQuestionScore,
            taskNumber: taskNum + 1,
          });
        });

        //add to localstorage
        localStorage.setItem(key, JSON.stringify(dataToBeUploaded));
      }
    });
  }
}

export function getApprovedAssessments(taskNum: string): ApprovalType[] {
  const approvedKey: string = taskNum + '_approved';
  let approvedAssessments: ApprovalType[] = [];
  if (typeof window !== 'undefined') {
    if (approvedKey in localStorage) {
      approvedAssessments = JSON.parse(
        localStorage.getItem(approvedKey) as string
      );
    }
  }
  return approvedAssessments;
}

export function getRawAnswers(taskNum: string): AnswerType[] {
  const rawKey: string = taskNum + '_data';
  let rawAssessments: AnswerType[] = [];
  if (typeof window !== 'undefined') {
    if (rawKey in localStorage) {
      rawAssessments = JSON.parse(localStorage.getItem(rawKey) as string);
    }
  }
  return rawAssessments;
}

export function getStartedAssessments(taskNum: string): AssessmentType[] {
  const startedKey: string = taskNum + '_assessments';
  let startedAssessments: AssessmentType[] = [];
  if (typeof window !== 'undefined') {
    if (startedKey in localStorage) {
      startedAssessments = JSON.parse(
        localStorage.getItem(startedKey) as string
      );
    }
  }
  return startedAssessments;
}

export function getAssessmentData(taskNum: string): AssessmentType[] {
  // get the different assessments from localstorage
  const raw: AnswerType[] = getRawAnswers(taskNum).slice(0, 10);
  const started: AssessmentType[] = getStartedAssessments(taskNum);
  const approved: ApprovalType[] = getApprovedAssessments(taskNum);

  // data to be returned
  let assessmentData: AssessmentType[] = [];

  // all answers have been assessed and approved, use approved data
  if (approved.length != 0) {
    assessmentData = approved;
  }
  // no assessments have been made for current task, use raw data
  else if (started.length == 0) {
    // convert to AssessmentType
    assessmentData = raw.map((answer: AnswerType) => ({
      score: '',
      isFlagged: false,
      ...answer,
    }));
  }

  // assessments have started for this task, but there are still some remaining answers
  else {
    const remainingAnswers = excludeArray2fromArray1(raw, started);

    // no remaining answers left, but not approved. This is for the back button in the approval page
    if (remainingAnswers.length == 0) {
      assessmentData = started;
    }
    // return all assessments, both those that are scored and those that are remaining
    else {
      const p = remainingAnswers.map((answer: AnswerType) => ({
        score: '',
        isFlagged: false,
        ...answer,
      }));

      assessmentData = started.concat(p);
    }
  }
  return assessmentData;
}

// Help function to get the remaining answers
function excludeArray2fromArray1(
  array1: AnswerType[],
  array2: AssessmentType[]
) {
  return array1.filter((object1) => {
    return !array2.some(
      (object2) => object1.candidateId === object2.candidateId
    );
  });
}

// check if all scores are set
export function checkScores(assessments: AssessmentType[]): boolean {
  return !assessments.some((e) => e.score === '');
}

// check if there are any inconsistent scores
export function checkInconsistentScores(assessments: ApprovalType[]): boolean {
  let status: boolean = false;
  assessments.map((assessment) => {
    if ('inconsistentScores' in assessment) {
      status = true;
    }
  });
  return status;
}

export function noRemainingAnswers(taskNum: number) {
  const taskNumber = taskNum.toString();
  const raw: AnswerType[] = getRawAnswers(taskNumber).slice(0, 10);
  const started: AssessmentType[] = getStartedAssessments(taskNumber);
  const remainingAnswers = excludeArray2fromArray1(raw, started);
  if (remainingAnswers.length == 0) {
    return true;
  }
}

export function getTaskTitle(taskNumber: number) {
  return data.ext_inspera_candidates[0].result.ext_inspera_questions[
    taskNumber - 1
  ].ext_inspera_questionTitle;
}
