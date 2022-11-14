import {
  Container,
  Box,
  Heading,
  Stack,
  useToast,
  useBoolean,
  CircularProgress,
} from "@chakra-ui/react";
import Layout from "../../src/components/layout";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  auth,
  getAllBookmarkorFavPerPagination,
  removeBookmarkOrFavURL,
} from "../../src/services/firebase";
import { useRouter } from "next/router";
import BookMarkFavCard from "../../src/components/sections/bookmark-fav-card";
import Seo from "../../src/components/seo";

const Bookmark = () => {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();
  const toast = useToast();
  const [favs, setFavs] = useState([]);
  const [isLoading, setIsLoading] = useBoolean(true);

  const handleRemoveBookmark = (url) => {
    removeBookmarkOrFavURL(user.uid, url, "bookmark").then((res) => {
      toast({
        title: "Bookmark Removed!",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    });
  };

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (!user) router.push("/auth/login");
    else {
      getAllBookmarkorFavPerPagination(user.uid, "favourite", "").then(
        (res) => {
          let temp = [];
          res.forEach((doc) => {
            temp.push(doc.data());
          });
          setFavs(temp);
          setIsLoading.off();
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading, router]);

  return (
    <>
      <Seo
        title="My Favourites - How To Wealthy"
        description="This favourite page contains all your bookmarked content on How to Wealthy."
      />
      <Layout>
        <Container maxW={"6xl"} minH={"50vh"} py={10}>
          <Box py={{ base: 10, md: 20 }}>
            <Heading as={"h1"}>My Favourites</Heading>
          </Box>

          <Box my={10}>
            <Stack spacing={6} mb={12}>
              {isLoading ? (
                <CircularProgress isIndeterminate color="black" />
              ) : (
                <>
                  {favs.map((data, idx) => {
                    return (
                      <BookMarkFavCard
                        key={idx}
                        data={data}
                        handleRemoveBookmark={handleRemoveBookmark}
                      />
                    );
                  })}

                  {favs.length == 0 && <Box>No Bookmarks</Box>}
                </>
              )}
            </Stack>
          </Box>
        </Container>
      </Layout>
    </>
  );
};

export default Bookmark;
