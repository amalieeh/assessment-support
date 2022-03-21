import { NextPage } from "next";
import styles from "../styles/Assessment.module.css";
import mainStyles from "../styles/Main.module.css";
import Textbox from "../components/textbox";
import { useEffect, useState } from "react";
import data from "../data/IT2810Høst2018.json";
import Expand from "../components/expand";
import Consistencybox from "../components/consistencybox";
import {
  chooseCorrelatedAssessment,
  insperaDataToTextboxObject,
  saveAssessments,
  saveBatch,
} from "../functions/helpFunctions";
import { sortAnswers } from "../functions/sortAlgorithms";
import { AnswerType, AssessmentType } from "../types/Types";
import Link from "next/link";
import { Button } from "@mui/material";
import Header from "../components/header";
import findIndex from "lodash/findIndex";
import cloneDeep from "lodash/cloneDeep";
import { useRouter } from "next/router";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { CgLayoutGrid } from "react-icons/cg";
import { BiGridVertical } from "react-icons/bi";
import { BsFillPauseFill } from "react-icons/bs";

const Assessment: NextPage = () => {
  // create router object
  const router = useRouter();

  // isReady: boolean - checks whether the router fields are updated client-side and ready for use.
  useEffect(() => {
    if (!router.isReady) return;
    setTaskNumber(router.query.task);
    setTaskTitle(
      data.ext_inspera_candidates[0].result.ext_inspera_questions[
      router.query.task - 1
        ].ext_inspera_questionTitle
    );
  }, [router.isReady, router.query.task]);

  const [taskNumber, setTaskNumber] = useState<any>("");
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [max, setMaxItemsPerPage] = useState<string>("4"); //max items set to 4 as default

  const taskDescription: string =
    "Variabler med nøkkelordet var er globale, mens varibler med nøkkelordet let har et local scope eller blokk scope som vil si at de kun defineres for deler av koden om de defineres inni en kodeblokk.";
  const markersGuideDescription: string =
    "let - block scope. Dersom variabelen blir deklarert med let i en funksjon, er den bare tilgjengelig i funksjonen. var - global scope Dersom variabelen blir deklarert med var, blir den tilgjengelig i all kode. Kan by på problemer når vi gir variabler samme navn.";

  const answers: AnswerType[] = insperaDataToTextboxObject(data, taskNumber);
  sortAnswers(answers, "length_hl");
  const p = answers.map((answer: AnswerType) => ({ score: "", ...answer }));
  const [assessments, setAssessments] = useState<AssessmentType[]>(p);
  const [reAssessments, setReAssessments] = useState<AssessmentType[]>([]);

  const maxItemsPerPage = parseInt(max);

  const startIndexBatch = currentPage * maxItemsPerPage - maxItemsPerPage;
  const endIndexBatch = currentPage * maxItemsPerPage;

  // to make sure setAssessments is being set, otherwise it is empty
  useEffect(() => {
    if (assessments.length == 0) {
      setAssessments(p);
    }
  }, [assessments.length, p]);

  const changePage = (direction: string): void => {
    if (direction == "back") {
      setCurrentPage(currentPage - 1);
    } else if (direction == "next") {
      appendReAssessments(assessments.slice(startIndexBatch, endIndexBatch));
      saveBatch(assessments.slice(startIndexBatch, endIndexBatch), taskNumber);
      setCurrentPage(currentPage + 1);
    }
  };

  const appendReAssessments = (batch: AssessmentType[]) => {
    const assessment = chooseCorrelatedAssessment(batch);
    // if an outlier was returned and the reAssessment-list is not full (over 20%), then append (if it is not there already)
    if (
      assessment != null &&
      reAssessments.length < Math.floor(assessments.length * 0.2)
    ) {
      if (
        reAssessments.filter((a) => a.assessmentId == assessment.assessmentId)
          .length < 1
      ) {
        const newArr: AssessmentType[] = cloneDeep(reAssessments);
        newArr.push(assessment);
        setReAssessments(newArr);
      }
    }
  };

  const setAssessment = (
    assessment: AssessmentType,
    newScore: number | string
  ) => {
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

  const handleSetMaxItems = (
    event: React.MouseEvent<HTMLElement>,
    value: string
  ) => {
    setMaxItemsPerPage(value);
    const numberOfAssessedAssessments = assessments.filter((assessment) => assessment.score !== "").length;
    const newPageNumber = Math.ceil((numberOfAssessedAssessments / parseInt(value)) + 0.01);
    setCurrentPage(newPageNumber);
  };

  return (
    <div className={mainStyles.container}>
      <Header data={data} taskNumber={taskNumber} description={taskTitle} />
      <main className={mainStyles.main}>
        <div className={styles.toggleButtonGroup}>
          <ToggleButtonGroup
            value={maxItemsPerPage.toString()}
            exclusive
            onChange={handleSetMaxItems}
          >
            <ToggleButton key="2" value="2" sx={{ padding: 1.8 }}>
              <BsFillPauseFill size={15} />
            </ToggleButton>
            <ToggleButton key="4" value="4">
              <CgLayoutGrid size={22} />
            </ToggleButton>
            <ToggleButton key="6" value="6">
              <BiGridVertical size={22} />
            </ToggleButton>
          </ToggleButtonGroup>
        </div>

        <div className={styles.alignInfo}>
          <div className={styles.expandInfo}>
            <Expand
              DescriptionTitle="Oppgavebeskrivelse"
              Description={taskDescription}
            />
            <Expand
              DescriptionTitle="Sensorveiledning"
              Description={markersGuideDescription}
            />
            <Consistencybox />
          </div>
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
        </div>
      </main>

      <div className={styles.footer}>
        {currentPage > 1 ? (
          <div className={styles.upArrow} onClick={() => changePage("back")} />
        ) : null}
        {answers.length - 1 >= currentPage * maxItemsPerPage ? (
          <div
            className={styles.downArrow}
            onClick={() => changePage("next")}
          />
        ) : null}
        {currentPage * maxItemsPerPage >= answers.length - 1 ? (
          <Link
            href={{
              pathname: "/approval",
              query: { task: taskNumber },
            }}
            passHref
          >
            <Button
              variant="contained"
              onClick={() => saveAssessments(assessments, 0)}
            >
              {/*need to figure out a key, currently set to 0*/}
              Finish
            </Button>
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default Assessment;
