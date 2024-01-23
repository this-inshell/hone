import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { ContentBlock } from "draft-js";
import { Facet } from "../types/types";
import { TOTAL_SIMILARITY_BARS } from "./constants";

export const getCurrentDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  // and time

  const hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();

  return `${year}-${month}-${date}-${hour}-${minute}-${second}`;
};

export const jaccardSimilarity = (a: string, b: string) => {
  const aSet = new Set(a.split(" "));
  const bSet = new Set(b.split(" "));
  const intersection = new Set([...aSet].filter((x) => bSet.has(x)));
  const union = new Set([...aSet, ...bSet]);
  return intersection.size / union.size;
};

export const similarityBar = (similarity: number) => {
  const calculateTransparency = (similarity: number) => {
    return 1 - Math.exp(-10 * similarity);
  };

  const barStyle = {
    fontSize: "1rem",
    width: "0.33rem",
    display: "inline-block",
  };

  const bars = [];
  for (let i = 0; i < 4; i++) {
    const adjustedSimilarity = similarity - i * 0.01;
    const opacity = calculateTransparency(adjustedSimilarity);
    bars.push({ ...barStyle, opacity });
  }

  return bars;
};
