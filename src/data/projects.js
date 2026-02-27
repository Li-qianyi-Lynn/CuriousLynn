import careerAIImg from '../assets/careerAI.png';
// import hivideoImg from '../assets/hivideo.png';
import lynnCatsWebImg from '../assets/lynnCatsWeb.png';
import policyAnalyzerImg from '../assets/policyAnalyzer.png';
import SceneSoundImg from '../assets/SceneSound.png';
import snappyLinkImg from '../assets/snappyLink.png';
import sweeperImg from '../assets/sweeper.png';
import webdesignImg from '../assets/webdesign.png';
import webDevImg from '../assets/webDev.png';






export const projectCategories = [
  {
    id: 'ai-hci',
    title: 'AI + HCI Interaction',
    desc: "Exploring how LLMs can enhance human cognition. Think of it as 'Purr-sonalized AI'.",
    icon: 'sparkles',
    projects: [
      {
        name: 'career-ai',
        link: 'https://github.com/Li-qianyi-Lynn/career-ai',
        description: 'Conversational AI experiments around career exploration and reflective questions.',
        image: careerAIImg
      },
      {
        name: 'hivideo',
        link: 'https://github.com/Li-qianyi-Lynn/hivideo',
        description: 'A lovely tool that uses your webcam to detect a fast “bye‑bye” hand‑wave gesture and force‑quit Zoom automatically.',
        // image: hivideoImg

      },
      {
        name: 'SceneSound-LynnVersion',
        link: 'https://github.com/Li-qianyi-Lynn/SceneSound-LynnVersion',
        description:
          'A recommendation app that analyzes user-uploaded images or input text to identify emotions and scenes, then recommends matching music playlists.',
        image: SceneSoundImg
      }
    ]
  },
  {
    id: 'frontend',
    title: 'Frontend Design',
    desc: 'Crafting pixel-perfect, psychologically intuitive UIs. Meow-velous user experiences.',
    icon: 'layout',
    projects: [
      {
        name: 'lynn-cats-web',
        link: 'https://github.com/Li-qianyi-Lynn/lynn-cats-web',
        description:
          "This is a Single Page Application (SPA) that showcases the cats I've cared for as a pet sitter. The website includes photos, introductions, and detailed caring guides for each cat, helping visitors understand each cat's personality and needs.",
        image: lynnCatsWebImg
      },
      {
        name: 'Webdesign',
        link: 'https://github.com/Li-qianyi-Lynn/Webdesign',
        description: 'Collection of web design explorations and UI patterns I enjoy.',
        image: webdesignImg

      },
      {
        name: 'web-dev-projects',
        link: 'https://github.com/Li-qianyi-Lynn/web-dev-projects',
        description: 'Small front-end projects for honing layouts, animation and interactions.',
        image: webDevImg
      }
    ]
  },
  {
    id: 'good-tools',
    title: 'Good Tools',
    desc:
      'Practical tools for cleaning data, shortening links, and analyzing complex policy documents.',
    icon: 'file-search',
    projects: [
      {
        name: 'rise2gether-sweeper',
        link: 'https://github.com/Li-qianyi-Lynn/rise2gether-sweeper',
        description:
          'An interactive tool for processing and cleaning Squarespace CSV data, automatically categorizing attendees and removing sensitive information.',
        image: sweeperImg
      },
      {
        name: 'SnappyLinkUpdate',
        link: 'https://github.com/Li-qianyi-Lynn/SnappyLinkUpdate',
        description:
          'A web application that allows users to generate short links and QR codes from long URLs.',
        image: snappyLinkImg
      },
      {
        name: 'policy-analyzer',
        link: 'https://github.com/Li-qianyi-Lynn/policy-analyzer',
        description:
          'An intelligent Prompt Generator specialized for analyzing China’s energy policy and just transition.',
        image: policyAnalyzerImg
      }
      // {
      //   name: 'policy-analyzer-II',
      //   link: 'https://github.com/Li-qianyi-Lynn/policy-analyzer-II',
      //   description: 'Claude-powered PDF Policy Analysis Tool: Upload multiple PDFs and input your requirements; the AI will perform an intelligent analysis based on the document content.'
      // }
    ]
  }
];

