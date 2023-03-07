//@ts-nocheck
import React, { useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/layouts/Main";
import { web3 } from "@/web3utils";
import supplychain from '@/abi/supplychain.json';
import { createColumnHelper } from "@tanstack/react-table";
import { Table } from "@/components/shared/table";
const columnHelper = createColumnHelper<any>();


const TxDetail = () => {
  const [dataDecoded, setDataDecoded] = React.useState<{ [key: string]: any }>([]);
  const [txData, setTxData] = useState<any[] | undefined>();
  const [date, setDate] = useState()

  const router = useRouter();
  const { id } = router.query;


  const getTx = async () => {
    try {
      const data: any = await web3.eth.getTransaction(String(id));
      console.log(data);
      let timestamp: any = (await web3.eth.getBlock(Number(data?.blockNumber))).timestamp;
      // timestamp = new Date(timestamp*1000);
      console.log(timestamp)
      setDate(timestamp)

      setTxData(data)

      

      const dataInput = data?.input.slice(10);
      const selector = data.input.slice(0, 10);
      console.log(selector);
      fetch(
        `https://www.4byte.directory/api/v1/signatures/?hex_signature=${selector}`
      )
        .then((res) => res.json())
        .then((data) => {
          const param = data.results[0].text_signature;
          const cleanSignature = param.replace("(", ",").replace(")", "");
          let params = cleanSignature.split(',');
          console.log(params[0]);

          const abiTest = supplychain.filter((item: any) => item.name == params[0])
          console.log(abiTest.length)
          params = params.slice(1)

          if (abiTest.length > 0) {
            const decode = web3.eth.abi.decodeParameters(abiTest[0]?.inputs, dataInput);
            console.log(decode);
            setDataDecoded(decode)
          } else {
            const decode2 = web3.eth.abi.decodeParameters(params, dataInput);
            console.log(decode2);
            setDataDecoded(decode2)
          }          
        }).catch(err => {
          console.log(err)
        }) 
    } catch (err) {
      console.log(err)
    }
  };

  const dataCol =  [
    {
      key: "blockHash",
      value: txData?.blockHash,
    },
    {
      key: "blockNumber",
      value: txData?.blockNumber
    },
    {
      key: "from",
      value: txData?.from
    },
    {
      key: "to",
      value: txData?.to
    },
    {
      key: "Timestamp",
      value: new Date(date*1000).toLocaleString()
    },
    {
      key: "input",
      value: txData?.input
    },
    {
      key: "decodedInput",
      value: JSON.stringify(dataDecoded)
    },
  ];

  const columns = [
    columnHelper.accessor("key", {
      header: () => <p>Summary</p>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("value", {
      header: () => <p></p>,
      cell: (info) => {
        if (info.row.original.key == "input") {
          return (
            <textarea
            className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm placeholder:text-gray-800 resize-none scrollbar-hide"
            disabled
            rows={10}
            placeholder={info.getValue()}
          />
          )
        } else {
          return info.getValue()
        }
      }
    }),
  ];
  React.useEffect(() => {
    if(router.isReady){
      getTx()
    }
  }, [router.isReady]);

  return (
    <Layout>
      {/* Main Content */}
      <p className="text-2xl font-bold my-2">Transaction Info</p>
      <div className="bg-white">
        {txData && <Table data={dataCol} columns={columns} />}
      </div>
    </Layout>
  );
};

export default TxDetail;
