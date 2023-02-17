import { IQuestion } from "@/interfaces/question";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import React, { FC } from "react";
import TagButton from "../TagButton/TagButton";

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
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.score}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.text}
              </TableCell>
              <TableCell align="right">{row.answerId} posts</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default QuestionsTable;
