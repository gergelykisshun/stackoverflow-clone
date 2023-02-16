import getPathToPushWithNewQuery from "@/utility/getPathToPushWithNewQuery";
import { Pagination, Box } from "@mui/material";
import { useRouter } from "next/router";
import React, { FC } from "react";

type Props = {
  isCentered?: boolean;
};

const Paginator: FC<Props> = ({ isCentered }) => {
  const router = useRouter();
  const query = router.query;
  const currentPath = router.asPath;

  return (
    <Box className={`${isCentered ? "flex justify-center" : ""} mt-5`}>
      <Pagination
        sx={{ size: { xs: "small", md: "medium" } }}
        count={100}
        page={Number(query.page) || 1}
        color="primary"
        onChange={(e, newPage) =>
          router.push(
            getPathToPushWithNewQuery(query, "page", newPage, currentPath)
          )
        }
      />
    </Box>
  );
};

export default Paginator;
