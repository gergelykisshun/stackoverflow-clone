import { IQuestion } from "@/interfaces/question";
import React, { FC } from "react";
import DoneIcon from "@mui/icons-material/Done";
import styles from "./QuestionCard.module.scss";

type Props = {
  question: IQuestion;
};

const QuestionCard: FC<Props> = ({ question }) => {
  return (
    <div className={`flex flex-col sm:flex-row `}>
      {/* votes and answers display */}
      <div
        className={`flex flex-wrap gap-2 sm:flex-col sm:gap-1 ${styles["answers-votes-container"]}`}
      >
        <p className="sm:text-right pr-2">{question.score} score</p>
        <div className="flex items-center bg-green-700 text-white rounded-md">
          <DoneIcon className="ml-1" />
          <p className="px-2 whitespace-nowrap">
            {question.answer_count} answers
          </p>
        </div>
        <p className="text-green-400 sm:text-right pr-2">
          {question.view_count} views
        </p>
      </div>

      {/* Question data */}
      <div>
        
      </div>
    </div>
  );
};

export default QuestionCard;
