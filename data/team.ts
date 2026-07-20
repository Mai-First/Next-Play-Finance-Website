// Bios come from the NPF investor advisory deck.
// To add photos later: drop files in /public/team/ and set image: "/team/name.jpg".
export type TeamMember = {
  name: string;
  initials: string;
  role: string;
  school: string;
  major: string;
  bio: string;
  image?: string;
};

export const team = {
  eyebrow: "The team",
  headline: "Meet the Roster.",
  members: [
    {
      name: "Josh Becher",
      initials: "JB",
      role: "CEO & Co-Director of Curriculum",
      school: "Columbia University",
      major: "Financial Economics",
      bio: "Investment banking analyst. Previously built a financial literacy program for graduating high school seniors.",
    },
    {
      name: "Quinn O'Malley",
      initials: "QO",
      role: "Finance & Legal",
      school: "SMU",
      major: "Economics & Statistics",
      bio: "Law firm intern. CEO & founder of a quantitative strategies licensing company.",
    },
    {
      name: "Mai First",
      initials: "MF",
      role: "CTO",
      school: "Columbia University",
      major: "Data Science",
      bio: "Intern at an AI management company. Built curriculum for 5,000+ students. IBM certified.",
    },
    {
      name: "Rafa Snyder",
      initials: "RS",
      role: "Director of Outreach",
      school: "Wake Forest University",
      major: "Economics & Mathematics",
      bio: "Co-founder of a financial education club.",
    },
  ] satisfies TeamMember[],
};
