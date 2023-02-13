import { IQuestion } from "@/interfaces/question";
import React, { FC } from "react";
import DoneIcon from "@mui/icons-material/Done";
import styles from "./QuestionCard.module.scss";
import { ButtonGroup, Typography } from "@mui/material";
import TagButton from "@/components/TagButton/TagButton";
import Link from "next/link";

type Props = {
  question: IQuestion;
};

const QuestionCard: FC<Props> = ({ question }) => {
  console.log(question);

  return (
    <div className="flex flex-col sm:flex-row sm:gap-4 mb-5">
      {/* votes and answers display */}
      <div
        className={`flex flex-wrap gap-2 sm:flex-col sm:gap-1 mb-2 ${styles["answers-votes-container"]}`}
      >
        <p className="sm:text-right pr-2">{question.score} score</p>
        <div className="flex items-center bg-green-700 text-white rounded-md">
          <DoneIcon className="ml-1" />
          <p className="px-2 whitespace-nowrap">
            {question.answer_count} answers
          </p>
        </div>
        <p className="text-green-500 sm:text-right pr-2">
          {question.view_count} views
        </p>
      </div>

      {/* Question data */}
      <div>
        <Link target="_blank" href={`${question.link}`}>
          <Typography
            color="primary.main"
            variant="body1"
            className="font-semibold"
            gutterBottom
          >
            {decodeURI(question.title)}
          </Typography>
        </Link>
        <ButtonGroup className="flex flex-wrap gap-2">
          {question.tags.map((tag) => (
            <TagButton key={`${Math.random()}-tag`} tag={tag} />
          ))}
        </ButtonGroup>
      </div>
    </div>
  );
};

export default QuestionCard;
