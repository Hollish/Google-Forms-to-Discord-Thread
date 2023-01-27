const POST_URL = "WEBBHOOK URL";

function onSubmit(e) {
    const response = e.response.getItemResponses();
    let items = [];
    let name = "";

    for (const responseAnswer of response) {
        const question = responseAnswer.getItem().getTitle();
        const answer = responseAnswer.getResponse();
        if (question == "What is your Username / Gamertag?"){
          name = answer
        }

        let parts = []

        try {
            parts = answer.match(/[\s\S]{1,1024}/g) || [];
        } catch (e) {
            parts = answer;
        }

        for (const [index, part] of Object.entries(parts)) {
            if (index == 0) { 
                items.push({
                    "name": question,
                    "value": part,
                    "inline": false
                });
            } else {
                items.push({
                    "name": question.concat(" (cont.)"),
                    "value": part,
                    "inline": false
                });
            }
        }
    }

    const options = {
        "method": "post",
        "headers": {
            "Content-Type": "application/json",
        },
        "payload": JSON.stringify({
            "content": "",
            "thread_name": name, //Use this to create forum posts.
            "embeds": [{
                "title": "Application Details",
                "color": 33023, // This is optional, you can look for decimal colour codes at https://www.webtoolkitonline.com/hexadecimal-decimal-color-converter.html
                "fields": items,
                "timestamp": new Date().toISOString()
            }]
        })
    };

    UrlFetchApp.fetch(POST_URL, options);
};
