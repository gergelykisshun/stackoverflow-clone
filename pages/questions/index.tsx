import React from "react";
import { GetStaticProps, NextPage } from "next";
import { getAllQuestions } from "@/axios/questions";
import { IQuestion } from "@/interfaces/question";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import QuestionCard from "@/components/Cards/QuestionCard/QuestionCard";

type Props = {
  questions: IQuestion[];
  error?: string;
};

const AllQuestionsPage: NextPage<Props> = ({ questions, error }) => {
  if (error) {
    return <Typography variant="h6">{error}</Typography>;
  }

  return (
    <Box className="grid grid-cols-1">
      {questions.map((question) => (
        <QuestionCard key={question.question_id} question={question} />
      ))}
    </Box>
  );
};

export default AllQuestionsPage;

export const getStaticProps: GetStaticProps = async () => {
  try {
    const questions = await getAllQuestions();
    return { props: { questions }, revalidate: 60 };
  } catch (e) {
    return {
      props: { questions: [], error: "Sorry! Could not fetch questions!" },
    };
  }
};
