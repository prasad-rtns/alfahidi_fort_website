import type { HomeSequencePayload } from "@/types/home-sequence";

const sequencePath = (filename: string) => `/assets/sequence/${filename}`;

export const homeSequencePayload: HomeSequencePayload = {
  cropTopRatio: 67 / 1240,
  frames: [
    {
      sequence: 1,
      timestamp: 0,
      description: "Initial hero with small circular viewport",
      src: sequencePath("sequence_01_00.00s.png")
    },
    {
      sequence: 2,
      timestamp: 0.65,
      description: "Circular reveal moves toward center",
      src: sequencePath("sequence_02_00.65s.png")
    },
    {
      sequence: 3,
      timestamp: 1.75,
      description: "Circle enlarges and reveals exhibition scene",
      src: sequencePath("sequence_03_01.75s.png")
    },
    {
      sequence: 4,
      timestamp: 3.1,
      description: "Large circular hero composition",
      src: sequencePath("sequence_04_03.10s.png")
    },
    {
      sequence: 5,
      timestamp: 4.5,
      description: "Hero content nearly fills viewport",
      src: sequencePath("sequence_05_04.50s.png")
    },
    {
      sequence: 6,
      timestamp: 5.7,
      description: "Scroll transition into white story section",
      src: sequencePath("sequence_06_05.70s.png")
    },
    {
      sequence: 7,
      timestamp: 6.4,
      description: "First two editorial cards enter",
      src: sequencePath("sequence_07_06.40s.png")
    },
    {
      sequence: 8,
      timestamp: 7.4,
      description: "First editorial row settles",
      src: sequencePath("sequence_08_07.40s.png")
    },
    {
      sequence: 9,
      timestamp: 9,
      description: "Second row of circular cards enters",
      src: sequencePath("sequence_09_09.00s.png")
    },
    {
      sequence: 10,
      timestamp: 10.8,
      description: "Three circular story cards settle",
      src: sequencePath("sequence_10_10.80s.png")
    },
    {
      sequence: 11,
      timestamp: 11.6,
      description: "White section exits into dark feature section",
      src: sequencePath("sequence_11_11.60s.png")
    },
    {
      sequence: 12,
      timestamp: 12.4,
      description: "Dark feature section layout",
      src: sequencePath("sequence_12_12.40s.png")
    },
    {
      sequence: 13,
      timestamp: 13.3,
      description: "Artifact and conservation media begin revealing",
      src: sequencePath("sequence_13_13.30s.png")
    },
    {
      sequence: 14,
      timestamp: 14.2,
      description: "Circular artifact and arched image expand",
      src: sequencePath("sequence_14_14.20s.png")
    },
    {
      sequence: 15,
      timestamp: 15.2,
      description: "Final dark feature composition",
      src: sequencePath("sequence_15_15.20s.png")
    },
    {
      sequence: 16,
      timestamp: 15.75,
      description: "Diagonal guide line and CTA stable",
      src: sequencePath("sequence_16_15.75s.png")
    }
  ]
};
