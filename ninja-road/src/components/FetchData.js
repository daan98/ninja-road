import React from 'react';
// import anilist from 'anilist-node';

const FetchData = () => {

    /* const Anilist = new anilist();
    Anilist.people.character
    Anilist.media.anime(21708).then(data => {
        console.log(data);
    }).catch(error => console.log(error))

    return(
        <div>
            {console.log('typeof lala')}
        </div>
    ) */

    // Trying to fetch characters information
    const query = `
query ($id: Int) { # Define which variables will be used in the query (id)
  Media (id: $id, type: ANIME) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
    id
    title {
        romaji
        english
        native
    }
    characters {
        edges { # Array of character edges
            role
            voiceActors { # Array of voice actors of this character for the anime
                id
                name {
                  first
                  last
                }
              }
        }
    }
    type
    genres
    episodes
    status
    duration
    format
  }
}
`;

// Define our query variables and values that will be used in the query request
const variables = {
    id: 20
};

// Define the config we'll need for our Api request
const url = 'https://graphql.anilist.co',
    options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: query,
            variables: variables
        })
    };

// Make the HTTP Api request
fetch(url, options).then(handleResponse)
                   .then(handleData)
                   .catch(handleError);

function handleResponse(response) {
    return response.json().then(function (json) {
        return response.ok ? json : Promise.reject(json);
    });
}

function handleData(data) {
    console.log(data);
}

function handleError(error) {
    alert('Error, check console');
    console.error(error);
}
}

export default FetchData;