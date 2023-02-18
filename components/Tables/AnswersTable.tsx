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
import React, { FC, useEffect, useRef, useState } from "react";
import { getQuestionById } from "@/axios/questions";
import { useRouter } from "next/router";
import Link from "next/link";

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

  const linkRef = useRef<null | HTMLAnchorElement>(null);
  const [questionLink, setQuestionLink] = useState<string>("");

  const handleClick = async (questionId: number) => {
    try {
      const question = await getQuestionById(questionId);
      setQuestionLink(question.link);
    } catch (e) {
      console.log("Could not load question.");
    }
  };

  useEffect(() => {
    if (questionLink && linkRef.current) {
      linkRef.current.click();
      setQuestionLink("");
    }
  }, [questionLink]);

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
                <Link
                  href={questionLink}
                  target="_blank"
                  ref={linkRef}
                  className="invisible"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AnswersTable;
