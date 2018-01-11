const commentSectionSelectors = [
    'div#comments',
    'div#disqus_thread',
    'div.CommentBox',
    'div.comments',
    'footer#comments'
];

// XXX load a list of rules from user settings somehow?
// XXX look for /\d+\s+(thought|comment|response)/
function findComments() {
    for(let selector of commentSectionSelectors) {
        let commentsSection = document.querySelector(selector);
        if(commentsSection != null) {
            return commentsSection;
        }
    }
    return null;
}

function main() {
    let commentsSection = findComments();
    if(commentsSection == null) {
        return;
    }

    let commentsPosition = commentsSection.getBoundingClientRect().top + window.pageYOffset;
    let documentHeight = document.body.getBoundingClientRect().height;

    let commentMarker = document.createElement('div');
    commentMarker.style.position = 'fixed';
    commentMarker.style.top = Math.floor(commentsPosition / documentHeight * document.documentElement.clientHeight) + 'px';
    commentMarker.style.right = '0px';
    commentMarker.style.backgroundColor = 'red';
    commentMarker.style.width = '20px';
    commentMarker.style.height = '5px';

    document.body.appendChild(commentMarker);

    window.addEventListener('resize', function() {
        commentMarker.style.top = Math.floor(commentsPosition / documentHeight * document.documentElement.clientHeight) + 'px';
    });
}

main();
