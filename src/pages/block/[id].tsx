import { Table } from "@/components/shared/table";
import { blockInfoStore } from "@/context";
import Layout from "@/layouts/Main";
import { web3 } from "@/web3utils";
import { createColumnHelper } from "@tanstack/react-table";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { HiOutlineChevronRight } from "react-icons/hi";
import Link from "next/link";

const columnHelper = createColumnHelper<any>();

const BlockDetail = () => {
  const [idnew, setIdNew] = useState()
  const [testData, setTestData] = useState<any[]>([]);
  const [transaction, setTransaction] = useState<any[]>([]);
  const router = useRouter();
  const { id } = router.query;

  const getBlock = async () => {
    
    const block: any = await web3.eth.getBlock(Number(id));
    console.log(block);
    setTransaction(block.transactions);
    console.log(transaction);
    setTestData([
      {
        key: "Hash",
        value: block.hash,
      },
      {
        key: "Number",
        value: block.number,
      },
      {
        key: "Timestamp",
        value: block.timestamp,
      },
      {
        key: "Difficulty",
        value: block.difficulty,
      },
      {
        key: "Nonce",
        value: block.nonce,
      },
      {
        key: "Size",
        value: block.size,
      },
      {
        key: "Miner",
        value: block.miner,
      },
      {
        key: "Gas Limit",
        value: block.gasLimit,
      },
      {
        key: "Gas Used",
        value: block.gasUsed,
      },
      {
        key: "Tx",
        value: block.transactions,
      },
    ]);
  };

  const columns = [
    columnHelper.accessor("key", {
      header: () => <p>Summary</p>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("value", {
      header: () => <p></p>,
      cell: (info) => {
        if (info.row.original.key == "Tx") {
          return info
            .getValue()
            .map((item: any, i: any) => (
              <Link key={i} href={`/transaction/${item}`}>
                <p className="underline cursor-pointer my-1 text-blue-700">{item}</p>
              </Link>
            ));
        } else {
          return info.getValue();
        }
      },
    }),
  ];

useEffect(() => {
  if(router.isReady){
    getBlock()
  }
}, [router.isReady])

  return (
    <Layout>
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
          <li className="text-sm text-gray-500 hover:text-blue-600 flex items-center">
            Detail
            <HiOutlineChevronRight />
          </li>
        </ol>
      </div>
      {/* Main Content */}
      <p className="text-2xl font-bold my-2">Block Info</p>
      <div className="bg-white">
        {id && <Table data={testData} columns={columns} />}
      </div>
    </Layout>
  );
};

export default BlockDetail;
