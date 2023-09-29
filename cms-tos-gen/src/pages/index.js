import { CheckboxGroup, Heading, Checkbox, Stack, Box, InputGroup, InputLeftAddon, Text, Input, InputRightAddon } from "@chakra-ui/react";
import React, { useState } from "react";

const index = () => {
  const [form, setForm] = useState({
    rights: [],
    installment: 0,
    remind: 0,
    remindUnit: "วัน",
    deliverables: [],
    size: {
      width: 0,
      height: 0,
      dpi: 0,
    },
    maxSize: {
      width: 0,
      height: 0,
      dpi: 0,
    },
    addDeliverables: [],
    hurry: "",
    hurryDuration: 0,
    commercialPercent: 0,
    commercialPercentSorce: "ราคาเริ่มต้น",
  });
  return (
    <Box>
      <Heading textStyle={"h1"}>Simple ToS Generator</Heading>
      <CheckboxGroup value={form.rights} onChange={(val)=> setForm((prev)=>prev.rights = val)}>
        <Stack direction={"row"}>
          <Checkbox value="ส่วนตัว">ส่วนตัว</Checkbox>
          <Checkbox value="แจกจ่าย">แจกจ่าย</Checkbox>
          <Checkbox value="เชิงพาณิชย์">เชิงพาณิชย์</Checkbox>
        </Stack>
      </CheckboxGroup>
      <InputGroup>
        <InputLeftAddon>
          <Text>ราคามัดจำ ก่อนเริ่มงาน</Text>
        </InputLeftAddon>
        <Input value={form.installment} onChange={(e)=>setForm((prev)=>prev.rights = e.target.value)}></Input>
        <InputRightAddon>%</InputRightAddon>
      </InputGroup>
      <label for="times">จำนวนครั้ง สอบถาม/ทวงงาน</label>
      <input type="number" id="times" name="times" min="1" max="10" />
      <select id="days" name="days">
        <option value="วัน">วัน</option>
        <option value="สัปดาห์">สัปดาห์</option>
      </select>
      <br />
      <br />
      <label for="ext">ไฟล์ปกติที่ลูกค้าจะได้รับ</label>
      <br />
      <input type="checkbox" id="่jpg" name="ext" value=".JPG" /> .JPG
      <input type="checkbox" id="png" name="ext" value=".PNG" /> .PNG
      <input type="checkbox" id="psd" name="ext" value=".PSD" /> .PSD
      (Photoshop)
      <input type="checkbox" id="sai" name="ext" value=".SAI" /> .SAI (SAI Paint
      tool)
      <input type="checkbox" id="clip" name="ext" value=".CLIP" /> .CLIP (CLIP
      STUDIO)
      <br />
      <br />
      <label>ขนาดรูปปกติ (สำหรับ A4 ใช้ 3508 x 2480 px 300 DPI)</label>
      <br />
      <label for="width">กว้าง:</label>
      <input type="number" id="width" name="width" />
      <label for="height">ยาว:</label>
      <input type="number" id="height" name="height" />
      <label for="dpi">DPI:</label>
      <input type="number" id="dpi" name="dpi" />
      <br />
      <br />
      <label>ขนาดรูปสูงสุดในราคาปกติ</label>
      <br />
      <label for="Maxwidth">กว้าง:</label>
      <input type="number" id="Maxwidth" name="Maxwidth" />
      <label for="Maxheight">ยาว:</label>
      <input type="number" id="Maxheight" name="Maxheight" />
      <label for="Maxdpi">DPI:</label>
      <input type="number" id="Maxdpi" name="Maxdpi" />
      <br />
      <br />
      <label for="addExt">ไฟล์ที่จะคิดราคาเพิ่ม</label>
      <br />
      <input type="checkbox" id="่jpg" name="addExt" value=".JPG" /> .JPG
      <input type="checkbox" id="png" name="addExt" value=".PNG" /> .PNG
      <input type="checkbox" id="psd" name="addExt" value=".PSD" /> .PSD
      (Photoshop)
      <input type="checkbox" id="sai" name="addExt" value=".SAI" /> .SAI (SAI
      Paint tool)
      <input type="checkbox" id="clip" name="addExt" value=".CLIP" /> .CLIP
      (CLIP STUDIO)
      <br />
      <br />
      <label for="rush">การรับงานเร่ง</label>
      <input type="radio" id="accept" name="rush" value="รับงานเร่ง" />
      <label for="accept">รับงานเร่ง</label>
      <input
        type="radio"
        id="decline"
        name="rush"
        value="ไม่รับงานเร่งทุกกรณี"
      />
      <label for="decline">ไม่รับงานเร่ง</label>
      <br />
      <label for="rushDays">ระยะเวลาทำงานเร็วที่สุด สำหรับงานเร่ง</label>
      <input type="number" id="rushDays" name="rushDays" min="1" max="10" />
      <label>วัน</label>
      <br />
      <br />
      <label for="multipy">การคิดราคาเชิงพาณิชย์ เพิ่มอีก</label>
      <input type="number" id="multipy" name="multipy" min="10" max="100" />
      <label for="price">% ของ</label>
      <select id="price" name="price">
        <option value="ราคาเริ่มต้น">ราคาเริ่มต้น</option>
        <option value="ราคารวม">ราคารวม</option>
      </select>
      <br />
      <button>Generate</button>
      <p id="output"></p>
      <Box>
        <input
          type="text"
          id="clipboard-text"
          style={{ position: "absolute", top: "-9999px" }}
          readOnly
        />
        <button>Copy to Clipboard</button>
        <button>Copy Plain Text</button>
      </Box>
    </Box>
  );
};

export default index;

// const ListTemplate = ({

// }) => {
//   // controlled
//   // uncontrolled
//   return (

//   );
// };

// export default ListTemplate;

// const [rights, setRights] = useState([]);
// const [ext, setExt] = useState([]);
// const [addExt, setAddExt] = useState([]);
// const [rushChoice, setRushChoice] = useState("");

// const listTemplate = (
//   <ul>
//     <li>ลูกค้าจะต้องติดต่อจ้าง ผ่านช่องทางที่ระบุไว้เท่านั้น</li>
//     <li>
//       สามารถนำรูปไปใช้ {rightsList} แต่ต้องให้เครดิตหรือแสดงแหล่งที่มา
//       พร้อมลิงค์ช่องโซเซียลมิเดียที่ระบุไว้
//     </li>
//     <li>
//       รูปจะถูกนำไปใช้เป็นตัวอย่างงาน หากไม่ต้องการให้โพสต์เป็นตัวอย่างงาน
//       กรุณาแจ้งล่วงหน้า
//     </li>
//     <li>
//       หลังจากที่ยันยันแบบร่างเรียบร้อย ลูกค้าจะต้องชำระมัดจำ {payment}%
//       ของราคางาน และจะดำเนินงานต่อเมื่อชำระมัดจำเรียบร้อยแล้ว
//     </li>
//     <li>
//       ลูกค้าสามารถติดต่อสอบถามความคืบหน้าได้ ไม่เกิน {times} ครั้งต่อ {days}{" "}
//       โดยติดต่อผ่านช่องทางติดต่อที่ระบุไว้เท่านั้น
//     </li>
//     <li>
//       ไฟล์ที่ได้รับจะเป็นนามสกุล {ext} ขนาด {width} x {height} px {dpi} DPI
//       หากขนาดใหญ่กว่า {Maxwidth} x {Maxheight} px {Maxdpi} DPI หรือต้องการไฟล์{" "}
//       {addExt} จะมีการคิดเพิ่ม
//     </li>
//     <li>
//       {rush} ไม่ต่ำกว่า {rushDays} วันเท่านั้น
//     </li>
//     <li>
//       หากต้องการสิทธิ์เชิงพาณิชย์ โปรดแจ้งก่อนทุกครั้ง คิดเพิ่ม {multipy} %
//       ของ{price}
//     </li>
//   </ul>
// );

// const generateText = () => {
//   const payment = document.getElementById("payment").value;
//   const times = document.getElementById("times").value;
//   const days = document.getElementById("days").value;
//   const width = document.getElementById("width").value;
//   const height = document.getElementById("height").value;
//   const dpi = document.getElementById("dpi").value;
//   const Maxwidth = document.getElementById("Maxwidth").value;
//   const Maxheight = document.getElementById("Maxheight").value;
//   const Maxdpi = document.getElementById("Maxdpi").value;
//   const rushDays = document.getElementById("rushDays").value;
//   const multipy = document.getElementById("multipy").value;
//   const price = document.getElementById("price").value;

//   const rightsList = rights.join(", ");
//   const flieList = ext.join(", ");
//   const addList = addExt.join(", ");

//   const text = listTemplate
//     .replace("[rights]", rightsList)
//     .replace("[payment]", payment)
//     .replace("[times]", times)
//     .replace("[days]", days)
//     .replace("[ext]", flieList)
//     .replace("[width]", width)
//     .replace("[height]", height)
//     .replace("[dpi]", dpi)
//     .replace("[Maxwidth]", Maxwidth)
//     .replace("[Maxheight]", Maxheight)
//     .replace("[Maxdpi]", Maxdpi)
//     .replace("[addExt]", addList)
//     .replace("[rush]", rushChoice)
//     .replace("[rushDays]", rushDays)
//     .replace("[multipy]", multipy)
//     .replace("[price]", price);

//   setGeneratedText(text);
//   setClipboardText(text);
// };

// const copyToClipboard = () => {
//   const clipboardText = document.getElementById("clipboard-text").value;

//   // Check if the Clipboard API is available in the browser
//   if (navigator.clipboard) {
//     navigator.clipboard
//       .writeText(clipboardText)
//       .then(() => {
//         // Text successfully copied to clipboard
//         alert("Text copied to clipboard!");
//       })
//       .catch((err) => {
//         // Handle any errors
//         console.error("Error copying text to clipboard:", err);
//       });
//   } else {
//     // Clipboard API not available, provide a fallback or message
//     alert(
//       "Clipboard API is not supported in this browser. You can manually copy the text."
//     );
//   }
// };

// const copyNonHtmlText = () => {
//   const htmlList = document.getElementById("clipboard-text").value;

//   // Create a temporary element to hold the HTML list
//   const tempElement = document.createElement("div");
//   tempElement.innerHTML = htmlList;

//   // Find all list items within the HTML list
//   const listItems = tempElement.querySelectorAll("li");

//   // Create an array to store plain text items
//   const plainTextItems = [];

//   // Convert each list item to plain text and store in the array
//   listItems.forEach((item) => {
//     plainTextItems.push(item.textContent);
//   });

//   // Join the plain text items with line breaks to create plain text
//   const plainText = plainTextItems.join("\n");

//   // Use the Clipboard API to copy the plain text with line breaks
//   if (navigator.clipboard) {
//     navigator.clipboard
//       .writeText(plainText)
//       .then(() => {
//         // Text successfully copied to clipboard
//         alert("Plain text with line breaks copied to clipboard!");
//       })
//       .catch((err) => {
//         // Handle any errors
//         console.error("Error copying plain text to clipboard:", err);
//       });
//   } else {
//     // Clipboard API not available, provide a fallback or message
//     alert(
//       "Clipboard API is not supported in this browser. You can manually copy the text."
//     );
//   }
// };
