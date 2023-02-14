import { ITag } from "@/interfaces/tags";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import React, { FC } from "react";
import TagButton from "../TagButton/TagButton";

type Props = {
  tags: ITag[];
};

const UserTopTagsTable: FC<Props> = ({ tags }) => {
  const rows = tags.map((tag) => ({ tag: tag.name, count: tag.count }));
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.tag}>
              <TableCell component="th" scope="row">
                <TagButton tag={row.tag} size="xs:text-sm text-md " />
              </TableCell>
              <TableCell align="right">{row.count} posts</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTopTagsTable;
