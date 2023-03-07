import { createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
const columnHelper = createColumnHelper<any>();

export const indexColPage = [
  columnHelper.accessor("number", {
    header: () => <p>Number</p>,
    cell: (info) => (
      <Link href={`/block/${info.getValue()}`}>
        <button
          type="button"
          className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-indigo-500 text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
        >
          {info.getValue()}
        </button>
      </Link>
    ),
  }),
  columnHelper.accessor("difficulty", {
    header: () => <p>Difficulty</p>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("size", {
    header: () => <p>Size</p>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("transactions", {
    header: () => <p>Transaction #</p>,
    cell: (info) => info.getValue().length,
  }),
  columnHelper.accessor("timestamp", {
    header: () => <p>Timestamp</p>,
    cell: (info) => new Date(info.getValue() * 1000).toLocaleString(),
  }),
];

export const blockColDetail = [
  columnHelper.accessor("hash", {
    header: () => <p>Hash</p>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("number", {
    header: () => <p>Number</p>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("difficulty", {
    header: () => <p>Difficulty</p>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("size", {
    header: () => <p>Size</p>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("nonce", {
    header: () => <p>Nonce</p>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("miner", {
    header: () => <p>Miner</p>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("gasLimit", {
    header: () => <p>Gas Limit</p>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("gasUsed", {
    header: () => <p>Gas Used</p>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("timestamp", {
    header: () => <p>Timestamp</p>,
    cell: (info) => new Date(info.getValue() * 1000).toLocaleString(),
  }),
];

export const transactionColinBlock = [
  columnHelper.accessor("hash", {
    header: () => <p>Hash</p>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("from", {
    header: () => <p>From</p>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("to", {
    header: () => <p>To</p>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("gas", {
    header: () => <p>Gas Price</p>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("input", {
    size: 150,
    header: () => <p>Gas Price</p>,
    cell: (info) => <div className="break-words">{info.getValue()}</div>,
  }),
];
