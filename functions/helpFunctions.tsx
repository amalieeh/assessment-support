import type { TextboxDataType } from '../types/Types';

export default function cleanHtmlText(content:string) {
    if (content == undefined) {
        return
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

export function insperaDataToTextboxObject( insperaData: any ) {
    const textboxData: TextboxDataType[] = [];
    insperaData.ext_inspera_candidates.map((candidate: any) => {
        textboxData.push({
        answerId: candidate.result,
        answer: cleanHtmlText(candidate.result.ext_inspera_questions[0].ext_inspera_candidateResponses[0].ext_inspera_response),
        maxPoints: 3,
    })});
    console.log(insperaData);
    return textboxData;
}

