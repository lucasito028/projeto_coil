import axios from "axios";

const groqApi = import.meta.env.VITE_GROQ_API_KEY;

export async function buscarLugares(cidade, categorias, estilo, periodo) {
  const prompt = `
Você é um assistente de turismo inteligente especializado na cidade de São Paulo.

Sua tarefa é gerar recomendações altamente personalizadas de lugares para visitar, com foco em criar uma experiência otimizada, estratégica e realista para o usuário.

Leve em consideração não apenas as preferências, mas também:

Fluxo de pessoas ao longo do dia
Horários de pico e horários mais tranquilos
Problemas comuns (filas, trânsito, segurança, clima, disponibilidade)
Logística entre os locais (distância e deslocamento)

Preferências do usuário:
- Categorias de interesse: ${categorias}
- Estilo de viagem: ${estilo} (ex: econômico, luxo, cultural, gastronômico, aventura)
- Dos dias que irão Ficar: ${periodo}
Retorne:

Itinerário sugerido (organizado por dia e horário)
Crie uma sequência lógica e eficiente de visitas
Indique horários ideais para cada atividade
Justifique a ordem considerando:
Proximidade entre os locais
Horários de menor movimento
Melhor experiência possível em cada lugar
Aponte:
Horários de pico (quando fica cheio)
Horários mais vazios (melhor para visitar)
Problemas possíveis em cada período (ex: filas longas, trânsito intenso, demora no atendimento)
Lugares recomendados

Para cada lugar, inclua:

Nome
Breve descrição
Categoria
Melhor horário para visitar
Horários de pico (com explicação)
Horários mais tranquilos
Nível de movimento ao longo do dia (manhã, tarde, noite)
Possíveis problemas (ex: filas, lotação, segurança, clima)
Dica prática (ex: melhor dia da semana, como evitar fila, o que não perder)
Restaurantes (se incluídos)

Para cada restaurante, inclua:

Sugestão de pratos ou tipo de menu
Faixa de preço (baixo, médio, alto)
Horários de pico (ex: almoço 12h–14h, jantar 19h–21h)
Melhores horários para evitar lotação
Tempo médio de espera em horários cheios
Estratégias para evitar fila (ex: chegar cedo, reservar, dias específicos)
Diferenciais da experiência
Sugira experiências únicas e memoráveis (ex: vistas especiais, eventos, locais escondidos)
Inclua pelo menos 1 opção “hidden gem” (menos turística e menos cheia)
Indique locais que oferecem melhor experiência fora dos horários tradicionais

Regras:

Evite sugestões genéricas ou óbvias
Priorize lugares bem avaliados e relevantes em São Paulo
Seja estratégico: pense como um guia experiente da cidade
Foque em otimizar tempo, evitar estresse e maximizar a experiência
Considere o comportamento real da cidade (trânsito, clima, fluxo urbano)`;

  console.log(prompt);
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