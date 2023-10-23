import {
  Box,
  Heading,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import BlogsTab from "../components/BlogsTab";
import SubscribersTab from "../components/SubscribersTab";
import UserTabs from "../components/UserTabs";

const AdminScreen = () => {
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const location = useLocation();

  return userInfo && userInfo.is_admin === true ? (
    <Box p={20} minH={"100vH"}>
      <Stack
        direction={{ base: "column", lg: "row" }}
        align={{ lg: "flex-start" }}
      >
        <Stack
          pr={{ base: 0, md: 14 }}
          spacing={{ base: 8, md: 10 }}
          flex={"1.5"}
          mb={{ base: 12, md: "none" }}
        >
          <Heading fontSize={"2xl"} fontWeight={"extrabold"}>
            Admin Console
          </Heading>
          <Tabs size={"md"} variant={"enclosed"}>
            <TabList>
              <Tab>Users</Tab>
              <Tab>Blogs</Tab>
              <Tab>Comments</Tab>
              <Tab>Subscriber</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <UserTabs />
              </TabPanel>
              <TabPanel>
                <BlogsTab />
              </TabPanel>
              <TabPanel>Hi</TabPanel>
              <TabPanel>
                <SubscribersTab />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Stack>
      </Stack>
    </Box>
  ) : (
    <Navigate to="/blogs" replace={true} state={{ from: location }} />
  );
};

export default AdminScreen;
