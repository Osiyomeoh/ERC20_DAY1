import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";


const MyERC20Module = buildModule("MyERC20Module", (m) => {


  const myERC20 = m.contract("MyERC20", [], {
   
  });

  return { myERC20 };
});

export default MyERC20Module;
//MyERC20Module#MyERC20 - 0x8F21657a7eA75383bD5723b10747DCFA05e6268A