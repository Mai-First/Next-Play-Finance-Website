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

export type Partner = {
  name: string;
  initials: string;
  tag: "Partner" | "Advisor";
  title: string;
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
      image: "/team/josh-becher.jpg",
    },
    {
      name: "Quinn O'Malley",
      initials: "QO",
      role: "Finance & Legal",
      school: "SMU",
      major: "Economics & Statistics",
      bio: "Law firm intern. CEO & founder of a quantitative strategies licensing company.",
      image: "/team/quinn-omalley.jpg",
    },
    {
      name: "Mai First",
      initials: "MF",
      role: "CTO",
      school: "Columbia University",
      major: "Data Science",
      bio: "Intern at an AI management company. Built curriculum for 5,000+ students. IBM certified.",
      image: "/team/mai-first.jpg",
    },
    {
      name: "Rafa Snyder",
      initials: "RS",
      role: "Director of Outreach",
      school: "Wake Forest University",
      major: "Economics & Mathematics",
      bio: "Co-founder of a financial education club.",
      image: "/team/rafa-snyder.jpg",
    },
    {
      name: "Grayson Clemons",
      initials: "GC",
      role: "Chief of Business Development",
      school: "Drexel University",
      major: "Finance & Accounting",
      bio: "Financial forecasting intern. 1/24 in the Drexel Finance Impact Competition.",
      image: "/team/grayson-clemons.jpg",
    },
  ] satisfies TeamMember[],

  // TODO(Mai): temporary placeholder partners/advisors — replace with
  // confirmed names, titles, and permission to list them before launch.
  partners: [
    {
      name: "Jay Cannel",
      initials: "JC",
      tag: "Partner",
      title: "Wells Fargo",
    },
    {
      name: "Professor X",
      initials: "PX",
      tag: "Advisor",
      title: "Professor",
    },
    {
      name: "Athlete X",
      initials: "AX",
      tag: "Advisor",
      title: "Athlete",
    },
    {
      name: "Sharks President",
      initials: "SP",
      tag: "Advisor",
      title: "President, Sharks",
    },
  ] as Partner[],
};
