import { AnswerType } from "../types/Types";

export function sortAnswers(answers: AnswerType[], sortingType: string){
    if (sortingType == "random"){
        randomSort(answers);
    }
    if (sortingType == "length_hl"){ // sorted on length, high to low
        lengthSort(answers);
    }
    if (sortingType == "length_lh"){ // sorted on length, low to high
        lengthSort(answers);
        answers.reverse();
    }
};

function randomSort(array: AnswerType[]){
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  };
};

function lengthSort(array: AnswerType[]){
    array.sort(function(a, b){
        // ASC  -> a.length - b.length
        // DESC -> b.length - a.length
        return b.answer.length - a.answer.length;
      });
};
