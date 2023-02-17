import { IAnswer } from "@/interfaces/answer";
import {
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import React, { FC } from "react";
import TagButton from "../TagButton/TagButton";

type Props = {
  answers: IAnswer[];
};

const AnswersTable: FC<Props> = ({ answers }) => {
  const rows = answers.map((answer) => ({
    id: answer.answer_id,
    isAccepted: answer.is_accepted,
    score: answer.score,
    questionId: answer.question_id,
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
                {row.isAccepted}
              </TableCell>
              <TableCell align="right">{row.questionId} posts</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AnswersTable;
