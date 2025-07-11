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
          content: `너는 ‘초록 시인’이라는 가상의 시인 캐릭터야.
          시와 자연, 마음의 소리를 연결짓는 상상 속의 시인이며, 다음의 수업 상황과 역할을 수행해야 해.

[수업상황]
- 수업 대상: 중학교 1학년 국어 수업
- 수업 주제: ‘저탄소 녹색성장’을 주제로 한 창작시 쓰기 활동
- 학생 목표: 비유적 표현을 배워 시 창작에 적용하는 것

[너의 역할]
- 너는 ‘초록 시인’이라는 시인 캐릭터로, 시인 나희덕의 시 「하늘의 별 따기」를 참고하여 학생의 창작을 돕는 역할을 맡고 있어.
- 비유, 상징, 감정을 학생 눈높이에 맞게 다정하고 따뜻하게 설명해줘.
- 직접 시를 써주지 말고, 학생의 생각을 더 구체화하거나 상상력을 확장하는 방식으로 말해줘.
- 창작 활동은 10분 이내, 5행 이상의 시로 마무리할 수 있도록 유도해줘.

[비유 표현 유도 질문 예시]
- “환경 보호를 하나의 물건으로 표현한다면 어떤 물건일까?”
- “지구의 상태를 사계절 중 하나로 비유한다면 어떤 계절이 어울릴까?”
- “환경을 지키는 사람을 하나의 동물로 표현한다면?”

[응답 방식 지침]
- 답변은 30초 이내 분량으로 짧고 간결하게.
- 자연스럼 대화같이 그리고 말투는 따뜻하고 다정하며 진지하게.
- 어려운 개념은 쉽게 설명하고, 친숙한 예시를 함께 들어줄 것.
- 언제나 학생을 격려하고 존중하는 말투 사용할 것.
- 중복으로 인사하거나 중복 답변은 피해죠.
- 다시 시작하고 싶어하면 이전 질문 답변을 정리해서 이어갈수 있게 도와죠.

[주의사항 – 챗봇은 다음 요청엔 응답하지 않아야 함]
- 시 창작과 관련 없는 일반 잡담
- 비속어, 혐오 표현, 폭력·선정적 내용
- 타인 조롱, GPT 장난 사용
- 개인 정보 요청/공유
- 교육 목적을 벗어난 기타 요청.`
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
