import { IQuestion } from "@/interfaces/question";
import React, { FC, useState } from "react";
import DoneIcon from "@mui/icons-material/Done";
import styles from "./QuestionCard.module.scss";
import { ButtonGroup, Divider, Typography } from "@mui/material";
import TagButton from "@/components/TagButton/TagButton";
import Link from "next/link";
import { decodeSpecialChars } from "@/utility/decodeSpecialChars";
import defaultAvatar from "@/assets/default-avatar.jpeg";

type Props = {
  question: IQuestion;
};

const QuestionCard: FC<Props> = ({ question }) => {
  const owner = question.owner;

  const [ownerImage, setOwnerImage] = useState<string>(owner.profile_image);
  const onImageError = () => {
    setOwnerImage("/images/default-avatar.jpeg");
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:gap-4 mb-3">
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
              className="font-semibold max-w-xl"
              gutterBottom
            >
              {decodeSpecialChars(question.title)}
            </Typography>
          </Link>
          {/* tags */}
          <ButtonGroup className="flex flex-wrap gap-2 mb-2">
            {question.tags.map((tag) => (
              <TagButton key={`${Math.random()}-tag`} tag={tag} />
            ))}
          </ButtonGroup>
          {/* owner */}
          <Link
            className="flex flex-wrap gap-2"
            target="_blank"
            href={owner.link}
          >
            <img
              className="w-5 h-5 object-cover rounded-sm"
              src={ownerImage}
              onError={onImageError}
              alt=""
            />
            <Typography color="primary">{owner.display_name}</Typography>
            <Typography
              color="warning.main"
              variant="button"
              className="text-xs flex items-center"
            >
              reputation: {owner.reputation}
            </Typography>
          </Link>
        </div>
      </div>
      <Divider variant="middle" className="mb-3 max-w-3xl" />
    </>
  );
};

export default QuestionCard;