import {
  Box,
  Stack,
  HStack,
  VStack,
  Text,
  Heading,
  Link,
  Tooltip,
  Divider,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputGroup,
  InputRightAddon,
  InputLeftAddon,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  ButtonGroup,
  Button,
  CheckboxGroup,
  Checkbox,
  RadioGroup,
  Radio,
} from '@chakra-ui/react';

import {
  InfoIcon,
} from '@chakra-ui/icons';

import {
  FaRegCopy,
  FaDonate,
  FaGithub,
} from 'react-icons/fa';

import { 
  LiaPenNibSolid, 
} from "react-icons/lia";

import { 
  SiKofi 
} from "react-icons/si";

import React, { useState } from 'react';

// NOTE: Value
const index = () => {
  const [form, setForm] = useState({
    rights: ['ส่วนตัว', 'แจกจ่าย'],
    deposit: 50,
    remind: 1,
    remindUnit: 'วัน',
    ext: ['JPG', 'PNG'],
    size: {
      width: 3508,
      height: 2480,
      dpi: 150,
    },
    maxSize: {
      width: 3508,
      height: 2480,
      dpi: 300,
    },
    addExt: ['PSD'],
    rush: 'accept',
    rushDuration: 3,
    multiplier: 3,
    multiplierMode: 'ราคาเริ่มต้น',
  });

  const [choice, setChoice] = useState('accept');

  const [template, setTemplate] = useState(null);
  const generateTemplate = () => {
    const rightsText = form.rights.join(', ');
    const extText = form.ext.join(', ');
    const addExtText = form.addExt.join(', ');

    // NOTE: Template
    const listTemplate = (
      <ol>
        <li>ลูกค้าจะต้องติดต่อจ้าง ผ่านช่องทางที่ระบุไว้เท่านั้น</li>
        <li>
          สามารถนำรูปไปใช้ {rightsText} โดยต้องให้เครดิตหรือแสดงแหล่งที่มา พร้อมลิงค์ช่องโซเซียลมิเดียที่ระบุไว้
        </li>
        <li>
          รูปจะถูกนำไปใช้เป็นตัวอย่างงาน หากไม่ต้องการให้โพสต์เป็นตัวอย่างงาน กรุณาแจ้งล่วงหน้า
        </li>
        <li>
          หลังจากที่ยันยันแบบร่างเรียบร้อย ลูกค้าจะต้องชำระมัดจำ {form.deposit}% ของราคางาน และจะดำเนินงานต่อเมื่อชำระมัดจำเรียบร้อยแล้ว
        </li>
        <li>
          ลูกค้าสามารถติดต่อสอบถามความคืบหน้าได้ ไม่เกิน {form.remind} ครั้งต่อ {form.remindUnit} โดยติดต่อผ่านช่องทางติดต่อที่ระบุไว้เท่านั้น
        </li>
        <li>
          ไฟล์ที่ได้รับจะเป็นนามสกุล {extText} ขนาด {form.size.width} x {form.size.height} px {form.size.dpi} DPI หากขนาดใหญ่กว่า {form.maxSize.width} x {form.maxSize.height} px {form.maxSize.dpi} DPI หรือต้องการไฟล์ {addExtText} จะมีการคิดเพิ่ม
        </li>
        {choice === 'decline' && <li>ไม่รับงานเร่งทุกกรณี</li>}
        {choice === 'accept' && <li>รับงานเร่งไม่ต่ำกว่า {form.rushDuration} วันเท่านั้น</li>}
        <li>
          หากต้องการสิทธิ์เชิงพาณิชย์ โปรดแจ้งก่อนทุกครั้ง คิดเพิ่ม {form.multiplier} เท่าของ{form.multiplierMode}
        </li>
      </ol>
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
    const listElement = document.getElementById('output');
    const listItems = listElement.querySelectorAll('li');
    const plainTextItems = [];

    listItems.forEach((item, index) => {
      plainTextItems.push(`${index + 1}. ${item.textContent}`);
    });

    const plainText = plainTextItems.join('\n');

    if (navigator.clipboard) {
      navigator.clipboard.writeText(plainText)
        .then(() => {
          alert('คัดลอกสำเร็จ');
        })
        .catch((err) => {
          console.error('Error copying plain text to clipboard:', err);
        });
    } else {
      alert('Clipboard API is not supported in this browser. You can manually copy the text.');
    }
  };


  return (
    <Box>
      <Box bgColor={'#E7EDFD'} color={'#486189'}>
      <Heading textStyle={'h1'} padding={3}>
        Simple ToS Generator
      </Heading>
      </Box>
      <Alert status='error'color={'#e43f3f'}>
  <AlertIcon />
  <Text>แบบข้อตกลงเบื้องต้นนี้ มีไว้เพื่อเป็นแนวทางในการเขียนข้อตกลงสำหรับใช้ในคอมมิชชั่น หรืองานจ้างต่างๆ ผู้พัฒนาจะไม่รับผิดชอบต่อผลทางกฏหมาย และความเสียหาย/ความสูญเสียโดยตรงหรือโดยอ้อมที่บุคคล/บริษัทได้รับ เนื่องจากการใช้เอกสารนี้ 
โปรดปรึกษากับทนาย ก่อนนำไปใช้ทางกฏหมาย</Text>
</Alert>
      <Alert status='warning' color={'#DD6B20'}>
        <AlertIcon />
        <AlertTitle>อยู่ในระหว่างพัฒนา!</AlertTitle>
  <AlertDescription>ตัวเว็บยังอยู่ในช่วงพัฒนานะครับ หากพบปัญหา หรือมีข้อเสนอแนะ สามารถแจ้งได้ทั้งทาง{' '}
          <Link color='teal.500' href='https://www.facebook.com/100071647267777/'>Facebook</Link>,{' '}
          <Link color='teal.500' href='https://twitter.com/mujina7569/'>Twitter (X)</Link>{' '}และ{' '}
          <Link color='teal.500' href='https://github.com/Mujina7569/cms-tos-generator/issues'>Github issues</Link></AlertDescription>
      </Alert>
      <br />

      <HStack>
        {/* NOTE: Rights */}
        <Box maxW='md' borderWidth='3px' borderRadius='lg' padding={5} margin={30}>
          <FormControl>
            <FormLabel>สิทธิ์การใช้งาน ในราคาปกติ</FormLabel>
            <CheckboxGroup
              defaultValue={['ส่วนตัว', 'แจกจ่าย']}
              value={form.rights}
              onChange={(val) => setForm((prev) => ({ ...prev, rights: val }))}
            >
              <Stack direction={'row'} spacing={4}>
                <Checkbox value='ส่วนตัว'>
                  ส่วนตัว{' '}
                  <Tooltip label='Fanart หรือใช้โรลเพลย์, รูปโปรไฟล์ เป็นต้น'>
                    <InfoIcon />
                  </Tooltip>
                </Checkbox>
                <Checkbox value='แจกจ่าย'>แจกจ่าย{' '}
                  <Tooltip label='ของขวัญ หรือใช้ในงานการกุศล ตามจำนวนที่นักวาดกำหนดไว้'>
                    <InfoIcon />
                  </Tooltip></Checkbox>
                <Checkbox value='เชิงพาณิชย์'>เชิงพาณิชย์{' '}
                  <Tooltip label='ใช้ประกอบสินค้า และโปรโมทการค้า มีกำไร เช่น กู้ด, ปกนิยาย, โปรโมทการค้า เป็นต้น'>
                    <InfoIcon />
                  </Tooltip>
                </Checkbox>
              </Stack>
            </CheckboxGroup>
          </FormControl>
        </Box>

        <VStack>
      {/* NOTE: Deposit */}
      <FormControl>
        <InputGroup maxW='xl' marginBottom={'20px'}>
          <InputLeftAddon borderLeftRadius='2xl' bgColor={'#E7EDFD'}>
            ราคามัดจำ ก่อนเริ่มงาน
          </InputLeftAddon>
          <Input
            value={form.deposit}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, deposit: e.target.value }))
            }
          ></Input>
          <InputRightAddon borderRightRadius='2xl' bgColor={'#E7EDFD'}>%</InputRightAddon>
        </InputGroup>

        {/* NOTE: Reminders */}
        <InputGroup maxW='xl'>
          <InputLeftAddon borderLeftRadius='2xl' bgColor={'#E7EDFD'}>
            จำนวนครั้ง สอบถาม/ทวงงาน
          </InputLeftAddon>
          <Input
            value={form.remind}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, remind: e.target.value }))
            }
          ></Input>
          <InputRightAddon borderRightRadius='none' bgColor={'#E7EDFD'}>ครั้งต่อ</InputRightAddon>
          {/* <RadioGroup defaultValue='1'>
          <Stack direction='row'>
            <Radio value='1'>วัน</Radio>
            <Radio value='2'>สัปดาห์</Radio>
          </Stack>
        </RadioGroup> */}
          <Select
            borderLeftRadius='none'
            borderRightRadius='2xl'
            borderLeftWidth={'0'}
            value={form.remindUnit}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, remindUnit: e.target.value }))
            }
          >
            <option value='วัน'>วัน</option>
            <option value='สัปดาห์'>สัปดาห์</option>
          </Select>
        </InputGroup>
        </FormControl>
        </VStack>

      </HStack>


        <FormControl>
        <HStack>
          {/* NOTE: File Types */}
          <Box maxW='md' borderWidth='3px' borderRadius='lg' padding={5} margin={30}>
            <FormLabel>ไฟล์ปกติที่ลูกค้าจะได้รับ</FormLabel>
            <CheckboxGroup
              value={form.ext}
              onChange={(val) => setForm((prev) => ({ ...prev, ext: val }))}
            >
              <Stack direction={'row'}>
                <Checkbox value='JPG'>.JPG</Checkbox>
                <Checkbox value='PNG'>.PNG</Checkbox>
                <Checkbox value='PSD'>
                  .PSD{' '}
                  <Tooltip label='ไฟล์ของโปรแกรม Adobe Photoshop'>
                    <InfoIcon />
                  </Tooltip>
                </Checkbox>
                <Checkbox value='SAI'>.SAI{' '}
                  <Tooltip label='ไฟล์ของโปรแกรม SAI Paint tool'>
                    <InfoIcon />
                  </Tooltip>
                </Checkbox>
                <Checkbox value='CLIP'>.CLIP{' '}
                  <Tooltip label='ไฟล์ของโปรแกรม CLIP STUDIO PAINT'>
                    <InfoIcon />
                  </Tooltip>
                </Checkbox>
              </Stack>
            </CheckboxGroup>
          </Box>


          {/* NOTE: Additional */}
          <Box maxW='md'
            borderWidth='3px' borderRadius='lg'
           
            padding={5} margin={30}>
            <FormLabel>ไฟล์ที่จะคิดราคาเพิ่ม</FormLabel>
            <CheckboxGroup
              value={form.addExt}
              onChange={(val) =>
                setForm((prev) => ({ ...prev, addExt: val }))
              }
            >
              <Stack direction={'row'}>
                <Checkbox value='JPG'>.JPG</Checkbox>
                <Checkbox value='PNG'>.PNG</Checkbox>
                <Checkbox value='PSD'>.PSD{' '}
                  <Tooltip label='ไฟล์ของโปรแกรม Adobe Photoshop'>
                    <InfoIcon />
                  </Tooltip>
                </Checkbox>
                <Checkbox value='SAI'>.SAI{' '}
                  <Tooltip label='ไฟล์ของโปรแกรม SAI Paint tool'>
                    <InfoIcon />
                  </Tooltip>
                </Checkbox>
                <Checkbox value='CLIP'>.CLIP{' '}
                  <Tooltip label='ไฟล์ของโปรแกรม CLIP STUDIO PAINT'>
                    <InfoIcon />
                  </Tooltip>
                </Checkbox>
              </Stack>
            </CheckboxGroup>
          </Box>
        </HStack>

        <HStack>
        {/* NOTE: File Size */}
        <Box maxW='4xl' borderWidth='3px' borderRadius='lg' padding={5} margin={30}>
          <FormLabel>ขนาดรูปปกติ</FormLabel>
          <FormHelperText>(สำหรับ A4 แนะนำ 3508 x 2480 px 150 DPI)</FormHelperText>
          <HStack>
          <InputGroup>
            <InputLeftAddon borderLeftRadius='2xl' bgColor={'#E7EDFD'}>
              กว้าง
            </InputLeftAddon>
            {console.log(form)}
            <Input
              value={form.size.width}
              onChange={(e) => setForm((prev) => {
                console.log(prev)
                return { ...prev, size: { ...prev.size, width: e.target.value } };
              })}
            ></Input>
            <InputRightAddon borderRightRadius='2xl' bgColor={'#E7EDFD'}>px</InputRightAddon>
            </InputGroup>

            <InputGroup>
            <InputLeftAddon borderLeftRadius='2xl' bgColor={'#E7EDFD'}>
              ยาว
            </InputLeftAddon>
            <Input
              value={form.size.height}
              onChange={(e) => setForm((prev) => ({ ...prev, size: { ...prev.size, height: e.target.value } }))}
            ></Input>
            <InputRightAddon borderRightRadius='2xl' bgColor={'#E7EDFD'}>px</InputRightAddon>
            </InputGroup>

            <InputGroup>
            <InputLeftAddon borderLeftRadius='2xl' bgColor={'#E7EDFD'}>
              ความละเอียดไฟล์
            </InputLeftAddon>
            <Input
              value={form.size.dpi}
              onChange={(e) => setForm((prev) => ({ ...prev, size: { ...prev.size, dpi: e.target.value } }))}
            ></Input>
            <InputRightAddon borderRightRadius='2xl' bgColor={'#E7EDFD'}>DPI</InputRightAddon>
          </InputGroup>
          </HStack>
        </Box>
        </HStack>

        {/* NOTE: Max Size */}
        <Box maxW='4xl' borderWidth='3px' borderRadius='lg' padding={5} margin={30}>
          <FormLabel>ขนาดรูปสูงสุดในราคาปกติ</FormLabel>
          <FormHelperText>(สำหรับ A4 แนะนำ 3508 x 2480 px 300 DPI)</FormHelperText>
          <HStack>
          <InputGroup>
            <InputLeftAddon borderLeftRadius='2xl' bgColor={'#E7EDFD'}>
              กว้าง
            </InputLeftAddon>
            <Input
              value={form.maxSize.width}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, maxSize: { ...prev.maxSize, width: e.target.value } }))
              }
            ></Input>
            <InputRightAddon borderRightRadius='2xl' bgColor={'#E7EDFD'}>px</InputRightAddon>
            </InputGroup>

            <InputGroup>
            <InputLeftAddon borderLeftRadius='2xl' bgColor={'#E7EDFD'}>
              ยาว
            </InputLeftAddon>
            <Input
              value={form.maxSize.height}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, maxSize: { ...prev.maxSize, height: e.target.value } }))
              }
            ></Input>
            <InputRightAddon borderRightRadius='2xl' bgColor={'#E7EDFD'}>px</InputRightAddon>
            </InputGroup>

            <InputGroup>
            <InputLeftAddon borderLeftRadius='2xl' bgColor={'#E7EDFD'}>
              ความละเอียดไฟล์
            </InputLeftAddon>
            <Input
              value={form.maxSize.dpi}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, maxSize: { ...prev.maxSize, dpi: e.target.value } }))
              }
            ></Input>
            <InputRightAddon borderRightRadius='2xl' bgColor={'#E7EDFD'}>DPI</InputRightAddon>
          </InputGroup>
          </HStack>
        </Box>


        <HStack>
        {/* NOTE: Rush Orders */}
        <Box maxW='md' borderWidth='3px' borderRadius='lg' padding={5} margin={30}>
          <FormLabel>การรับงานเร่ง</FormLabel>
          <RadioGroup
            value={form.rush}
            onChange={(val) => setForm((prev) => ({ ...prev, rush: val }))}
          >
            <Stack direction='row'>
              <Radio value='accept'
                checked={choice === 'accept'}
                onChange={handleRadioChange}
              >รับงานเร่ง</Radio>
              <Radio value='decline'
                checked={choice === 'decline'}
                onChange={handleRadioChange}>ไม่รับงานเร่ง</Radio>
            </Stack>
          </RadioGroup>
        </Box>

        <VStack>
        {/* NOTE: Rush Time */}
        <InputGroup maxW='xl' marginBottom={'20px'}>
          <InputLeftAddon borderLeftRadius='2xl' bgColor={'#E7EDFD'}>
            ระยะเวลาทำงานเร็วที่สุด สำหรับงานเร่ง
          </InputLeftAddon>
          <Input
            value={form.rushDuration}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, rushDuration: e.target.value }))
            }
          ></Input>
          <InputRightAddon borderRightRadius='2xl' bgColor={'#E7EDFD'}>วัน</InputRightAddon>
        </InputGroup>

        {/* NOTE: Comercial */}
        <InputGroup maxW='xl'>
          <InputLeftAddon borderLeftRadius='2xl' bgColor={'#E7EDFD'}>
            การคิดราคาเชิงพาณิชย์ เพิ่มอีก
          </InputLeftAddon>
          <NumberInput 
            maxW='sm'
            value={form.multiplier}
            onChange={ (e) =>
              setForm((prev) => ({ ...prev, multiplier: e }))
            }
          >

            <NumberInputField
              borderRadius='none' />
          </NumberInput>
          <InputRightAddon
            borderRightRadius='none' bgColor={'#E7EDFD'}>เท่าของ</InputRightAddon>
          <Select
            borderLeftRadius='none'
            borderRightRadius='2xl'
            borderLeftWidth={'0'}
            value={form.multiplierMode}
            onChange={(e) =>
              setForm((prev) => ({...prev, multiplierMode: e.target.value}))
            }
          >
            <option value='ราคาเริ่มต้น'>ราคาเริ่มต้น</option>
            <option value='ราคารวม'>ราคารวม</option>
          </Select>
        </InputGroup>
      </VStack>
        
        </HStack>
        <br />
        <Box maxW='md' margin={30}>
          <Button
            bgColor={'#486189'}
            color={'white'}
            borderRadius='full'
            leftIcon={<LiaPenNibSolid />}
            onClick={generateTemplate}
          >
            Generate</Button>
        </Box>
      </FormControl>

      <br /><br />
      <Divider />
      <br />
      {/* NOTE: Output */}
      <Box maxW='5xl' margin={30}>
      <Box maxW='5xl' margin={30}>
        <Text id='output'>{template}</Text>
        </Box>
        <Button
            leftIcon={<FaRegCopy />} 
            onClick={copyToClipboard}>Copy to Clipboard</Button>
      </Box>

      <br /><br />
      <Divider />
      <br />
      <Box maxW='md' margin={30} alignContent={'center'}>
      {/* NOTE: Donation */}
      <ButtonGroup>
        <Link href='https://tipme.in.th/mujina7569' isExternal>
        <Button bg={'#f49415'} color='white'
            leftIcon={<FaDonate />}>สมทบทุนค่าเน็ตผ่าน Tipme</Button>
        </Link>
        <Link href='https://ko-fi.com/mujina7569' isExternal>
        <Button bg={'#13C3FF'} color='white'
            leftIcon={<SiKofi />}>สมทบทุนค่าเน็ตผ่าน Ko-Fi</Button>
        </Link>
      </ButtonGroup>
      </Box>
    </Box>
  );
};

export default index;