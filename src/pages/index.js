import {
  // NOTE: import element
  CheckboxGroup,
  Heading,
  Checkbox,
  Stack,
  Box,
  InputGroup,
  InputLeftAddon,
  Text,
  Input,
  InputRightAddon,
  Button,
  Radio,
  RadioGroup,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Badge,
  Flex,
  Avatar,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  FormControl,
  FormLabel,
  HStack,
  InputRightElement,
  useColorModeValue,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorMode,
  Center,
  ButtonGroup,
  Divider,
} from "@chakra-ui/react";
import React, { useState } from "react";
import KofiButton from './KofiButton';
import Header from "./header";

// NOTE: value
const koFiWidgetCode = `<iframe id='kofiframe' src='https://ko-fi.com/mujina7569/?hidefeed=true&widget=true&embed=true&preview=true' style='border:none;width:100%;padding:4px;background:#f9f9f9;' height='712' title='mujina7569'></iframe>`;
const koFiButton = `<script type='text/javascript' src='https://storage.ko-fi.com/cdn/widget/Widget_2.js'></script><script type='text/javascript'>kofiwidget2.init('Support Me on Ko-fi', '#29abe0', 'D1D15QW3O');kofiwidget2.draw();</script> `;
const index = () => {
  const [form, setForm] = useState({
    rights: [],
    installment: 50,
    remind: 1,
    remindUnit: "วัน",
    deliverables: [],
    size: {
      width: 3508,
      height: 2480,
      dpi: 300,
    },
    maxSize: {
      width: 3508,
      height: 2480,
      dpi: 300,
    },
    addDeliverables: [],
    rush: "",
    rushDuration: 3,
    commercialPercent: 50,
    commercialPercentSorce: "ราคาเริ่มต้น",
  });

  const [choice, setChoice] = useState('accept');

  const [template, setTemplate] = useState(null);
  const generateTemplate = () => {
    const rightsText = form.rights.join(', ');
    const deliverablesText = form.deliverables.join(', ');
    const addDeliverablesText = form.addDeliverables.join(', ');

    // NOTE: Text
    const listTemplate = (
      <ul>
        <li>ลูกค้าจะต้องติดต่อจ้าง ผ่านช่องทางที่ระบุไว้เท่านั้น</li>
        <li>
          สามารถนำรูปไปใช้ {rightsText} โดยต้องให้เครดิตหรือแสดงแหล่งที่มา พร้อมลิงค์ช่องโซเซียลมิเดียที่ระบุไว้
        </li>
        <li>
          รูปจะถูกนำไปใช้เป็นตัวอย่างงาน หากไม่ต้องการให้โพสต์เป็นตัวอย่างงาน กรุณาแจ้งล่วงหน้า
        </li>
        <li>
          หลังจากที่ยันยันแบบร่างเรียบร้อย ลูกค้าจะต้องชำระมัดจำ {form.installment}% ของราคางาน และจะดำเนินงานต่อเมื่อชำระมัดจำเรียบร้อยแล้ว
        </li>
        <li>
          ลูกค้าสามารถติดต่อสอบถามความคืบหน้าได้ ไม่เกิน {form.remind} ครั้งต่อ {form.remindUnit} โดยติดต่อผ่านช่องทางติดต่อที่ระบุไว้เท่านั้น
        </li>
        <li>
          ไฟล์ที่ได้รับจะเป็นนามสกุล {deliverablesText} ขนาด {form.size.width} x {form.size.height} px {form.size.dpi} DPI หากขนาดใหญ่กว่า {form.maxSize.width} x {form.maxSize.height} px {form.maxSize.dpi} DPI หรือต้องการไฟล์ {addDeliverablesText} จะมีการคิดเพิ่ม
        </li>
        {choice === 'decline' && <li>ไม่รับงานเร่งทุกกรณี</li>}
        {choice === 'accept' && <li>รับงานเร่งไม่ต่ำกว่า {form.rushDuration} วันเท่านั้น</li>}
        <li>
          หากต้องการสิทธิ์เชิงพาณิชย์ โปรดแจ้งก่อนทุกครั้ง คิดเพิ่ม {form.commercialPercent} % ของ{form.commercialPercentSorce}
        </li>
      </ul>
    );
    setTemplate(listTemplate);
  };

  const handleRadioChange = (e) => {
    setForm((prev) => ({ ...prev, rush: e.target.value }))
    setChoice(e.target.value);
    console.log(choice)
    // generateTemplate();
  };

  const copyToClipboard = () => {
    const listElement = document.getElementById("output");
    const listItems = listElement.querySelectorAll('li');
    const plainTextItems = [];

    listItems.forEach((item, index) => {
      plainTextItems.push(`${index + 1}. ${item.textContent}`);
    });

    const plainText = plainTextItems.join('\n');

    if (navigator.clipboard) {
      navigator.clipboard.writeText(plainText)
        .then(() => {
          alert("คัดลอก สำเร็จ");
        })
        .catch((err) => {
          console.error("Error copying plain text to clipboard:", err);
        });
    } else {
      alert("Clipboard API is not supported in this browser. You can manually copy the text.");
    }
  };

  return (
    
    <Box>
      <Heading textStyle={"h1"}>ToS Generator</Heading>
      <br />
      <Tabs isFitted variant='enclosed'>
        <TabList>
          <Tab>Simple ToS</Tab>
          <Tab>Full ToS</Tab>
          <Tab>About me</Tab>
        </TabList>
        <TabPanels>
          <TabPanel> {/* NOTE: Simple Form */}

            <CheckboxGroup
              value={form.rights}
              onChange={(val) => setForm((prev) => ({ ...prev, rights: val }))}
            >
              <Text>สิทธิ์การใช้งาน ในราคาปกติ</Text>
              <Stack direction={"row"}>
                <Checkbox value="ส่วนตัว" defaultChecked>
                  ส่วนตัว
                </Checkbox>
                <Checkbox value="แจกจ่าย">แจกจ่าย</Checkbox>
                <Checkbox value="เชิงพาณิชย์">เชิงพาณิชย์</Checkbox>
              </Stack>
            </CheckboxGroup>

            <InputGroup>
              <InputLeftAddon>
                <Text>ราคามัดจำ ก่อนเริ่มงาน</Text>
              </InputLeftAddon>
              <Input
                value={form.installment}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, installment: e.target.value }))
                }
              ></Input>
              <InputRightAddon>%</InputRightAddon>
            </InputGroup>

            <InputGroup>
              <InputLeftAddon>
                <Text>จำนวนครั้ง สอบถาม/ทวงงาน</Text>
              </InputLeftAddon>
              <Input
                value={form.remind}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, remind: e.target.value }))
                }
              ></Input>
              <InputRightAddon>ครั้งต่อ</InputRightAddon>
              {/* <RadioGroup defaultValue='1'>
          <Stack direction='row'>
            <Radio value='1'>วัน</Radio>
            <Radio value='2'>สัปดาห์</Radio>
          </Stack>
        </RadioGroup> */}
              <Select
                placeholder="วัน/สัปดาห์"
                value={form.remindUnit}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, remindUnit: e.target.value }))
                }
              >
                <option value="วัน">วัน</option>
                <option value="สัปดาห์">สัปดาห์</option>
              </Select>
            </InputGroup>

            <CheckboxGroup
              value={form.deliverables}
              onChange={(val) => setForm((prev) => ({ ...prev, deliverables: val }))}
            >
              <Text>ไฟล์ปกติที่ลูกค้าจะได้รับ</Text>
              <Stack direction={"row"}>
                <Checkbox value="JPG">.JPG</Checkbox>
                <Checkbox value="PNG">.PNG</Checkbox>
                <Checkbox defaultChecked value="PSD">
                  .PSD (Photoshop)
                </Checkbox>
                <Checkbox value="SAI">.SAI (SAI Paint tool)</Checkbox>
                <Checkbox value="CLIP">.CLIP (CLIP STUDIO)</Checkbox>
              </Stack>
            </CheckboxGroup>

            <Text>ขนาดรูปปกติ (สำหรับ A4 ใช้ 3508 x 2480 px 300 DPI)</Text>
            <InputGroup>
              <InputLeftAddon>
                <Text>กว้าง</Text>
              </InputLeftAddon>
              {console.log(form)}
              <Input
                value={form.size.width}
                onChange={(e) => setForm((prev) => {
                  console.log(prev)
                  return { ...prev, size: { ...prev.size, width: e.target.value } };
                })}
              ></Input>
              <InputRightAddon>px</InputRightAddon>

              <InputLeftAddon>
                <Text>ยาว</Text>
              </InputLeftAddon>
              <Input
                value={form.size.height}
                onChange={(e) => setForm((prev) => ({ ...prev, size: { ...prev.size, height: e.target.value } }))}
              ></Input>
              <InputRightAddon>px</InputRightAddon>

              <InputLeftAddon>
                <Text>ความละเอียดไฟล์</Text>
              </InputLeftAddon>
              <Input
                value={form.size.dpi}
                onChange={(e) => setForm((prev) => ({ ...prev, size: { ...prev.size, dpi: e.target.value } }))}
              ></Input>
              <InputRightAddon>DPI</InputRightAddon>
            </InputGroup>

            <Text>ขนาดรูปสูงสุดในราคาปกติ</Text>
            <InputGroup>
              <InputLeftAddon>
                <Text>กว้าง</Text>
              </InputLeftAddon>
              <Input
                value={form.maxSize.width}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, maxSize: { ...prev.maxSize, width: e.target.value } }))
                }
              ></Input>
              <InputRightAddon>px</InputRightAddon>

              <InputLeftAddon>
                <Text>ยาว</Text>
              </InputLeftAddon>
              <Input
                value={form.maxSize.height}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, maxSize: { ...prev.maxSize, height: e.target.value } }))
                }
              ></Input>
              <InputRightAddon>px</InputRightAddon>

              <InputLeftAddon>
                <Text>ความละเอียดไฟล์</Text>
              </InputLeftAddon>
              <Input
                value={form.maxSize.dpi}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, maxSize: { ...prev.maxSize, dpi: e.target.value } }))
                }
              ></Input>
              <InputRightAddon>DPI</InputRightAddon>
            </InputGroup>

            <CheckboxGroup
              value={form.addDeliverables}
              onChange={(val) =>
                setForm((prev) => ({ ...prev, addDeliverables: val }))
              }
            >
              <Text>ไฟล์ที่จะคิดราคาเพิ่ม</Text>
              <Stack direction={"row"}>
                <Checkbox value="JPG">.JPG</Checkbox>
                <Checkbox value="PNG">.PNG</Checkbox>
                <Checkbox value="PSD">.PSD (Photoshop)</Checkbox>
                <Checkbox value="SAI">.SAI (SAI Paint tool)</Checkbox>
                <Checkbox value="CLIP">.CLIP (CLIP STUDIO)</Checkbox>
              </Stack>
            </CheckboxGroup>

            <RadioGroup
              value={form.rush}
              onChange={(val) => setForm((prev) => ({ ...prev, rush: val }))}
            >
              <Text>การรับงานเร่ง</Text>
              <Stack direction="row">
                <Radio value="accept"
                  checked={choice === 'accept'}
                  onChange={handleRadioChange}
                >รับงานเร่ง</Radio>
                <Radio value="decline"
                  checked={choice === 'decline'}
                  onChange={handleRadioChange}>ไม่รับงานเร่ง</Radio>
              </Stack>
            </RadioGroup>

            <InputGroup>
              <InputLeftAddon>
                <Text>ระยะเวลาทำงานเร็วที่สุด สำหรับงานเร่ง</Text>
              </InputLeftAddon>
              <Input
                value={form.rushDuration}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, rushDuration: e.target.value }))
                }
              ></Input>
              <InputRightAddon>วัน</InputRightAddon>
            </InputGroup>

            <InputGroup>
              <InputLeftAddon>
                <Text>การคิดราคาเชิงพาณิชย์ เพิ่มอีก</Text>
              </InputLeftAddon>
              <Input
                value={form.commercialPercent}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, commercialPercent: e.target.value }))
                }
              ></Input>
              <InputRightAddon>% ของ</InputRightAddon>
              <Select
                placeholder="ราคาเริ่ม/ราคารวม"
                value={form.commercialPercentSorce}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    commercialPercentSorce: e.target.value,
                  }))
                }
              >
                <option value="ราคาเริ่มต้น">ราคาเริ่มต้น</option>
                <option value="ราคารวม">ราคารวม</option>
              </Select>
            </InputGroup>
            <br />
            <ButtonGroup>
            <Button onClick={generateTemplate}>Generate</Button>
            </ButtonGroup>
            <br /><br />
            <Divider />
            <br />
            <Box>
            <Text id="output">{template}</Text>
            <Button onClick={copyToClipboard}>Copy to Clipboard</Button></Box>
          </TabPanel>

          <TabPanel> {/* NOTE: Full Form */}
            <Alert status='warning'>
              <AlertIcon />
              Coming Soon...
            </Alert>
            
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Simple ToS Generator
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <HStack>              
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input type="text" />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input type="text" />
                </FormControl>
              </Box>
            </HStack>

            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
            </FormControl>

            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input/>
                <InputRightElement h={'full'}>
                  <Button>
                    test
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign up
              </Button>
            </Stack>

<Stack spacing={10} pt={2}>
  <Button
    loadingText="Submitting"
    size="lg"
    bg={'blue.400'}
    color={'white'}
    _hover={{
      bg: 'blue.500',
    }}>
    Sign up
  </Button>
</Stack>

          </Stack>
        </Box>
      </Stack>
    </Flex>
          </TabPanel>

          <TabPanel> {/* NOTE: Info */}
            {/* <Flex>
              <Avatar src='https://bit.ly/sage-adebayo' />
              <Box ml='3'>
                <Text fontWeight='bold'>
                  Segun Adebayo
                  <Badge ml='1' colorScheme='green'>
                    New
                  </Badge>
                </Text>
                <Text fontSize='sm'>UI Engineer</Text>
              </Box>
            </Flex> */}
            <div dangerouslySetInnerHTML={{ __html: koFiWidgetCode }} />
            <div dangerouslySetInnerHTML={{ __html: koFiButton }} />
            <br />
            <ButtonGroup>
            <Button bg={"#f49415"} color='white' w='100px'>Tipme</Button>
            <Button bg={"#13C3FF"} color='white'>Ko-Fi</Button>
            </ButtonGroup>
            
                {/* <Button id="kofi-button">Support Me on Ko-fi</Button> */}
                {/* <div style={{ textAlign: 'center', marginTop: '20px' }}>

                
        <a
          href='https://ko-fi.com/YOUR_KO_FI_USERNAME'
          target='_blank'
          rel='noopener noreferrer'
          style={{
            backgroundColor: '#29abe0',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: '4px',
            textDecoration: 'none',
            fontSize: '16px',
            transition: 'background-color 0.3s ease',
          }}
        >
          Support Me on Ko-fi
        </a>
      </div> */}
      
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default index;