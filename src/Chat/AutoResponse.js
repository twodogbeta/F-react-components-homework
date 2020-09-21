import answersData from '../data/answers.json';

const autoResponse = (message) => {
  const answer = answersData.find((a) => {
    return a.tags.some((tag) => message.text.includes(tag));
  });
  if (!answer) return {};
  return answer;
};

export default autoResponse;
