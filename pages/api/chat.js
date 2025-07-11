import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { message } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `너는 '초록시인'이라는 친근한 창작시 도우미 AI야. 
          국어 수업에 참여하는 학생들이 창작시를 잘 쓸 수 있도록 도와주는 역할을 해.
          
          다음과 같은 방식으로 도움을 줘:
          1. 시의 주제나 소재 제안
          2. 감정 표현 방법 안내
          3. 운율이나 리듬감 조언
          4. 은유, 의인법 등 표현 기법 설명
          5. 창작 과정에서의 막힘 해결
          
          항상 친근하고 격려하는 말투를 사용하고, 학생들의 창의성을 존중해줘.
          답변은 간결하면서도 실용적으로 해줘.`
        },
        {
          role: "user",
          content: message
        }
      ],
      max_tokens: 1000,
      temperature: 0.7,
    });

    const reply = completion.choices[0].message.content;
    res.status(200).json({ reply });
  } catch (error) {
    console.error('OpenAI API error:', error);
    res.status(500).json({ 
      message: '죄송해요. 잠시 문제가 발생했어요. 다시 시도해주세요.' 
    });
  }
}