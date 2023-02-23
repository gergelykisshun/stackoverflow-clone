import { useSearchStore } from "@/store/searchStore";
import { useThemeStore } from "@/store/themeStore";
import styled from "@emotion/styled";
import { Box, Button, ButtonProps } from "@mui/material";
import { grey } from "@mui/material/colors";
import Link from "next/link";
import { FC } from "react";

type Props = {
  tag: string;
  size?: string;
};

const LightButton = styled(Button)<ButtonProps>(({ theme }) => ({
  backgroundColor: grey[300],
  "&:hover": {
    backgroundColor: grey[400],
  },
}));
const DarkButton = styled(Button)<ButtonProps>(({ theme }) => ({
  backgroundColor: grey[600],
  "&:hover": {
    backgroundColor: grey[700],
  },
}));

const TagButton: FC<Props> = ({ tag, size }) => {
  const additionalProps: ButtonProps = {
    variant: "text",
    color: "inherit",

    onClick: () => changeSearch(tag),
    className: `py-1 px-2 font-light ${
      size || "text-xs"
    } rounded-sm whitespace-nowrap lowercase`,
  };

  const changeSearch = useSearchStore((state) => state.change);
  const mode = useThemeStore((state) => state.mode);

  return (
    <Link href={`/search?tagged=${tag}`}>
      <Box color="text.primary">
        {mode === "dark" ? (
          <DarkButton {...additionalProps}>{tag}</DarkButton>
        ) : (
          <LightButton {...additionalProps}>{tag}</LightButton>
        )}
      </Box>
    </Link>
  );
};

export default TagButton;
