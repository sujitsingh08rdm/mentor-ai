const markdown = `# 🤖 Introduction to Artificial Intelligence

Artificial Intelligence (**AI**) is the science of creating machines capable of performing tasks that normally require human intelligence.

---

## 📖 What is AI?

AI enables computers to:

- Learn from data
- Solve problems
- Understand language
- Recognize images
- Make decisions

> AI is not magic. It is mathematics, algorithms, and data working together.

---

## ✨ Types of AI

| Type | Description |
|------|-------------|
| Narrow AI | Designed for one task |
| General AI | Human-level intelligence |
| Super AI | Beyond human intelligence |

---

## 🧠 Machine Learning

Machine Learning is a subset of AI.

Features include:

- Supervised Learning
- Unsupervised Learning
- Reinforcement Learning

---

## ✅ Example Code

\`\`\`javascript
function greet(name){
  return \`Hello \${name}\`;
}

console.log(greet("Student"));
\`\`\`

---

## 📌 Advantages

- Faster decisions
- Automation
- Better accuracy
- Cost reduction
- Personalized learning

---

## ⚠️ Challenges

- Bias
- Privacy
- Expensive training
- Ethical concerns

---

## 🎯 Summary

AI is transforming industries like:

- Healthcare
- Education
- Finance
- Agriculture
- Robotics

---

## 📝 Quiz

- What does AI stand for?
- What is Machine Learning?
- Name one advantage of AI.

Happy Learning 🚀
`;

const topics = [
  {
    id: 1,
    title: "Introduction to AI",
    duration: "8 mins",
    level: "Beginner",
    language: "English",
    content: markdown,
  },
  {
    id: 2,
    title: "Machine Learning",
    duration: "12 mins",
    level: "Beginner",
    language: "English",
    content: markdown,
  },
  {
    id: 3,
    title: "Deep Learning",
    duration: "15 mins",
    level: "Intermediate",
    language: "English",
    content: markdown,
  },
  {
    id: 4,
    title: "Neural Networks",
    duration: "18 mins",
    level: "Intermediate",
    language: "English",
    content: markdown,
  },
  {
    id: 5,
    title: "Computer Vision",
    duration: "20 mins",
    level: "Advanced",
    language: "English",
    content: markdown,
  },
  {
    id: 6,
    title: "Natural Language Processing",
    duration: "22 mins",
    level: "Advanced",
    language: "English",
    content: markdown,
  },
  {
    id: 7,
    title: "Generative AI",
    duration: "16 mins",
    level: "Intermediate",
    language: "English",
    content: markdown,
  },
  {
    id: 8,
    title: "Prompt Engineering",
    duration: "10 mins",
    level: "Beginner",
    language: "English",
    content: markdown,
  },
];

export default topics;