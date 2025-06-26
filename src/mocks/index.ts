import type { MessageItem } from "~types"

export const mockedMessages: MessageItem[] = [
  {
    id: "1",
    role: "user",
    content: "Okay, can you introduce yourself"
  },
  {
    id: "2",
    role: "user",
    content: "All right, my name is Tom, I live in Nanjing, I am 30 years old. Thanks for inviting me to the interview"
  },
  {
    id: "3",
    role: "user",
    content: "Great, Tom. Can you tell me about your educational background?"
  },
  {
    id: "4",
    role: "user",
    content:
      "Sure. I graduated from Nanjing University with a bachelor's degree in Computer Science. I also completed a master's degree in Software Engineering from the same university."
  },
  {
    id: "5",
    role: "user",
    content: "Impressive. What about your work experience?"
  },
  {
    id: "6",
    role: "user",
    content:
      "I have been working as a full-stack developer for the past 5 years. I started my career at a startup where I gained experience in various technologies. For the last 3 years, I've been working at a larger tech company, focusing on developing and maintaining large-scale web applications."
  },
  {
    id: "7",
    role: "user",
    content: "That sounds interesting. Can you describe a challenging project you've worked on recently?"
  },
  {
    id: "8",
    role: "user",
    content:
      "Certainly. One of the most challenging projects I worked on was developing a real-time collaboration tool for remote teams. We had to implement complex synchronization algorithms and ensure low latency across different geographical locations. It was challenging but also very rewarding when we successfully launched the product."
  }
]
