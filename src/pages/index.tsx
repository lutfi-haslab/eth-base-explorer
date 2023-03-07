// @ts-nocheck
import { web3 } from "@/web3utils";
import Link from "next/link";
import { useMemo, useState } from "react";
import Layout from "@/layouts/Main";
import { HiOutlineChevronRight } from "react-icons/hi";
import { Table, indexColPage } from "@/components/shared/table";
import { blockInfoStore } from "@/context";

const Home = () => {
  const { id, setBlockId } = blockInfoStore();
  let MAX_BLOCK = 30;

  const [blocks, setBlocks] = useState<any[]>([]);

  const getBlockInfo = async () => {
    const blockNumber = await web3.eth.getBlockNumber();
    MAX_BLOCK > blockNumber ? (MAX_BLOCK = blockNumber) : MAX_BLOCK;
    const tempBlock: any[] = [];
    // Get Latest Block
    for (let i = 0; i < MAX_BLOCK; i++) {
      tempBlock.push(await web3.eth.getBlock(blockNumber - i));
    }
    setBlocks(tempBlock);
  };

  const blockData = blocks.filter((item) => item !== null);
  useMemo(() => {
    getBlockInfo();
    blocks && console.log(blocks);
  }, [blocks]);

  return (
    <Layout>
      <div className="h-screen">
        {/* Breadcrumb */}
        <div className="pb-5">
          <ol
            className="flex items-center whitespace-nowrap min-w-0"
            aria-label="Breadcrumb"
          >
            <li className="text-sm text-gray-500 hover:text-blue-600 flex items-center">
              Home
              <HiOutlineChevronRight />
            </li>
          </ol>
        </div>
        {/* Main Content */}
        <div className="bg-white">
          {blocks && <Table data={blockData} columns={indexColPage} />}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
