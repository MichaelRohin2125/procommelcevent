export type EventCategory = 'technical' | 'non-technical';

export interface Event {
    id: number;
    title: string;
    category: EventCategory;
    date: string;
    location: string;
    description: string;
    fullDescription: string;
    teamSize: string;
    time: string;
    venue: string;
    image: string;
    instructions: string;
    eligibility: string;
    eventFee: number;
    rounds: {
        name: string;
        mode: string;
        date: string;
        desc: string;
    }[];
    coordinators: {
        student: string[];
        staff: string[];
    };
}

export const eventsData: Event[] = [
    {

       
    id: 3,
    title: "Promptverse",
    category: 'technical' as EventCategory,
    date: "March 30, 2026",
    location: "Sri Sairam Engineering College",
    description: "A Stranger Things–inspired AI challenge exploring prompt engineering and creative AI outputs.",
    fullDescription: "Promptverse is a Stranger Things–inspired AI challenge where participants explore the power of prompt engineering to create and control AI-generated outputs. The event tests creativity, logical thinking, and communication skills, pushing teams to transform simple ideas into impactful digital solutions.",
    teamSize: "3 members",
    time: "9:00 AM - 4:00 PM",
    venue: "Sri Sairam Engineering College",
    image: "/src/data/promptverse.png",
    instructions: "Teams of 3 must bring a laptop with Ethernet cable and follow prompt limits; AI is allowed only in the specified round.",
    eligibility: "Open to all students from any department and year.",
    eventFee: 100,
    rounds: [
        { 
            name: "Round 1: PromptDecode", 
            mode: "Offline", 
            date: "March 30", 
            desc: "Write clear prompts to accurately recreate the given image." 
        },
        { 
            name: "Round 2: WebForge", 
            mode: "Offline", 
            date: "March 30", 
            desc: "Build a complete website for a given sector using only limited prompt attempts." 
        }
    ],
    coordinators: {
        student: [
            "Sripavithra Devi M - 8220853163",
            "Ezhil M - 9600577214"
        ],
        staff: [
            "Ms. P.R. Maya\nAssistant Professor\nDepartment of English\nSri Sairam Engineering College"
        ]
    }

    },
    {
        
    id: 11,
    title: "Portal of Innovations",
    category: 'technical' as EventCategory,
    date: "March 30, 2026",
    location: "Sri Sairam Engineering College",
    description: "A platform for presenting innovative ideas, projects, and prototypes with real-world impact.",
    fullDescription: "Portal of Innovations is a platform where ideas step out of imagination and enter reality. Participants present their concepts, projects, or prototypes by explaining the thought, purpose, and real-world impact behind them. This event encourages originality, problem-solving, and innovation while creatively connecting ideas to the Stranger Things theme. It provides a stage for students to showcase their technical knowledge, creativity, and presentation skills.",
    teamSize: "3 to 4 members",
    time: "9:00 AM - 4:00 PM",
    venue: "Sri Sairam Engineering College",
    image: "/src/data/poi.png",
    instructions: "Ideas must be original and innovative. Creative connection with Stranger Things theme is mandatory. Prototype/demo is optional but earns bonus marks. Strictly follow the time limit (5+2 minutes). Maintain professional behavior during presentation and Q&A. Jury decisions are final.",
    eligibility: "Open to all students.",
    eventFee: 100,
    rounds: [
        { 
            name: "Presentation (PPT + Prototype)", 
            mode: "Offline", 
            date: "March 30", 
            desc: "Teams present their innovative idea, concept, or project. A working prototype, simulation, or demonstration can be included to showcase practical implementation." 
        }
    ],
    coordinators: {
        student: [
            "Jai Krithika R - 8122341110",
            "Saranya P P - 8122930692"
        ],
        staff: [
            "Srija\nAssistant Professor\nDepartment of English\nSri Sairam Engineering College"
        ]
    }


    },
    {
        
    id: 4,
    title: "Upside Dub",
    category: 'non-technical' as EventCategory,
    date: "March 30, 2026",
    location: "Sri Sairam Engineering College",
    description: "A creative communication event focused on dialogue decoding, genre transformation, and live narration.",
    fullDescription: "UpsideDub is an offline creative communication event designed to evaluate participants’ imagination, observation skills, language proficiency, and spontaneous thinking through visual and text-based cinematic challenges. The event focuses on reinterpreting familiar content by decoding dialogues, transforming genres, and performing live narration based entirely on visual cues. Participants compete in teams across three structured rounds that progressively test analytical thinking, creativity, and improvisation. The event emphasizes teamwork, expressive communication, and originality in a fun and engaging environment. Winners are determined based on cumulative performance across all rounds.",
    teamSize: "2 members",
    time: "9:00 AM - 4:00 PM",
    venue: "Sri Sairam Engineering College",
    image: "/src/data/usd.png",
    instructions: "English must be used for all dialogues and narration. Vulgar, offensive, or inappropriate content is strictly prohibited. Teams must adhere to time limits. All team members must participate actively. Judges’ decisions are final.",
    eligibility: "Open to all students.",
    eventFee: 50,
    rounds: [
        { 
            name: "Round 1: Dialogue Decode", 
            mode: "Offline", 
            date: "March 30", 
            desc: "Famous movie dialogues are displayed as text. Teams identify the correct movie title and can earn bonus points for creative subtitle rewrites. Top 15 teams advance." 
        },
        { 
            name: "Round 2: Genre Switched", 
            mode: "Offline", 
            date: "March 30", 
            desc: "Muted video clips are played. Teams reinterpret the clip by changing its genre and creating matching dialogues. Top 5 teams advance." 
        },
        { 
            name: "Round 3: Live Narration", 
            mode: "Offline", 
            date: "March 30", 
            desc: "Teams perform live narration for a video clip during playback without prior scripting." 
        }
    ],
    coordinators: {
        student: [
            "Saai Shrinidhi S V - 9042969359",
            "Jefrin M - 8524024061"
        ],
        staff: [
            "Dr. S. Kogila\nAssistant Professor\nDepartment of English\nSri Sairam Engineering College"
        ]
    }

    },
    {
        
    id: 5,
    title: "Neo Hawkins",
    category: 'technical' as EventCategory,
    date: "March 30, 2026",
    location: "Sri Sairam Engineering College",
    description: "A gamified technical event combining coding, debugging, logic, and UI/UX challenges in a Monopoly-style board game.",
    fullDescription: "Neo Hawkins is an offline, gamified technical event designed to test participants’ problem-solving, coding, debugging, logical reasoning, and UI/UX design skills through an interactive Monopoly-style board game. Participants roll dice on a physical board and land on different task blocks such as coding (DSA-based), debugging, logic, and UI/UX design. Each block presents a randomly selected challenge from a prepared task pool, making the competition dynamic and engaging.",
    teamSize: "s to 4 members",
    time: "9:00 AM - 4:00 PM",
    venue: "Sri Sairam Engineering College",
    image: "/src/data/nh.png",
    instructions: "Each team must bring at least one laptop. Internet usage is partially allowed only for code execution under supervision. Searching for solutions or copying code is strictly prohibited. Use of AI tools (ChatGPT, Copilot, etc.) is strictly prohibited. All team members must participate actively. Judges’ decisions are final.",
    eligibility: "Open to all students.",
    eventFee: 100,
    rounds: [
        { 
            name: "Round 1: Problem Solving & Debugging", 
            mode: "Offline", 
            date: "March 30", 
            desc: "Participants roll the dice on a Monopoly-style board and solve coding, debugging, and penalty tasks based on where they land." 
        },
        { 
            name: "Round 2: UI/UX Design & Bonus", 
            mode: "Offline", 
            date: "March 30", 
            desc: "Participants roll the dice and complete UI/UX challenges of varying difficulty levels (easy, medium, hard)." 
        }
    ],
    coordinators: {
        student: [
            "Sudharson Manikandan R - 9789446671",
            "Aruna Priya R S - 9629782641"
        ],
        staff: [
            "Dr. Geetha A\nAssistant Professor\nDepartment of English\nSri Sairam Engineering College"
        ]
    }

    },
    {
        
    id: 6,
    title: "Upside Down Crisis",
    category: 'technical' as EventCategory,
    date: "March 30, 2026",
    location: "Sri Sairam Engineering College",
    description: "A technical challenge focused on circuit failures, problem-solving, and real-world system design.",
    fullDescription: "Upside Down Crisis is a technical challenge where participants explore real-world circuit and system failures. The event tests problem-solving ability, logical thinking, and hands-on skills, pushing teams to analyze problems and build effective solutions under time constraints.",
    teamSize: "3 members",
    time: "9:00 AM - 4:00 PM",
    venue: "Sri Sairam Engineering College",
    image: "/src/data/usc.png",
    instructions: "Teams of 3 must bring two laptops with Ethernet cables and a TinkerCAD account. Participants should have basic knowledge of Arduino (C programming) and complete tasks within the given time.",
    eligibility: "Open to all students.",
    eventFee: 100,
    rounds: [
        { 
            name: "Round 1: The First Disturbance", 
            mode: "Offline", 
            date: "March 30 ", 
            desc: "Participants solve technical and logic-based challenges to test analytical thinking and core electronics knowledge." 
        },
        { 
            name: "Round 2: Into the Upside Down", 
            mode: "Offline", 
            date: "March 30", 
            desc: "Teams design and simulate a working solution in TinkerCAD based on a given problem statement." 
        },
        { 
            name: "Round 3: Escape Protocol", 
            mode: "Offline", 
            date: "March 30", 
            desc: "Teams present their solution, explaining design, logic, and working to the jury." 
        }
    ],
    coordinators: {
        student: [
            "Thivyadarsini M - 9087542187",
            "Kanimozhi R - 7708942006"
        ],
        staff: [
            "Dr. K. Rajesh\nAssistant Professor\nDepartment of English\nSri Sairam Engineering College"
        ]
    }

    },
    {
      
    id: 7,
    title: "Escape the Upside Down",
    category: 'technical' as EventCategory,
    date: "March 30, 2026",
    location: "Sri Sairam Engineering College",
    description: "A digital, story-driven escape room event focused on puzzles, logic, and teamwork.",
    fullDescription: "Escape the Upside Down is a digital, story-driven escape room event where participants solve hidden puzzles, clues, and mini challenges to progress. The event focuses on logical thinking, observation, and teamwork with a cyber-inspired theme.",
    teamSize: "2 to 3 members",
    time: "9:00 AM - 4:00 PM",
    venue: "Sri Sairam Engineering College",
    image: "/src/data/etud.png",
    instructions: "Each team must bring at least one laptop. Internet usage is strictly prohibited. Use of AI tools is strictly prohibited. No communication between teams. All members must participate. Judges’ decisions are final.",
    eligibility: "Open to all students.",
    eventFee: 100,
    rounds: [
        { 
            name: "Main Gameplay Session", 
            mode: "Offline", 
            date: "March 30", 
            desc: "Participants solve a series of interconnected hidden puzzles, clues, and mini challenges within the given time." 
        },
        { 
            name: "Final Scoring & Results", 
            mode: "Offline", 
            date: "March 30", 
            desc: "Teams are evaluated based on number of challenges solved and time taken." 
        },
        { 
            name: "Winner Announcement", 
            mode: "Offline", 
            date: "March 30", 
            desc: "Final results are घोषित and winners are announced." 
        }
    ],
    coordinators: {
        student: [
            "Samarjeeth R - +91 9445571382",
            "Nithish R - +91 6369343445"
        ],
        staff: [
            "Ms. Mini Stanely\nAssociate Professor\nDepartment of English\nSri Sairam Engineering College"
        ]
    }




    },
    {
        
    id: 8,
    title: "Survivox",
    category: 'non-technical' as EventCategory,
    date: "March 30, 2026",
    location: "Sri Sairam Engineering College",
    description: "An individual event testing communication, creativity, and spontaneity through persuasive roleplay.",
    fullDescription: "Survivox is a creative communication event where participants imagine themselves as famous personalities on a sinking ship. With only one lifejacket available, each participant must convincingly argue why they deserve to survive. The event tests strategic thinking, creativity, communication, and spontaneity as participants justify their importance and strengths within a limited time.",
    teamSize: "Individual",
    time: "9:00 AM - 4:00 PM",
    venue: "Sri Sairam Engineering College",
    image: "/src/data/survivox.png",
    instructions: "Speech should be in English only. Characters will be disclosed on the spot. Avoid inappropriate or vulgar content. Adhere to time limits. Judges’ decisions are final.",
    eligibility: "Open to all students.",
    eventFee: 25,
    rounds: [
        { 
            name: "Main Round: Survival Pitch", 
            mode: "Offline", 
            date: "March 30", 
            desc: "Participants assume the role of a given personality and deliver a 2-minute persuasive speech to convince the captain to give them the lifejacket." 
        }
    ],
    coordinators: {
        student: [
            "Palaparthi Nandini - 9894178103",
            "Nayana J S - 8056782510"
        ],
        staff: [
            "Ms. S. Anuradha\nAssistant Professor\nDepartment of English\nSri Sairam Engineering College",
            "Dr. R V. Sivaraman\nAssistant Professor\nDepartment of English\nSri Sairam Engineering College"
        ]
    }

    },
    {
        
    id: 9,
    title: "Case 404: Reality Not Found",
    category: 'non-technical' as EventCategory,
    date: "March 30, 2026",
    location: "Sri Sairam Engineering College",
    description: "An immersive investigative challenge where teams solve a mysterious case using logic, language, and deduction.",
    fullDescription: "Case 404: Reality Not Found is an immersive, LA Noire–inspired investigative challenge where teams act as detectives solving a mysterious incident using language as their only weapon. There are no physical clues — only witness statements, handwritten notes, transcripts, and hidden linguistic inconsistencies. Facts feel distorted, testimonies don't align, and reality itself becomes unreliable, pushing participants to uncover the truth through sharp reasoning and analysis.",
    teamSize: "2 to 3 members",
    time: "9:00 AM - 4:00 PM",
    venue: "Sri Sairam Engineering College",
    image: "/src/data/case404.png",
    instructions: "Each team must bring a pen and notebook. AI tools, mobile phones, and smart devices are strictly prohibited. All teams must be present for every round. Judges’ decisions are final.",
    eligibility: "Open to all students with strong English comprehension, logical reasoning, and analytical skills.",
    eventFee: 50,
    rounds: [
        { 
            name: "Round 1: Signal Detected", 
            mode: "Offline", 
            date: "March 30", 
            desc: "Teams analyze a simple case snapshot with a clear logical conclusion and submit their findings." 
        },
        { 
            name: "Round 2: Distorted Testimonies", 
            mode: "Offline", 
            date: "March 30", 
            desc: "A moderate case with multiple documents and witness transcripts. Teams identify contradictions with limited questioning." 
        },
        { 
            name: "Round 3: Reality Check", 
            mode: "Offline", 
            date: "March 30", 
            desc: "Teams choose a suspect in a complex case and defend their reasoning using motive, means, and opportunity." 
        }
    ],
    coordinators: {
        student: [
            "Pranavaashree J - 9043631278",
            "Hariprasath JG - 9487223547"
        ],
        staff: [
            "Ms. M. Monisha\nAssistant Professor\nDepartment of English\nSri Sairam Engineering College"
        ]
    }

    },
    {
        
    id: 10,
    title: "MemeStorm",
    category: 'non-technical' as EventCategory,
    date: "March 30, 2026",
    location: "Sri Sairam Engineering College",
    description: "A creative event where participants explain technical concepts using memes.",
    fullDescription: "MemeStorm is a fun and creative event where participants explain technology concepts using memes. It encourages students to combine technical knowledge with humor to simplify complex ideas in an engaging way. The event promotes creativity, digital skills, and innovative thinking through entertaining and informative meme-based content.",
    teamSize: "2 members",
    time: "9:00 AM - 4:00 PM",
    venue: "Sri Sairam Engineering College",
    image: "/src/data/memestorm.png",
    instructions: "Memes must be original and digitally created. Plagiarism is strictly prohibited. Only technical topics are allowed. Vulgar or offensive content is not permitted. Jury decisions are final. Participants should bring their own laptop.",
    eligibility: "Open to all students.",
    eventFee: 50,
    rounds: [
        { 
            name: "Round 1: Meme Creation & Explanation", 
            mode: "Offline", 
            date: "March 30", 
            desc: "Teams create an original meme on a given technical topic and explain the concept clearly and simply." 
        },
        { 
            name: "Round 2: Meme Story (Comic Style)", 
            mode: "Offline", 
            date: "March 30", 
            desc: "Teams create a short comic-style meme story (2–4 frames) presenting a technical concept in a logical and creative way." 
        }
    ],
    coordinators: {
        student: [
            "Madhu Sri R - 7826045804",
            "Keertana P - 6382760098"
        ],
        staff: [
            "Dr. J. Ranjith Kumar\nAssociate Professor\nDepartment of English\nSri Sairam Engineering College"
        ]
    }

    }
];