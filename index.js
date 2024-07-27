const { OpenAI } = require("openai");

client = new OpenAI({
    apiKey: process.env.API_KEY,
  });

const getResponse = async (genres, authors) => {
  const response = client.chat.completions.create({
    model: "gpt-3.5-turbo",
    max_tokens: 150,
    messages: [{ role: "user", content: `recommend some books for someone who loves the following genres: "${genres}" and the following authors: "${authors}"`   
 }],
  });

  // Handle potential errors during API call
  if (response.status !== 200) {
    console.error("Error:", response.statusText);
    return null; // Handle error appropriately
  } else {
    return response.data.choices[0].message.content;
  }
};


const readline = require('readline');

const rl = readline.createInterface({
input: process.stdin,
output: process.stdout
});

const getGenres = () => {
return new Promise((resolve, reject) => {
rl.question('List your favourite genres with a comma after each (e.g. sci-fi, fantasy..):\n', (answer) => {
resolve(answer)
})})
}

const getAuthors = () => {
return new Promise((resolve, reject) => {
rl.question('List your favourite authors with a comma after each (e.g. phillip k dick, george rr martin..):\n', (answer) => {
resolve(answer)
})
})
}

const run = async() => {
const genres = await getGenres()
const authors = await getAuthors()
rl.close()
console.log(await getResponse(genres, authors))
}

run()