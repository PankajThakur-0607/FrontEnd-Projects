document.addEventListener("DOMContentLoaded", async () => {
  const displayQuote = document.getElementById("generate-quotes");
  const newQuoteBtn = document.getElementById("new-quote");
  const authorName = document.getElementById("author-name");

  async function updateQuote() {
    try {
      const data = await fetchData();
      console.log(data);
      const {
        data: { author, content },
      } = data;

      //   console.log(author);
      //   console.log(content);
      displayQuote.style.opacity = 0; // Fade out
      authorName.style.opacity = 0;
      setTimeout(() => {
        displayQuote.textContent = `${content}`;
        authorName.textContent = `${author}`;
        displayQuote.style.opacity = 1; // Fade out
        authorName.style.opacity = 1;
      }, 300);
    } catch (error) {
      console.log(
        "error is : ",
        { message: error.message },
        { name: error.name }
      );
    }
  }

  await updateQuote();

  newQuoteBtn.addEventListener("click", updateQuote);
});

async function fetchData() {
  const URL = `https://api.freeapi.app/api/v1/public/quotes/quote/random`;
  const response = await fetch(URL);
  if (!response.ok) {
    throw new Error(`Error is : ${response.status}`);
  }
  const data = await response.json();
  return data;
}
