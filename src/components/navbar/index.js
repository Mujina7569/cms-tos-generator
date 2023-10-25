import { ReactNode, useEffect, useRef, useState } from "react";
import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  Stack,
  Center,
  Text,
  Spacer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Hide,
  Show,
  Badge,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
} from "@chakra-ui/react";
import React from "react";


function CustomNavbar({ smallChatbar = false, disableChatbar = false }) {
  const { app, auth, db } = useApp();
  const { notidata, chatNotiData } = useNotifications();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isSigninOpen,
    onOpen: onSigninOpen,
    onClose: onSigninClose,
  } = useDisclosure();
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  const btnRef = React.useRef();
  const [data, setData] = useState(undefined);
  const [unreadChat, setUnreadChat] = useState([]);
  const [isAnimate, setAnimate] = useState();
  const [play] = useSound("/mixkit-shaker-bell-alert-599.mp3", {
    volume: 0.25,
  });
  const getgroup = useGroupHeader();

  useEffect(() => {
    const animationStart = () => {
      setAnimate(true);
    };
    const animationStop = () => {
      setAnimate(false);
    };
    router.events.on("routeChangeStart", animationStart);
    router.events.on("routeChangeComplete", animationStop);
    router.events.on("routeChangeError", animationStop);
    return () => {
      router.events.off("routeChangeStart", animationStart);
      router.events.off("routeChangeComplete", animationStop);
      router.events.off("routeChangeError", animationStop);
    };
  }, [router]);

  useEffect(() => {
    let unsubscribe = () => { };
    if (user && !loading) {
      unsubscribe = onSnapshot(
        doc(db, "userDetail", user.uid),
        async (usrdoc) => {
          if (usrdoc.exists) {
            let pinnedgroup = [];
            if (usrdoc.data()?.pinned?.length > 0) {
              await Promise.all(
                usrdoc.data()?.pinned.map(async (gid) => {
                  const grp = await getgroup(gid);
                  if (grp) {
                    pinnedgroup = [...pinnedgroup, grp];
                  }
                })
              );
            }
            setData({ ...usrdoc.data(), pinned: pinnedgroup });
          }
        }
      );
    }
    return () => unsubscribe();
  }, [user, loading]);

  useEffect(() => {
    if (chatNotiData.length > 0 && user) {
      const unreadedItem = chatNotiData.filter(
        (v, i) => !v.readedby.includes(user.uid)
      );
      if (unreadedItem.length > 0) {
        play();
      }
      setUnreadChat(unreadedItem);
    }
  }, [chatNotiData]);

  return (
    <Box>
      <Box bg="#4C4D88" h="auto" w="100%" px={5} pos="fixed" zIndex={10000}>
        <Flex h={55} alignItems={"center"} justifyContent={"space-between"}>
          <Hide below="md">
            <Flex align={"center"} float={1} cursor="pointer">
              <Text
                color={'white'}
                fontFamily='Mitr'
                fontSize={'2xl'}
                borderStyle={"black"}
                onClick={() => router.push("/")}
              >
                Comuthor
              </Text>
              {/* <Avatar src={user.photoURL} size="md"></Avatar> */}
            </Flex>
          </Hide>

          {/* <Hide below="md">
            <Stack
              marginLeft="5"
              bg="white"
              rounded={10}
              borderWidth={2}
              borderColor={"black"}
            >
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<MagnifyingGlass color="black" />}
                />
                <Input
                  placeholder="ค้นหาบน Comuthor"
                  className={style.search}
                  isDisabled
                />
              </InputGroup>
            </Stack>
          </Hide> */}

          <Spacer />

          <Stack direction={'row'}>
            {user && (
              <Menu placement="bottom" closeOnBlur={true} closeOnSelect={true}>
                <MenuButton
                  rounded="full"
                  cursor="pointer"
                  title="Feeds"
                  position="relative"
                  onClick={() => router.push("/feed")}
                  bg="white"
                  minH={"40px"}
                  minW={"40px"}
                  size={"40px"}
                  _hover={{ bg: 'comuthorYellow' }}
                  _active={{
                    bg: 'comuthorPurple',
                    transform: 'scale(0.98)',
                    borderColor: '#bec3c9',
                  }}
                >
                  <Center pos="relative">
                    <Badge
                      bg="red"
                      rounded={100}
                      pos="absolute"
                      top={"-10px"}
                      left={6}
                      fontSize={"8px"}
                      color="white"
                    >
                      beta
                    </Badge>
                    <House size={28} weight='fill' color="#A0A0A0" />
                  </Center>
                </MenuButton>
              </Menu>

            )}

            <Menu>
              <MenuButton
                bg="white"
                rounded="full"
                variant="link"
                cursor="pointer"
                title="Commu"
                minH={"40px"}
                minW={"40px"}
                _hover={{ bg: 'comuthorYellow' }}
                _active={{
                  bg: 'comuthorPurple',
                  transform: 'scale(0.98)',
                  borderColor: '#bec3c9',
                }}
                _expanded={{ bg: 'comuthorYellow' }}
              >
                <Center>
                  <DotsNine size={28} weight='bold' color="#A0A0A0" />
                </Center>
              </MenuButton>

              <MenuList
                bg={"white"}
                minWidth={"auto"}
                ml={'-100px'}
                color={"black"}
                cursor="pointer"
                borderRadius={10}
                px={3}
              >
                <Text p={2} pl={2} fontSize={23} fontFamily={'SarabunSB'}>เมนู</Text>
                <MenuItem
                  minH="48px"
                  as={"a"}
                  onClick={() => router.push("/group")}
                  title="บอร์ดคอมมู"
                  borderRadius={10}
                  _hover={{
                    backgroundColor: "#D9D9D9",
                  }}
                >
                  <House size={32} />
                  <Center mx={4} fontFamily={'Sarabun'}>บอร์ดคอมมู</Center>
                </MenuItem>

                {user && (
                  <MenuItem
                    minH="48px"
                    as={"a"}
                    onClick={() => router.push("/creategroup")}
                    title="สร้างกลุ่ม"
                    borderRadius={10}
                    _hover={{
                      backgroundColor: "#D9D9D9",
                    }}
                  >
                    <Plus size={32} />
                    <Center mx={4} fontFamily={'Sarabun'}>สร้างกลุ่ม</Center>
                  </MenuItem>
                )}

                {user && (
                  <MenuItem
                    minH="48px"
                    as={"button"}
                    title="หมุด"
                    onClick={onOpen}
                    borderRadius={10}
                    _hover={{
                      backgroundColor: "#D9D9D9",
                    }}
                  >
                    <PushPin size={32} />
                    <Center mx={4} fontFamily={'Sarabun'}>หมุด</Center>
                  </MenuItem>
                )}

                <MenuItem
                  minH="48px"
                  as={"a"}
                  title="กลุ่มสังคม"
                  borderRadius={10}
                  _hover={{
                    backgroundColor: "#D9D9D9",
                  }}
                  isDisabled
                >
                  <UsersThree size={32} />
                  <Center mx={4} fontFamily={'Sarabun'}>กลุ่มสังคม</Center>
                </MenuItem>

                <MenuItem
                  minH="48px"
                  as={"a"}
                  title="ตลาด"
                  borderRadius={10}
                  // isDisabled
                  _hover={{
                    backgroundColor: "#D9D9D9",
                  }}
                  href={"https://comuthor-market-frontend-hclhis5lxq-as.a.run.app/"}
                >
                  <Storefront size={32} />
                  <Center mx={4} fontFamily={'Sarabun'}>ตลาด</Center>
                </MenuItem>

                <MenuItem
                  minH="48px"
                  as={"a"}
                  title="ร้านค้าออฟิเชียล"
                  borderRadius={10}
                  _hover={{
                    backgroundColor: "#D9D9D9",
                  }}
                  cursor={'not-allowed'}
                  isDisabled
                >
                  <ShoppingBag size={32} />
                  <Center mx={4} fontFamily={'Sarabun'}>ร้านค้าออฟิเชียล</Center>
                </MenuItem>
              </MenuList>
            </Menu>

            {user && <ChatMenu />}

            {user && <NotiMenu />}
            <Menu>

              {!user && !loading && (
                <Center bg={"#FFC75A"} rounded={"10"}>
                  <Button
                    variant="primary"
                    onClick={onSigninOpen}
                    title="Login"
                    color="#6768AB"
                  >
                    Login
                  </Button>

                  <Drawer
                    isOpen={isSigninOpen}
                    placement="right"
                    onClose={onSigninClose}
                    finalFocusRef={btnRef}
                    size={"sm"}
                  >
                    <DrawerOverlay />
                    <DrawerContent mt={55}>
                      <DrawerCloseButton color={"white"} mt={4} />
                      <DrawerHeader
                        bg={"black"}
                        color={"white"}
                        fontSize={"30px"}
                      >
                        Sign in
                      </DrawerHeader>

                      <SignIn />
                    </DrawerContent>
                  </Drawer>
                </Center>
              )}

              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent borderWidth={2} borderColor={"black"}>
                  <ModalHeader bg={"gray.50"}>My Pinned</ModalHeader>
                  <ModalCloseButton rounded={"full"} />
                  <ModalBody>
                    {data?.pinned?.length > 0 &&
                      data.pinned.map((doc, k) => (
                        <Text
                          onClick={() => {
                            router.push(
                              "/group/" +
                              doc.gid +
                              (doc.member?.includes(user.uid)
                                ? "/dashboard"
                                : "")
                            );
                            onClose();
                          }}
                          cursor={"pointer"}
                          key={k}
                          fontSize={18}
                          p={1}
                          _hover={{
                            borderRadius: "5",
                            backgroundColor: "gray.100",
                          }}
                        >
                          [{doc.tag}] {doc.name}
                        </Text>
                      ))}
                  </ModalBody>
                </ModalContent>
              </Modal>

              {/* <Button onClick={toggleColorMode}>
                  {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                </Button> */}
              {user && (
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                    minH={0}
                    minHeight={38}
                  >
                    <a href={"/profile/" + user.uid}>
                      <Center>
                        <Show above="lg">
                          <Center width={"auto"} h={41} px={5}>
                            <Center
                              fontFamily={"Sarabun"}
                              fontWeight={150}
                              color={"white"}
                              _hover={{
                                textDecoration: "underline",
                                textDecorationColor: "white"
                              }}
                            >
                              {user.displayName}
                            </Center>
                          </Center>
                        </Show>
                        <Avatar
                          h={41}
                          w={41}
                          src={user.photoURL}
                          loading={"lazy"}
                        />

                      </Center>
                    </a>
                  </MenuButton>

                  <MenuList
                    bg={"#FFFFFF"}
                    // mr={-60}
                    w={100}
                    fontFamily={"Sarabun"}
                  >

                    <Flex
                      as="button"
                      direction='column'
                      width={'100%'}
                      onClick={
                        user
                          ? () => router.push("/profile/" + user.uid)
                          : () => { }
                      }
                      _hover={{
                        bg: "gray.200",
                      }}
                    >
                      <Center width={'100%'} mt={3}>
                        <Avatar
                          size={'lg'}
                          src={user.photoURL}
                        />
                      </Center>

                      <Center width={'100%'}>
                        <Text
                          p={3}
                          fontSize={16}
                          fontFamily={"SarabunSB"}
                          fontWeight={"semibold"}
                        >
                          {user.displayName}
                        </Text>
                      </Center>
                    </Flex>


                    <MenuDivider />

                    <MenuItem
                      fontFamily={"SarabunSB"}
                      _hover={{
                        backgroundColor: "gray.300",
                      }}
                      isDisabled
                    >
                      Account Settings
                    </MenuItem>
                    <MenuItem
                      fontFamily={"SarabunSB"}
                      onClick={() => router.push("/logout")}
                      _hover={{
                        backgroundColor: "gray.300",
                      }}
                    >
                      Logout
                    </MenuItem>

                  </MenuList>
                </Menu>
              )}

            </Menu>
          </Stack>


        </Flex>
      </Box>

      {!disableChatbar && (
        <>
          <Chatsidebar user={user} db={db} isExpanded={smallChatbar} />
          {user && (
            <ChatBar
              chatnotidata={chatNotiData}
              user={user}
              smallChatbar={smallChatbar}
            />
          )}
        </>
      )}

      <Progress isAnimating={isAnimate} />
    </Box>
  );
}

export default CustomNavbar;