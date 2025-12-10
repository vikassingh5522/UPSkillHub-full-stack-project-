import { Course, ServiceItem, BlogPost } from './types';

export const COURSES: Course[] = [
  {
    id: '1',
    title: 'Complete Full Stack Web Development Bootcamp',
    instructor: 'Sarah Jenkins',
    rating: 4.8,
    students: 12500,
    price: 89.99,
    category: 'Development',
    image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '42 hours',
    level: 'Beginner',
    description: "Become a full-stack web developer with just one course. HTML, CSS, Javascript, Node, React, MongoDB and more! This comprehensive bootcamp is designed to take you from a complete beginner to a job-ready developer. You will build real-world projects, learn best practices, and master the modern tech stack.",
    whatYouWillLearn: [
      "Build full-stack web applications from scratch",
      "Master frontend development with React and Redux",
      "Create robust backends using Node.js and Express",
      "Design and manage databases with MongoDB",
      "Implement authentication and security best practices",
      "Deploy applications to the cloud"
    ],
    syllabus: [
      { title: "Introduction to Web Development", items: ["HTML5 Basics", "CSS3 Styling", "Responsive Design"] },
      { title: "Javascript Fundamentals", items: ["Variables & Data Types", "Functions & Loops", "DOM Manipulation"] },
      { title: "Frontend Frameworks", items: ["React Basics", "State Management", "Hooks & Context API"] },
      { title: "Backend Development", items: ["Node.js Environment", "Express Server", "RESTful APIs"] }
    ],
    lastUpdated: "October 2025",
    language: "English",
    prerequisites: ["No programming experience needed", "A computer with internet access"]
  },
  {
    id: '2',
    title: 'Python for Data Science and Machine Learning',
    instructor: 'Dr. Alan Grant',
    rating: 4.9,
    students: 8300,
    price: 0,
    category: 'Data Science',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '25 hours',
    level: 'Intermediate',
    description: "Learn how to use NumPy, Pandas, Seaborn, Matplotlib, Plotly, Scikit-Learn, Machine Learning, Tensorflow, and more! This course guides you through the entire data science pipeline, from data cleaning and visualization to building powerful machine learning models.",
    whatYouWillLearn: [
      "Use Python for Data Science and Machine Learning",
      "Implement Machine Learning Algorithms",
      "Learn to use NumPy for Numerical Data",
      "Use Pandas for Data Analysis",
      "Matplotlib and Seaborn for data visualization"
    ],
    syllabus: [
      { title: "Python Crash Course", items: ["Data Types", "Functions", "Logic"] },
      { title: "Data Analysis", items: ["NumPy Arrays", "Pandas DataFrames", "Data Cleaning"] },
      { title: "Visualization", items: ["Matplotlib", "Seaborn", "Plotly"] },
      { title: "Machine Learning", items: ["Linear Regression", "Logistic Regression", "K-Nearest Neighbors"] }
    ],
    lastUpdated: "September 2025",
    language: "English",
    prerequisites: ["Basic understanding of programming concepts", "High school math knowledge"]
  },
  {
    id: '3',
    title: 'UI/UX Design Masterclass: Adobe XD & Figma',
    instructor: 'Emily Chen',
    rating: 4.7,
    students: 5400,
    price: 49.99,
    category: 'Design',
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '18 hours',
    level: 'Beginner',
    description: "Learn to design websites and mobile apps that users love. This course covers the entire design process, from user research and wireframing to high-fidelity prototyping and user testing using industry-standard tools like Figma and Adobe XD.",
    whatYouWillLearn: [
      "Master Figma and Adobe XD",
      "Understand User Interface vs User Experience",
      "Create Wireframes and Prototypes",
      "Build a Design System",
      "Conduct User Research and Testing"
    ],
    syllabus: [
      { title: "Design Fundamentals", items: ["Color Theory", "Typography", "Layout & Composition"] },
      { title: "Figma Essentials", items: ["Interface Tour", "Vector Shapes", "Constraints & Auto Layout"] },
      { title: "Prototyping", items: ["Transitions", "Animations", "Micro-interactions"] },
      { title: "Career in Design", items: ["Portfolio Building", "Freelancing", "Interview Prep"] }
    ],
    lastUpdated: "November 2025",
    language: "English",
    prerequisites: ["No design experience needed", "Interest in creative work"]
  },
  {
    id: '4',
    title: 'AWS Certified Solutions Architect Associate',
    instructor: 'Cloud Gurus',
    rating: 4.9,
    students: 15000,
    price: 129.99,
    category: 'Cloud',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '50 hours',
    level: 'Advanced',
    description: "Prepare for the SAA-C03 exam with the most comprehensive course available. Deep dive into AWS services, architecture patterns, and best practices. Perfect for anyone looking to validate their cloud skills and advance their career.",
    whatYouWillLearn: [
      "Pass the AWS Certified Solutions Architect Associate Exam",
      "Design Highly Available and Scalable Systems",
      "Master IAM, S3, EC2, RDS, and VPC",
      "Understand Serverless Computing with Lambda",
      "Implement Security and Cost Optimization strategies"
    ],
    syllabus: [
      { title: "AWS Fundamentals", items: ["Global Infrastructure", "IAM", "EC2 Basics"] },
      { title: "Storage & Databases", items: ["S3", "EBS & EFS", "RDS & DynamoDB"] },
      { title: "Networking", items: ["VPC", "Route53", "CloudFront"] },
      { title: "Serverless & Application Services", items: ["Lambda", "API Gateway", "SQS & SNS"] }
    ],
    lastUpdated: "December 2025",
    language: "English",
    prerequisites: ["Basic knowledge of IT infrastructure", "Networking fundamentals"]
  },
  {
    id: '5',
    title: 'Modern React with Redux and TypeScript',
    instructor: 'John Smilga',
    rating: 4.8,
    students: 9200,
    price: 0,
    category: 'Development',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '32 hours',
    level: 'Intermediate',
    description: "Master React.js by building real-world projects. This course focuses on modern practices, including Hooks, Redux Toolkit, and TypeScript integration. By the end, you'll have a portfolio of professional-grade applications.",
    whatYouWillLearn: [
      "Build dynamic web apps with React",
      "Manage complex state with Redux Toolkit",
      "Integrate TypeScript for type safety",
      "Handle side effects and async data",
      "Optimize performance with Memoization"
    ],
    syllabus: [
      { title: "React Core", items: ["JSX", "Props & State", "Component Lifecycle"] },
      { title: "Advanced Hooks", items: ["useReducer", "useContext", "Custom Hooks"] },
      { title: "State Management", items: ["Redux Concepts", "Redux Toolkit", "RTK Query"] },
      { title: "TypeScript Integration", items: ["Interfaces", "Generics", "Typing Props & State"] }
    ],
    lastUpdated: "October 2025",
    language: "English",
    prerequisites: ["Solid understanding of JavaScript (ES6)", "HTML & CSS basics"]
  },
  {
    id: '6',
    title: 'Ethical Hacking: Beginner to Advanced',
    instructor: 'Cyber Safe',
    rating: 4.6,
    students: 3000,
    price: 99.99,
    category: 'Cybersecurity',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '28 hours',
    level: 'Intermediate',
    description: "Learn ethical hacking, penetration testing, and network security. This hands-on course simulates real-world attacks to teach you how to defend against them. You will learn to think like a hacker to secure systems effectively.",
    whatYouWillLearn: [
      "Perform Penetration Testing",
      "Scan networks for vulnerabilities",
      "Exploit web applications (SQL Injection, XSS)",
      "Crack passwords and secure networks",
      "Write your own hacking tools in Python"
    ],
    syllabus: [
      { title: "Introduction", items: ["Setting up the Lab", "Linux Basics", "Anonymity"] },
      { title: "Network Hacking", items: ["Pre-connection Attacks", "WEP/WPA Cracking", "Man-in-the-Middle"] },
      { title: "Web Application Hacking", items: ["Reconnaissance", "Vulnerability Scanning", "Exploitation"] },
      { title: "Post Exploitation", items: ["Privilege Escalation", "Backdoors", "Reporting"] }
    ],
    lastUpdated: "August 2025",
    language: "English",
    prerequisites: ["Basic IT skills", "Familiarity with operating systems (Linux preferred)"]
  },
  {
    id: '7',
    title: 'Generative AI Fundamentals',
    instructor: 'Tech Forward',
    rating: 5.0,
    students: 1200,
    price: 0,
    category: 'AI',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '8 hours',
    level: 'Beginner',
    description: "Dive into the world of Generative AI. Understand how Large Language Models (LLMs) and Image Generation models work. Learn to use tools like Gemini, ChatGPT, and Midjourney to boost productivity and creativity.",
    whatYouWillLearn: [
      "Understand the history and mechanics of GenAI",
      "Master Prompt Engineering techniques",
      "Use APIs to integrate AI into applications",
      "Navigate ethics and limitations of AI",
      "Create text, code, and images with AI"
    ],
    syllabus: [
      { title: "GenAI Basics", items: ["What is Generative AI?", "LLMs vs Traditional AI", "Use Cases"] },
      { title: "Prompt Engineering", items: ["Zero-shot vs Few-shot", "Chain of Thought", "Best Practices"] },
      { title: "AI Tools", items: ["Using Gemini", "Image Generation Tools", "Coding Assistants"] },
      { title: "Future of AI", items: ["Ethics", "Societal Impact", "Upcoming Trends"] }
    ],
    lastUpdated: "January 2025",
    language: "English",
    prerequisites: ["No prior AI knowledge required"]
  },
  {
    id: '8',
    title: 'Project Management Professional (PMP) Prep',
    instructor: 'Business Leaders',
    rating: 4.5,
    students: 4500,
    price: 149.99,
    category: 'Business',
    image: 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '35 hours',
    level: 'Advanced',
    description: "Get the skills and knowledge you need to pass the PMP certification exam on your first try. This course covers the PMBOK Guide 7th Edition, Agile methodologies, and real-world project management scenarios.",
    whatYouWillLearn: [
      "Understand PMBOK Guide concepts",
      "Master Traditional (Waterfall) and Agile methodologies",
      "Manage project scope, schedule, and cost",
      "Lead and motivate project teams",
      "Manage stakeholders and communications"
    ],
    syllabus: [
      { title: "Project Foundations", items: ["Project Lifecycle", "Organizational Structure", "Role of PM"] },
      { title: "Process Groups", items: ["Initiating", "Planning", "Executing", "Monitoring", "Closing"] },
      { title: "Agile & Hybrid", items: ["Scrum Framework", "Kanban", "Hybrid Models"] },
      { title: "Exam Prep", items: ["Mock Exams", "Tips & Tricks", "Application Process"] }
    ],
    lastUpdated: "November 2025",
    language: "English",
    prerequisites: ["Secondary degree (high school diploma, associate's degree or the global equivalent)", "7,500 hours leading and directing projects"]
  },
  {
    id: '9',
    title: 'Robotics Engineering with Arduino',
    instructor: 'Mech Labs',
    rating: 4.7,
    students: 2100,
    price: 69.99,
    category: 'Robotics',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '20 hours',
    level: 'Beginner',
    description: "Start your journey into robotics. Learn to build and program your own robots using Arduino. This course covers electronics basics, sensors, motors, and C++ programming for microcontrollers.",
    whatYouWillLearn: [
      "Understand basic electronics and circuits",
      "Program Arduino microcontrollers with C++",
      "Work with sensors (ultrasonic, IR) and actuators",
      "Build a line-following and obstacle-avoiding robot",
      "Debug hardware and software issues"
    ],
    syllabus: [
      { title: "Electronics Basics", items: ["Voltage & Current", "Resistors & LEDs", "Breadboarding"] },
      { title: "Arduino Programming", items: ["Digital I/O", "Analog Signals", "Libraries"] },
      { title: "Building the Robot", items: ["Chassis Assembly", "Motor Drivers", "Power Management"] },
      { title: "Automation", items: ["Sensor Integration", "Control Logic", "Autonomous Navigation"] }
    ],
    lastUpdated: "January 2025",
    language: "English",
    prerequisites: []
  },
  {
    id: '10',
    title: 'Evolutionary AI & Genetic Algorithms',
    instructor: 'Dr. Sarah Connor',
    rating: 4.8,
    students: 1800,
    price: 0,
    category: 'AI',
    image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '15 hours',
    level: 'Advanced',
    description: "Explore the fascinating world of Genetic AI and Evolutionary Computation. Learn how to simulate biological evolution to solve complex optimization problems that traditional algorithms can't handle.",
    whatYouWillLearn: [
      "Understand Natural Selection in Computing",
      "Implement Genetic Algorithms from scratch in Python",
      "Solve Optimization Problems (Traveling Salesman, Knapsack)",
      "Evolve Neural Networks (Neuroevolution)",
      "Apply Evolutionary Strategies to Robotics"
    ],
    syllabus: [
      { title: "Foundations", items: ["Population", "Fitness Function", "Selection", "Crossover", "Mutation"] },
      { title: "Implementation", items: ["Coding a GA in Python", "Visualizing Evolution", "Hyperparameter Tuning"] },
      { title: "Advanced Topics", items: ["Multi-objective Optimization", "Co-evolution", "Genetic Programming"] },
      { title: "Real-world Apps", items: ["Game AI", "Engineering Design", "Financial Modeling"] }
    ],
    lastUpdated: "December 2025",
    language: "English",
    prerequisites: []
  },
  {
    id: '11',
    title: 'Quantum Computing for Everyone',
    instructor: 'Quantum Leap Academy',
    rating: 4.6,
    students: 1500,
    price: 0,
    category: 'Future Tech',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '10 hours',
    level: 'Beginner',
    description: "Quantum computing is the next frontier. This course breaks down complex physics into understandable concepts. Learn about Qubits, Superposition, Entanglement, and how they will revolutionize technology.",
    whatYouWillLearn: [
      "Grasp the basics of Quantum Physics",
      "Understand Qubits vs Classical Bits",
      "Explore Quantum Gates and Circuits",
      "Run your first program on a real Quantum Computer (IBM Q)",
      "Understand Quantum Cryptography impacts"
    ],
    syllabus: [
      { title: "Quantum Concepts", items: ["Superposition", "Entanglement", "Interference"] },
      { title: "Quantum Hardware", items: ["Superconducting Qubits", "Trapped Ions", "Photonic"] },
      { title: "Programming", items: ["Qiskit Basics", "Quantum Hello World", "Grover's Algorithm"] },
      { title: "Future Outlook", items: ["Quantum Advantage", "Post-Quantum Cryptography", "Timeline"] }
    ],
    lastUpdated: "February 2025",
    language: "English",
    prerequisites: []
  },
  {
    id: '12',
    title: 'Web3 & Blockchain Development Guide',
    instructor: 'Block Chainy',
    rating: 4.7,
    students: 6500,
    price: 119.99,
    category: 'Development',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '40 hours',
    level: 'Intermediate',
    description: "Transition from Web2 to Web3. Master Solidity, Ethereum, Smart Contracts, and DApps. This course provides a comprehensive path to becoming a Blockchain Developer in the decentralized web.",
    whatYouWillLearn: [
      "Understand Blockchain architecture",
      "Write Smart Contracts with Solidity",
      "Test and Deploy to Ethereum Testnets",
      "Build frontend DApps with Ethers.js and React",
      "Secure Smart Contracts against hacks"
    ],
    syllabus: [
      { title: "Blockchain 101", items: ["Distributed Ledger", "Hashing", "Consensus Mechanisms"] },
      { title: "Solidity Development", items: ["Data Types", "Functions", "Modifiers", "Events"] },
      { title: "Tools & Frameworks", items: ["Hardhat", "Metamask", "Remix IDE"] },
      { title: "Full Stack DApp", items: ["Connecting Frontend", "Wallet Integration", "IPFS"] }
    ],
    lastUpdated: "January 2025",
    language: "English",
    prerequisites: []
  },
  {
    id: '13',
    title: 'Advanced Robotics: ROS2 & Navigation',
    instructor: 'RoboCorp',
    rating: 4.9,
    students: 950,
    price: 149.99,
    category: 'Robotics',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '45 hours',
    level: 'Advanced',
    description: "Master the Robot Operating System (ROS2), the industry standard for robotics software. Learn to create complex robotic systems with perception, navigation, and manipulation capabilities.",
    whatYouWillLearn: [
      "Master ROS2 Architecture (Nodes, Topics, Services)",
      "Implement SLAM (Simultaneous Localization and Mapping)",
      "Program Autonomous Navigation stacks",
      "Simulate robots in Gazebo",
      "Integrate LiDAR and Camera data"
    ],
    syllabus: [
      { title: "ROS2 Basics", items: ["Installation", "Workspace Setup", "Python & C++ Clients"] },
      { title: "Simulation", items: ["URDF Modeling", "Gazebo Physics", "Rviz Visualization"] },
      { title: "Navigation", items: ["Nav2 Stack", "Path Planning", "Obstacle Avoidance"] },
      { title: "Computer Vision", items: ["OpenCV with ROS", "Object Detection", "Visual Servoing"] }
    ],
    lastUpdated: "November 2025",
    language: "English",
    prerequisites: []
  },
  {
    id: '14',
    title: 'Building LLM Applications with LangChain',
    instructor: 'AI Pioneers',
    rating: 4.8,
    students: 5600,
    price: 99.99,
    category: 'AI',
    image: 'https://images.unsplash.com/photo-1591453089816-0fbb971b454c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '15 hours',
    level: 'Intermediate',
    description: "Go beyond ChatGPT prompts. Learn to build powerful applications using Large Language Models (LLMs). Master LangChain, vector databases, and OpenAI API to create custom chatbots and agents.",
    whatYouWillLearn: [
      "Build AI Applications using LangChain framework",
      "Implement RAG (Retrieval Augmented Generation)",
      "Work with Vector Databases (Pinecone, Chroma)",
      "Create Autonomous AI Agents",
      "Deploy LLM apps to production"
    ],
    syllabus: [
      { title: "LLM Foundations", items: ["APIs", "Embeddings", "Tokenization"] },
      { title: "LangChain Core", items: ["Chains", "Prompts", "Memory", "Output Parsers"] },
      { title: "RAG Systems", items: ["Document Loading", "Splitting", "Retrieval"] },
      { title: "Building Agents", items: ["Tools", "Reasoning", "ReAct Pattern"] }
    ],
    lastUpdated: "March 2025",
    language: "English",
    prerequisites: []
  },
  {
    id: '15',
    title: 'IoT: Internet of Things Masterclass',
    instructor: 'Connect Ed',
    rating: 4.6,
    students: 3200,
    price: 59.99,
    category: 'Future Tech',
    image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '22 hours',
    level: 'Intermediate',
    description: "Connect the physical world to the digital world. Learn to build IoT devices using ESP32 and Raspberry Pi. Visualize sensor data on the cloud and control devices remotely.",
    whatYouWillLearn: [
      "Program ESP32 and Raspberry Pi",
      "Understand IoT Protocols (MQTT, HTTP, CoAP)",
      "Build Cloud Dashboards (AWS IoT, Blynk)",
      "Implement Home Automation",
      "Secure IoT Devices"
    ],
    syllabus: [
      { title: "Hardware Intro", items: ["Microcontrollers", "Sensors", "Networking Modules"] },
      { title: "Connectivity", items: ["WiFi setup", "MQTT Broker", "Pub/Sub Model"] },
      { title: "Cloud Platforms", items: ["AWS IoT Core", "Data Visualization", "Alerts"] },
      { title: "Edge Computing", items: ["Running AI on Edge", "Power Optimization", "OTA Updates"] }
    ],
    lastUpdated: "January 2025",
    language: "English",
    prerequisites: []
  },
  {
    id: '16',
    title: 'Rust Programming for Systems',
    instructor: 'Systems Pro',
    rating: 4.9,
    students: 2500,
    price: 0,
    category: 'Development',
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '30 hours',
    level: 'Advanced',
    description: "Learn Rust, the most loved programming language. Master memory safety without garbage collection, concurrency, and systems programming. Perfect for building high-performance applications.",
    whatYouWillLearn: [
      "Master Rust Syntax and Semantics",
      "Understand Ownership and Borrowing",
      "Write Safe Concurrent Code",
      "Build Command Line Tools",
      "WebAssembly with Rust"
    ],
    syllabus: [
      { title: "Rust Basics", items: ["Variables", "Control Flow", "Ownership"] },
      { title: "Data Structures", items: ["Structs", "Enums", "Vectors", "HashMaps"] },
      { title: "Advanced Rust", items: ["Traits", "Generics", "Lifetimes", "Error Handling"] },
      { title: "Concurrency", items: ["Threads", "Channels", "Async/Await"] }
    ],
    lastUpdated: "February 2025",
    language: "English",
    prerequisites: []
  },
  {
    id: '17',
    title: 'Digital Marketing & SEO Strategy',
    instructor: 'Growth Hackers',
    rating: 4.5,
    students: 11000,
    price: 0,
    category: 'Marketing',
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '18 hours',
    level: 'Beginner',
    description: "Master the art of Digital Marketing. Learn Search Engine Optimization (SEO), Social Media Marketing, Content Strategy, and Analytics to grow any business online.",
    whatYouWillLearn: [
      "Conduct Keyword Research and On-page SEO",
      "Run effective Google Ads campaigns",
      "Create engaging Social Media strategies",
      "Analyze traffic with Google Analytics 4",
      "Email Marketing automation"
    ],
    syllabus: [
      { title: "SEO Fundamentals", items: ["How Search Engines Work", "Keyword Research", "Link Building"] },
      { title: "Content Marketing", items: ["Strategy", "Copywriting", "Distribution"] },
      { title: "Paid Advertising", items: ["PPC Basics", "Ad Targeting", "Retargeting"] },
      { title: "Analytics", items: ["Tracking Conversions", "User Behavior", "Reporting"] }
    ],
    lastUpdated: "December 2025",
    language: "English",
    prerequisites: []
  },
  {
    id: '18',
    title: 'Unity 3D Game Development',
    instructor: 'Game Dev Pro',
    rating: 4.8,
    students: 4200,
    price: 59.99,
    category: 'Development',
    image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '40 hours',
    level: 'Beginner',
    description: "Create your own 3D games with Unity and C#. This course covers everything from the editor basics to physics, animation, lighting, and scripting. Publish your first game to PC and Mobile.",
    whatYouWillLearn: [
      "Master the Unity Interface",
      "Script game logic with C#",
      "Implement Physics and Collisions",
      "Design 3D Levels and Environments",
      "Build UI and Menus"
    ],
    syllabus: [
      { title: "Unity Basics", items: ["Installation", "Interface", "GameObjects"] },
      { title: "C# Scripting", items: ["Variables", "Methods", "Classes", "Unity API"] },
      { title: "Game Mechanics", items: ["Player Movement", "Shooting", "Scoring"] },
      { title: "Polish & Publish", items: ["Particle Effects", "Audio", "Build Settings"] }
    ],
    lastUpdated: "January 2025",
    language: "English",
    prerequisites: []
  },
  {
    id: '19',
    title: 'Google Cloud Professional Architect',
    instructor: 'Cloud Certified',
    rating: 4.8,
    students: 3100,
    price: 139.99,
    category: 'Cloud',
    image: 'https://images.unsplash.com/photo-1484557985045-edf25e08da73?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '45 hours',
    level: 'Advanced',
    description: "Become a Google Cloud Professional Cloud Architect. Learn to design, develop, and manage robust, secure, scalable, highly available, and dynamic solutions to drive business objectives.",
    whatYouWillLearn: [
      "Design and plan a cloud solution architecture",
      "Manage and provision the cloud infrastructure",
      "Design for security and compliance",
      "Analyze and optimize technical and business processes",
      "Manage implementation of cloud architecture"
    ],
    syllabus: [
      { title: "GCP Fundamentals", items: ["Compute Engine", "App Engine", "Kubernetes Engine"] },
      { title: "Storage & Data", items: ["Cloud Storage", "BigQuery", "Cloud SQL"] },
      { title: "Networking", items: ["VPC", "Load Balancing", "Hybrid Connectivity"] },
      { title: "Security", items: ["IAM", "Security Command Center", "Encryption"] }
    ],
    lastUpdated: "February 2025",
    language: "English",
    prerequisites: []
  },
  {
    id: '20',
    title: 'Certified Information Systems Security Professional (CISSP)',
    instructor: 'Secure Net',
    rating: 4.7,
    students: 2200,
    price: 199.99,
    category: 'Cybersecurity',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '60 hours',
    level: 'Advanced',
    description: "The gold standard in information security. This course prepares you for the CISSP exam, covering all 8 domains of the Common Body of Knowledge (CBK). Essential for senior security careers.",
    whatYouWillLearn: [
      "Master the 8 CISSP Domains",
      "Understand Security and Risk Management",
      "Asset Security and Engineering",
      "Communication and Network Security",
      "Identity and Access Management (IAM)"
    ],
    syllabus: [
      { title: "Security & Risk", items: ["Confidentiality", "Integrity", "Availability", "Governance"] },
      { title: "Asset Security", items: ["Data Classification", "Privacy Protection", "Retention"] },
      { title: "Security Engineering", items: ["Cryptography", "Site Design", "Vulnerabilities"] },
      { title: "Ops Security", items: ["Incident Management", "Disaster Recovery", "Forensics"] }
    ],
    lastUpdated: "January 2025",
    language: "English",
    prerequisites: []
  },
  {
    id: '21',
    title: 'Deep Reinforcement Learning Hands-On',
    instructor: 'AI Research Lab',
    rating: 4.9,
    students: 1200,
    price: 109.99,
    category: 'AI',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '35 hours',
    level: 'Advanced',
    description: "Master the algorithms behind AlphaGo and self-driving cars. Learn Q-Learning, Deep Q-Networks (DQN), A3C, and PPO using PyTorch and OpenAI Gym.",
    whatYouWillLearn: [
      "Understand Markov Decision Processes (MDP)",
      "Implement DQN and Double DQN",
      "Master Policy Gradients and PPO",
      "Train agents for Atari Games",
      "Apply RL to continuous control tasks"
    ],
    syllabus: [
      { title: "RL Basics", items: ["Rewards", "States", "Actions", "Exploration vs Exploitation"] },
      { title: "Value Based Methods", items: ["Q-Learning", "DQN", "Prioritized Replay"] },
      { title: "Policy Based Methods", items: ["REINFORCE", "Actor-Critic", "PPO"] },
      { title: "Advanced", items: ["Model-Based RL", "Inverse RL", "Multi-Agent RL"] }
    ],
    lastUpdated: "February 2025",
    language: "English",
    prerequisites: []
  },
  {
    id: '22',
    title: 'DevOps Bootcamp: Docker, Kubernetes, Terraform',
    instructor: 'Ops Expert',
    rating: 4.8,
    students: 7500,
    price: 0,
    category: 'Cloud',
    image: 'https://images.unsplash.com/photo-1607799275518-d6c19011ea96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '55 hours',
    level: 'Intermediate',
    description: "The ultimate DevOps guide. Learn to containerize apps with Docker, orchestrate them with Kubernetes, and provision infrastructure as code with Terraform and Ansible.",
    whatYouWillLearn: [
      "Master Docker Containers and Compose",
      "Deploy and Manage Kubernetes Clusters",
      "Write Infrastructure as Code with Terraform",
      "Set up CI/CD Pipelines (Jenkins/GitHub Actions)",
      "Monitor with Prometheus and Grafana"
    ],
    syllabus: [
      { title: "Containerization", items: ["Docker Images", "Networking", "Volumes"] },
      { title: "Orchestration", items: ["K8s Architecture", "Pods", "Services", "Ingress"] },
      { title: "IaC", items: ["Terraform State", "Modules", "AWS Provider"] },
      { title: "CI/CD", items: ["Pipeline Syntax", "Automated Testing", "Blue/Green Deployment"] }
    ],
    lastUpdated: "March 2025",
    language: "English",
    prerequisites: []
  },
  {
    id: '23',
    title: 'Computer Vision with OpenCV and Deep Learning',
    instructor: 'Visionary',
    rating: 4.7,
    students: 4100,
    price: 79.99,
    category: 'AI',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '28 hours',
    level: 'Intermediate',
    description: "Teach computers to see. Learn image processing with OpenCV and build state-of-the-art object detection and face recognition models using YOLO and CNNs.",
    whatYouWillLearn: [
      "Process images and videos with OpenCV",
      "Detect faces and eyes using Haar Cascades",
      "Build Convolutional Neural Networks (CNNs)",
      "Implement YOLO for real-time object detection",
      "Perform Image Segmentation"
    ],
    syllabus: [
      { title: "Image Basics", items: ["Pixels", "Colorspaces", "Transformations"] },
      { title: "Deep Learning for Vision", items: ["CNN Architecture", "Transfer Learning", "Data Augmentation"] },
      { title: "Object Detection", items: ["YOLOv8", "Bounding Boxes", "Non-max Suppression"] },
      { title: "Applications", items: ["Face Recognition", "License Plate Reading", "Gesture Control"] }
    ],
    lastUpdated: "January 2025",
    language: "English",
    prerequisites: []
  },
  {
    id: '24',
    title: 'Go (Golang): The Complete Developer\'s Guide',
    instructor: 'Backend Master',
    rating: 4.8,
    students: 3300,
    price: 0,
    category: 'Development',
    image: 'https://images.unsplash.com/photo-1629904853716-f004b694ce95?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '22 hours',
    level: 'Beginner',
    description: "Learn Go, the language of the cloud. Designed by Google, Go is efficient, concise, and powerful. Perfect for building microservices and high-concurrency systems.",
    whatYouWillLearn: [
      "Master Go syntax and idioms",
      "Understand Goroutines and Channels",
      "Build robust Microservices",
      "Work with Interfaces and Structs",
      "Test and Benchmark Go code"
    ],
    syllabus: [
      { title: "Go Fundamentals", items: ["Variables", "Slices", "Maps", "Control Structures"] },
      { title: "Concurrency", items: ["Goroutines", "Channels", "Select", "Mutexes"] },
      { title: "Web Development", items: ["HTTP Server", "JSON Handling", "Gin Framework"] },
      { title: "Advanced", items: ["Context Package", "Reflection", "Generics"] }
    ],
    lastUpdated: "October 2025",
    language: "English",
    prerequisites: []
  },
  {
    id: '25',
    title: 'Autonomous Drones: Programming & Navigation',
    instructor: 'Sky High Labs',
    rating: 4.9,
    students: 900,
    price: 199.99,
    category: 'Robotics',
    image: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '30 hours',
    level: 'Advanced',
    description: "Take your coding to the skies. Learn to program autonomous drones using Python and DroneKit. Cover flight dynamics, mission planning, and computer vision from the air.",
    whatYouWillLearn: [
      "Understand Quadcopter physics",
      "Program flight paths with DroneKit-Python",
      "Simulate missions with SITL",
      "Process aerial imagery",
      "Implement precision landing"
    ],
    syllabus: [
      { title: "Drone Basics", items: ["Flight Controller", "Telemetry", "MAVLink Protocol"] },
      { title: "Programming", items: ["Connecting via Python", "Takeoff & Landing", "Waypoints"] },
      { title: "Simulation", items: ["ArduPilot SITL", "Gazebo Integration", "Mission Planner"] },
      { title: "Advanced", items: ["Obstacle Avoidance", "Swarm Control", "Visual Odometry"] }
    ],
    lastUpdated: "December 2025",
    language: "English",
    prerequisites: []
  },
  {
    id: '26',
    title: 'AR/VR Development with Unity',
    instructor: 'Meta Builders',
    rating: 4.6,
    students: 2100,
    price: 89.99,
    category: 'Future Tech',
    image: 'https://images.unsplash.com/photo-1617802690992-15d93263d3a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '40 hours',
    level: 'Intermediate',
    description: "Build immersive experiences for the Metaverse. Learn Unity XR Interaction Toolkit to create VR games and AR apps for Oculus Quest and mobile devices.",
    whatYouWillLearn: [
      "Develop for VR and AR platforms",
      "Use XR Interaction Toolkit",
      "Implement VR Locomotion and Physics",
      "Create Mobile AR with AR Foundation",
      "Optimize performance for standalone headsets"
    ],
    syllabus: [
      { title: "XR Intro", items: ["VR vs AR vs MR", "Unity Setup", "XR Plugin Management"] },
      { title: "VR Development", items: ["Grabbing Objects", "Teleportation", "UI in 3D"] },
      { title: "AR Development", items: ["Plane Detection", "Image Tracking", "Face Filters"] },
      { title: "Project", items: ["Building a VR Escape Room", "Publishing to Store"] }
    ],
    lastUpdated: "February 2025",
    language: "English",
    prerequisites: []
  },
  {
    id: '27',
    title: 'Bioinformatics: Genomics & Algorithms',
    instructor: 'Dr. Gene',
    rating: 4.8,
    students: 1500,
    price: 0,
    category: 'Data Science',
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '35 hours',
    level: 'Advanced',
    description: "Where biology meets computer science. Learn to analyze DNA sequences, assemble genomes, and predict protein structures using Python and Biopython algorithms.",
    whatYouWillLearn: [
      "Analyze DNA/RNA sequences",
      "Implement Sequence Alignment Algorithms (Needleman-Wunsch)",
      "Work with Biopython library",
      "Understand Next-Generation Sequencing (NGS)",
      "Explore Evolutionary Trees"
    ],
    syllabus: [
      { title: "Biology 101 for CS", items: ["Central Dogma", "Genes", "Proteins"] },
      { title: "Sequence Analysis", items: ["Transcription", "Translation", "Motif Finding"] },
      { title: "Algorithms", items: ["Dynamic Programming", "Graph Theory in Assembly", "Clustering"] },
      { title: "Tools", items: ["BLAST", "Biopython", "PyMOL"] }
    ],
    lastUpdated: "January 2025",
    language: "English",
    prerequisites: []
  },
  {
    id: '28',
    title: 'Edge AI: Machine Learning on Microcontrollers',
    instructor: 'TinyML Ops',
    rating: 4.7,
    students: 1800,
    price: 59.99,
    category: 'Future Tech',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '20 hours',
    level: 'Intermediate',
    description: "Deploy AI models to low-power devices. Learn TinyML to run keyword spotting, gesture recognition, and anomaly detection on Arduino and ESP32.",
    whatYouWillLearn: [
      "Understand TensorFlow Lite for Microcontrollers",
      "Quantize and optimize models",
      "Run inference on Arduino Nano 33 BLE",
      "Collect and process sensor data",
      "Build battery-powered smart devices"
    ],
    syllabus: [
      { title: "TinyML Intro", items: ["Constraints", "Workflow", "Hardware"] },
      { title: "Audio Processing", items: ["Spectrograms", "Keyword Spotting", "Training"] },
      { title: "Motion Detection", items: ["Accelerometers", "Gesture Classification", "Magic Wand"] },
      { title: "Vision", items: ["Person Detection", "Camera Modules", "Optimization"] }
    ],
    lastUpdated: "March 2025",
    language: "English",
    prerequisites: []
  },
  {
    id: '29',
    title: 'Natural Language Processing (NLP) with Transformers',
    instructor: 'Language AI',
    rating: 4.9,
    students: 5200,
    price: 129.99,
    category: 'AI',
    image: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '40 hours',
    level: 'Advanced',
    description: "Master the technology behind ChatGPT and BERT. Learn to build state-of-the-art NLP models using the Hugging Face ecosystem.",
    whatYouWillLearn: [
      "Understand Transformer Architecture (Attention Mechanism)",
      "Fine-tune BERT, GPT, and T5 models",
      "Perform Sentiment Analysis and Named Entity Recognition",
      "Build Question Answering Systems",
      "Deploy NLP models to production"
    ],
    syllabus: [
      { title: "Foundations", items: ["RNNs vs Transformers", "Self-Attention", "Tokenizers"] },
      { title: "BERT Family", items: ["Encoder Models", "Fine-tuning", "Classification"] },
      { title: "GPT Family", items: ["Decoder Models", "Text Generation", "Prompting"] },
      { title: "Hugging Face", items: ["Datasets Library", "Trainers", "Inference API"] }
    ],
    lastUpdated: "January 2025",
    language: "English",
    prerequisites: []
  },
  {
    id: '30',
    title: '5G Technology and Network Architecture',
    instructor: 'Telco Future',
    rating: 4.5,
    students: 1100,
    price: 0,
    category: 'Future Tech',
    image: 'https://images.unsplash.com/photo-1614064641938-3bcee5297404?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '15 hours',
    level: 'Beginner',
    description: "Understand the revolution of 5G. Learn about the architecture, spectrum, massive MIMO, and how 5G enables IoT, autonomous vehicles, and smart cities.",
    whatYouWillLearn: [
      "Understand 5G NR (New Radio)",
      "Differentiate Non-Standalone (NSA) vs Standalone (SA)",
      "Explore Network Slicing and Edge Computing",
      "Analyze use cases (eMBB, URLLC, mMTC)",
      "Look ahead to 6G"
    ],
    syllabus: [
      { title: "Evolution", items: ["1G to 5G", "Performance Targets", "Standardization"] },
      { title: "Technology", items: ["Millimeter Wave", "Beamforming", "Small Cells"] },
      { title: "Core Network", items: ["Service Based Architecture", "Virtualization", "SDN"] },
      { title: "Industry Impact", items: ["Industry 4.0", "Healthcare", "Transportation"] }
    ],
    lastUpdated: "October 2025",
    language: "English",
    prerequisites: []
  }
];

export const SERVICES: ServiceItem[] = [
    {
        title: "Expert Mentorship",
        description: "Get 1-on-1 guidance from industry veterans who have worked at top tech companies like Google, Amazon, and Microsoft.",
        icon: "Users"
    },
    {
        title: "Career Guidance",
        description: "Comprehensive support including resume reviews, mock interviews, and personalized career path planning.",
        icon: "Briefcase"
    },
    {
        title: "Certification",
        description: "Earn industry-recognized certificates upon completion of courses to validate your skills to employers.",
        icon: "Award"
    },
    {
        title: "Structured Curriculum",
        description: "Follow carefully designed learning paths that take you from beginner to expert in your chosen field.",
        icon: "BookOpen"
    }
];

export const BLOG_POSTS: BlogPost[] = [
    {
        id: '1',
        title: 'Top 10 Tech Skills to Master in 2025',
        excerpt: 'The tech landscape is evolving rapidly. Here are the most in-demand skills you need to stay competitive in the job market.',
        date: 'March 15, 2025',
        author: 'Alex Johnson',
        image: 'https://images.unsplash.com/photo-1504384308090-c54be3855833?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Career',
        link: '#'
    },
    {
        id: '2',
        title: 'The Future of AI in Software Development',
        excerpt: 'How generative AI is changing the way we write code, debug applications, and architect systems.',
        date: 'March 10, 2025',
        author: 'Dr. Emily Chen',
        image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'AI',
        link: '#'
    },
    {
        id: '3',
        title: 'Breaking into Cybersecurity: A Beginner\'s Guide',
        excerpt: 'Interested in a career in cybersecurity? Learn about the different roles, certifications, and skills required to get started.',
        date: 'March 5, 2025',
        author: 'Michael Smith',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Cybersecurity',
        link: '#'
    },
    {
        id: '4',
        title: 'Why Soft Skills Matter for Developers',
        excerpt: 'Technical skills get you the interview, but soft skills get you the job. Learn how to improve your communication and teamwork.',
        date: 'February 28, 2025',
        author: 'Sarah Jenkins',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Soft Skills',
        link: '#'
    }
];