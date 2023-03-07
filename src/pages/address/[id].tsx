// @ts-nocheck
import React from "react";
import { useRouter } from "next/router";
import Layout from "@/layouts/Main";
import { web3, web3ws } from "@/web3utils";
import erc20 from '@/abi/erc20.json'
import { EventData } from "web3-eth-contract";
const supplychain = require('@/abi/supplychain.json')



const AddressDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const address = String(id).toLowerCase()

  const contract = new web3.eth.Contract(supplychain, "0x38fe3392860424DBC2c9395279E09D6750645F08");
  const getEvents = async () => {

    const blockHeight = await web3.eth.getBlockNumber();
    console.log(blockHeight);
    const limit = 900;

    const chunks = [];
    const count = Math.ceil(blockHeight / limit)
    let fromBlock = -900;
    let toBlock = 0;

    for (let i = 0; i < count; i++) {
      fromBlock += 900
      toBlock += 900
      chunks.push({ fromBlock, toBlock })
    }

      await contract.getPastEvents(
        'AllEvents',
        {
          fromBlock: 32803300,
          toBlock: 32804300
        },
        async function (error, chunkEvents) {
          console.log(chunkEvents)
        }
      )

    // const events: EventData[] = []
    // const errors = []
    // for (const chunk of chunks) {
    //   await contract.getPastEvents(
    //     'AllEvents',
    //     {
    //       fromBlock: chunk.fromBlock,
    //       toBlock: chunk.toBlock
    //     },
    //     async function (error, chunkEvents) {
    //       if (chunkEvents?.length > 0) {
    //         events.push(...chunkEvents)
    //       }

    //       if (error) errors.push(error)
    //     }
    //   )
    // }

    // console.log(events)

    // chunks.map(async (chunk) => {
    //   await contract.getPastEvents('AllEvents', chunk, (error, events) => {
    //     console.log(events)
    //   });
    // })
  };

  React.useEffect(() => {
    getEvents();
  }, [id]);

  return (
    <Layout>
      <h1>Transaction Detail</h1>
    </Layout>
  );
};

export default AddressDetail;
