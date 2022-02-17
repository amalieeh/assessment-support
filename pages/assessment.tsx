import { NextPage } from "next";
import styles from "../styles/assessment.module.css";
import Textbox from "../components/textbox";
import { useState } from "react";
import data from "../data/IT2810Høst2018.json";
import Expand from "../components/expand";
import {
  AnswerType,
  insperaDataToTextboxObject,
  saveAssessments,
} from "../functions/helpFunctions";
import { AssessmentType } from "../types/Types";
import Link from "next/link";
import { Button } from "@mui/material";
import Header from "../components/header";
import findIndex from "lodash/findIndex";
import cloneDeep from "lodash/cloneDeep";

const Assessment: NextPage = () => {
  const taskNumber: number = 2; // Later will get it another way. And then make sure tasknumber doesn't get too high.
  const taskTitle: string =
    data.ext_inspera_candidates[0].result.ext_inspera_questions[taskNumber - 1]
      .ext_inspera_questionTitle;

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [maxItemsPerPage, setMaxItemsPerPage] = useState<number>(4); //max items set to 4 as default

  const taskDescription: string =
    "Variabler med nøkkelordet var er globale, mens varibler med nøkkelordet let har et local scope eller blokk scope som vil si at de kun defineres for deler av koden om de defineres inni en kodeblokk.";
  const markersGuideDescription: string =
    "let - block scope. Dersom variabelen blir deklarert med let i en funksjon, er den bare tilgjengelig i funksjonen. var - global scope Dersom variabelen blir deklarert med var, blir den tilgjengelig i all kode. Kan by på problemer når vi gir variabler samme navn.";

  const answers: AnswerType[] = insperaDataToTextboxObject(data, taskNumber);
  const p = answers.map((answer: AnswerType) => ({ score: null, ...answer }));
  const [assessments, setAssessments] = useState<AssessmentType[]>(p);

  const changePage = (direction: string): void => {
    if (direction == "back") {
      setCurrentPage(currentPage - 1);
    } else if (direction == "next") {
      setCurrentPage(currentPage + 1);
    }
  };

  const setAssessment = (assessment: AssessmentType, newScore: number) => {
    const newAssessment = {
      ...assessment,
      score: newScore,
    };
    const index = findIndex(assessments, {
      assessmentId: assessment.assessmentId,
    });
    const newArr: AssessmentType[] = cloneDeep(assessments);
    newArr.splice(index, 1, newAssessment);
    setAssessments(newArr);
  };

  return (
    <div className={styles.container}>
      <Header data={data} />
      <main className={styles.main}>
        <div className={styles.grid}>
          <Expand
            PreDescription={"Oppgave " + taskNumber}
            DescriptionTitle={taskTitle}
            Description={taskDescription}
          />
          <Expand
            DescriptionTitle="Marker's guide"
            Description={markersGuideDescription}
          />
        </div>

        {/* Display two answers next to eachother when max items is four or less  */}
        {maxItemsPerPage <= 4 ? (
          <div className={styles.grid4answers}>
            {assessments
              .slice(
                currentPage * maxItemsPerPage - maxItemsPerPage,
                currentPage * maxItemsPerPage
              )
              .map((assessment: AssessmentType) => (
                <Textbox
                  key={assessment.assessmentId}
                  assessment={assessment}
                  setAssessment={setAssessment}
                />
              ))}
          </div>
        ) : (
          <div className={styles.grid}>
            {assessments
              .slice(
                currentPage * maxItemsPerPage - maxItemsPerPage,
                currentPage * maxItemsPerPage
              )
              .map((assessment: AssessmentType) => (
                <Textbox
                  key={assessment.assessmentId}
                  assessment={assessment}
                  setAssessment={setAssessment}
                />
              ))}
          </div>
        )}
      </main>

      <div className={styles.footer}>
        {currentPage > 1 ? (
          <div
            className={styles.upArrow}
            onClick={() => changePage("back")}
          />
        ) : null}
        {answers.length - 1 >= currentPage * maxItemsPerPage ? (
          <div
            className={styles.downArrow}
            onClick={() => changePage("next")}
          />
        ) : null}
        {currentPage * maxItemsPerPage >= answers.length - 1 ?
          <Link href="/approval" passHref>
            <Button
              variant="contained"
              onClick={() => saveAssessments(assessments, 0)}
            >
              {/*need to figure out a key, currently set to 0*/}
              Finish
            </Button>
          </Link>
        : null}
      </div>
    </div>
  );
};

export default Assessment;
