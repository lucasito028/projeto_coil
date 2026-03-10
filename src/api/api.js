import axios from "axios";

const groqApi = import.meta.env.VITE_GROQ_API_KEY;

export async function buscarLugares(cidade, categorias) {
  console.log(groqApi);
  const prompt = `
  Me diga lugares para visitar em ${cidade}.
  Categorias: ${categorias}.

  Retorne em lista simples com:
  - Nome
  - Breve descrição
  `;

  const response = await axios.post(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ]
    },
    {
      headers: {
        Authorization: `Bearer ${groqApi}`,
        "Content-Type": "application/json"
      }
    }
  );

  return response.data.choices[0].message.content;
}