import getPathToPushWithNewQuery from "@/utility/getPathToPushWithNewQuery";
import { Pagination, Box } from "@mui/material";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";

type Props = {
  isCentered?: boolean;
  has_more?: boolean;
};

const Paginator: FC<Props> = ({ isCentered, has_more }) => {
  const router = useRouter();
  const query = router.query;
  const currentPath = router.asPath;
  const [maxPageNumber, setMaxPageNumber] = useState<number>(1);

  useEffect(() => {
    console.log("USEEFFECT RAN");
    let maxCount: number = 1;
    if (!has_more) maxCount = query.page ? Number(query.page) : 1;
    maxCount = query.page ? Number(query.page) + 1 : 2;
    if (maxCount > maxPageNumber) {
      setMaxPageNumber(maxCount);
    }
  }, [query, has_more]);

  return (
    <Box className={`${isCentered ? "flex justify-center " : ""} mt-5`}>
      <Pagination
        sx={{ size: { xs: "small", md: "medium" } }}
        count={maxPageNumber}
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
