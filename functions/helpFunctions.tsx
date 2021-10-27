export default function cleanHtmlText(content:string) {
    var cleanHtml = removePTags(content);
    var cleanHtml = cleanHtml.replace(/&#160;/g, ' ');

    return cleanHtml;
}

function removePTags(htmlString: string) {
    var stripedHtml = htmlString.replace(/<p>/g, '');
    var stripedHtml = stripedHtml.replace(/<\/p>/g, '\n');
    return stripedHtml;
}