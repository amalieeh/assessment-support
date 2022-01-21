export default function cleanHtmlText(content:string) {
    var cleanHtml = removePTags(content);
    var cleanHtml = cleanHtml.replace(/&#160;/g, ' ');
    var cleanHtml = cleanHtml.replace(/&#230;/g, 'æ'); 
    var cleanHtml = cleanHtml.replace(/&#248;/g, 'ø'); 
    var cleanHtml = cleanHtml.replace(/&#229;/g, 'å'); 
    var cleanHtml = cleanHtml.replace(/&#62;/g, '>'); 


    return cleanHtml;
}

function removePTags(htmlString: string) {
    var stripedHtml = htmlString.replace(/<p>/g, '');
    var stripedHtml = stripedHtml.replace(/<\/p>/g, '\n');
    return stripedHtml;
}


