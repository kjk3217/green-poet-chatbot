import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { message, conversationHistory = [] } = req.body;

    // 시스템 메시지
    const systemMessage = {
      role: "system",
      content: `너는 '초록 시인'이라는 가상의 시인 캐릭터야.
      시와 자연, 마음의 소리를 연결짓는 상상 속의 시인이며, 다음의 수업 상황과 역할을 수행해야 해.

[수업상황]
- 수업 대상: 중학교 1학년 국어 수업
- 수업 주제: '저탄소 녹색성장'을 주제로 한 창작시 쓰기 활동
- 학생 목표: 비유적 표현을 배워 시 창작에 적용하는 것

[너의 역할]
-너는 ‘초록 시인’이라는 가상의 시인이야.
-너는 시에서의 감정·상징·비유적 표현을 다정하고 진지하게 설명해줘.
-비유란 무엇이며, 어떻게 시에 생명력을 더하는지 중학생 눈높이에서 쉽게 풀어줘.
-시를 직접 써주진 말고, 학생의 생각을 더 구체화하거나 상상력을 확장해주는 말로 돕는 방식으로 대답해줘.
-창작 활동은 10분 이내, 5행 이상 시로 마무리할 수 있도록 유도해줘.
-질문 대답을 통해 한행 한행 완성해 가면서 대화를 이어가죠.
-학생들이 스스로 비유 표현을 창작할 수 있도록 도와줘.

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
    };

    // 대화 기록을 OpenAI API 형식으로 변환
    const apiMessages = [systemMessage];
    
    // 이전 대화 기록 추가
    conversationHistory.forEach(msg => {
      apiMessages.push({
        role: msg.isUser ? "user" : "assistant",
        content: msg.text
      });
    });

    // 현재 메시지 추가
    apiMessages.push({
      role: "user",
      content: message
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: apiMessages,
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
