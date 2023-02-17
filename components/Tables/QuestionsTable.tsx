import { IQuestion } from "@/interfaces/question";
import {
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import React, { FC } from "react";
import DoneIcon from "@mui/icons-material/Done";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { useRouter } from "next/router";
import { getQuestionById } from "@/axios/questions";

type Props = {
  questions: IQuestion[];
};

const QuestionsTable: FC<Props> = ({ questions }) => {
  const rows = questions.map((question) => ({
    score: question.score,
    text: question.title,
    answerId: question.accepted_answer_id,
    id: question.question_id,
  }));
  const router = useRouter();

  const handleClick = async (questionId: number) => {
    try {
      const question = await getQuestionById(questionId);
      router.push(`${question.link}`);
    } catch (e) {
      console.log("Could not load question.");
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                <Chip
                  label={row.score}
                  variant="outlined"
                  color="success"
                  className="min-w-[50px]"
                />
              </TableCell>
              <TableCell component="th" scope="row">
                <Typography
                  onClick={() => handleClick(row.id)}
                  color="primary"
                  className="text-base md:text-lg cursor-pointer"
                >
                  {row.text}
                </Typography>
              </TableCell>
              <TableCell align="right" className="hidden md:table-cell">
                {row.answerId ? (
                  <DoneIcon color="success" />
                ) : (
                  <QuestionMarkIcon color="primary" />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default QuestionsTable;
