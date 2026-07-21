export type HomeSequenceFrame = {
  sequence: number;
  timestamp: number;
  description: string;
  src: string;
};

export type HomeSequencePayload = {
  cropTopRatio: number;
  frames: HomeSequenceFrame[];
};
