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
  const queryCount = Object.keys(query).length;

  return (
    <Box className={`${isCentered ? "flex justify-center" : ""} mt-5`}>
      <Pagination
        sx={{ size: { xs: "small", md: "medium" } }}
        count={100}
        page={Number(query.page) || 1}
        color="primary"
        onChange={(e, newPage) =>
          router.push(
            currentPath.includes("page")
              ? currentPath.replace(`page=${query.page}`, `page=${newPage}`)
              : `${currentPath}${queryCount ? "&" : "?"}page=${newPage}`
          )
        }
      />
    </Box>
  );
};

export default Paginator;
