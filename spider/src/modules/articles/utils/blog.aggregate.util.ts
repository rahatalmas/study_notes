//object used in aggregation
//for sanitizing response
export let blogProject = {
        status:1,
        title:1,
        content:1,
        summary:1,
        tags:1,
        likes:1,
        comments:1,
        author:{
                fullname:1,
                username:1,
                dp_uri:1
              }
}