import React from "react";
import { GetStaticProps, NextPage } from "next";
import { getAllQuestions } from "@/axios/questions";
import { IQuestion } from "@/interfaces/question";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

type Props = {
  questions: IQuestion[];
  error?: string;
};

const AllQuestionsPage: NextPage<Props> = ({ questions, error }) => {
  if (error) {
    return <Typography variant="h6">{error}</Typography>;
  }

  return (
    <Box display={"flex"}>
      {questions.map((question) => (
        <div key={question.question_id}>
          {" "}
          {question.title} by {question.owner.display_name}
        </div>
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
