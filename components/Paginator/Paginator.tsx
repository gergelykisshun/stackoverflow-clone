import getPathToPushWithNewQuery from "@/utility/getPathToPushWithNewQuery";
import { Pagination, Box } from "@mui/material";
import { useRouter } from "next/router";
import React, { FC } from "react";

type Props = {
  isCentered?: boolean;
  has_more?: boolean;
};

const Paginator: FC<Props> = ({ isCentered, has_more }) => {
  const router = useRouter();
  const query = router.query;
  const currentPath = router.asPath;
  const count = (() => {
    if (!has_more) return query.page ? Number(query.page) : 1;
    return query.page ? Number(query.page) + 1 : 1 + 1;
  })();

  return (
    <Box className={`${isCentered ? "flex justify-center " : ""} mt-5`}>
      <Pagination
        sx={{ size: { xs: "small", md: "medium" } }}
        count={count}
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
