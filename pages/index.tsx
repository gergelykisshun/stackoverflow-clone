import { getQuestionsByQuery } from "@/axios/questions";
import { getTagsByQuery } from "@/axios/tags";
import { getUsersByQuery } from "@/axios/users";
import QuestionCard from "@/components/Cards/QuestionCard/QuestionCard";
import UserPreview from "@/components/Cards/UserPreview/UserPreview";
import TopTagsTable from "@/components/Tables/TopTagsTable";
import { IQuestion } from "@/interfaces/question";
import { ITag } from "@/interfaces/tags";
import { IUser } from "@/interfaces/users";
import { Box, Typography } from "@mui/material";
import { GetStaticProps, NextPage } from "next";

type Props = {
  tags: ITag[];
  users: IUser[];
  questions: IQuestion[];
};

const Home: NextPage<Props> = ({ questions, tags, users }) => {
  return (
    <>
      <Box className="text-center mt-10 mb-20">
        <Typography variant="h2">
          Welcome to{" "}
          <Typography variant="h2" color="primary" component="span">
            Flash
          </Typography>{" "}
          Answers
        </Typography>
        <Typography>Powered by Stack Exchange API</Typography>
      </Box>
      <Box className="grid grid-cols-1 lg:grid-cols-2 space-x-7">
        <Box>
          <Typography
            variant="h4"
            className="font-light"
            color="primary.main"
            gutterBottom
          >
            Popular tags
          </Typography>

          <div className="max-w-xl mx-auto mt-5">
            <TopTagsTable tags={tags || []} />
          </div>
        </Box>
        <Box className="mt-10 lg:mt-0">
          <Typography
            variant="h4"
            className="font-light"
            color="primary.main"
            gutterBottom
          >
            Community
          </Typography>

          <Box className="flex flex-wrap justify-center gap-10 mt-5">
            {users.map((user) => (
              <UserPreview key={user.account_id} user={user} />
            ))}
          </Box>
        </Box>
      </Box>
      <Box className="mt-10 mx-auto max-w-2xl">
        <Typography
          variant="h4"
          className="font-light"
          color="primary.main"
          gutterBottom
        >
          Popular Questions
        </Typography>

        <Box className="mt-5">
          {questions.map((question) => (
            <QuestionCard key={question.question_id} question={question} />
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  let tags: ITag[] = [];
  let users: IUser[] = [];
  let questions: IQuestion[] = [];

  try {
    tags = await getTagsByQuery({ pagesize: 10 });
  } catch (e) {
    console.log("Fetching tags failed!");
  }

  try {
    users = await getUsersByQuery({ pagesize: 4 });
  } catch (e) {
    console.log("Fetching users failed!");
  }

  try {
    questions = await getQuestionsByQuery({ pagesize: 5 });
  } catch (e) {
    console.log("Fetching questions failed!");
  }

  return { props: { users, tags, questions }, revalidate: 120 };
};
