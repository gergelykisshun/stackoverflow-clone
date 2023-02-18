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
import Link from "next/link";

type Props = {
  questions: IQuestion[];
};

const QuestionsTable: FC<Props> = ({ questions }) => {
  const rows = questions.map((question) => ({
    score: question.score,
    text: question.title,
    answerId: question.accepted_answer_id,
    id: question.question_id,
    link: question.link,
  }));

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
                <Link href={row.link} target="_blank">
                  <Typography
                    color="primary"
                    className="text-base md:text-lg cursor-pointer"
                  >
                    {row.text}
                  </Typography>
                </Link>
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
