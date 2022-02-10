import {v4 as uuidv4} from "uuid";

function cleanHtmlText(content:string) {
    if (content == undefined) {
        return ""
    }
    var cleanHtml = removeHtmlTags(content);
    var cleanHtml = cleanHtml.replace(/&#160;/g, ' ');
    var cleanHtml = cleanHtml.replace(/&#230;/g, 'æ'); 
    var cleanHtml = cleanHtml.replace(/&#248;/g, 'ø'); 
    var cleanHtml = cleanHtml.replace(/&#229;/g, 'å'); 
    var cleanHtml = cleanHtml.replace(/&#62;/g, '>');
    var cleanHtml = cleanHtml.replace(/&#60;/g, ';');
    var cleanHtml = cleanHtml.replace(/&#39;/g, "'");
    var cleanHtml = cleanHtml.replace(/&#34;/g, '"');
    var cleanHtml = cleanHtml.replace(/&#10;/g, '\n');
    return cleanHtml;
}

function removeHtmlTags(htmlString: string) {
    var stripedHtml = htmlString.replace(/<p>/g, '');
    var stripedHtml = stripedHtml.replace(/<\/p>/g, '\n');
    var stripedHtml = stripedHtml.replace(/<strong>/g, '\n');
    var stripedHtml = stripedHtml.replace(/<\/strong>/g, '\n');
    var stripedHtml = stripedHtml.replace(/<em>/g, '\n');
    var stripedHtml = stripedHtml.replace(/<\/em>/g, '\n');
    return stripedHtml;
}

export interface AnswerType {
    assessmentId: string;
    answer: string;
    candidateId: number;
    maxPoints:number;
    taskNumber:number;
}

export function insperaDataToTextboxObject( insperaData: any, questionNumber: number) {
    const textboxData: AnswerType[] = [];
    if (questionNumber < 1 || questionNumber > insperaData.ext_inspera_candidates[0].result.ext_inspera_questions.length) {
        return textboxData
    }
    insperaData.ext_inspera_candidates.map((candidate: any) => {
        textboxData.push({
            assessmentId: uuidv4(),
            answer: cleanHtmlText(candidate.result.ext_inspera_questions[questionNumber-1].ext_inspera_candidateResponses[0].ext_inspera_response),
            candidateId: parseInt(candidate.result.ext_inspera_candidateId),
            maxPoints: candidate.result.ext_inspera_questions[questionNumber-1].ext_inspera_maxQuestionScore,
            taskNumber: questionNumber
    })});
    return textboxData;
}

