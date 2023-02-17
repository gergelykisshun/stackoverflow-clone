import { IAnswer } from "@/interfaces/answer";
import {
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Typography,
} from "@mui/material";
import React, { FC } from "react";
import DoneIcon from "@mui/icons-material/Done";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { getQuestionById } from "@/axios/questions";
import { useRouter } from "next/router";

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
                  variant={row.isAccepted ? "filled" : "outlined"}
                  color={row.isAccepted ? "success" : "primary"}
                  className="min-w-[50px]"
                />
              </TableCell>

              <TableCell align="right" component="th" scope="row">
                <Typography
                  onClick={() => handleClick(row.questionId)}
                  color="primary"
                  className="text-base md:text-lg cursor-pointer"
                >
                  Check the question!
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AnswersTable;
