import { EntryCategory } from "./../../proto/history";

export const nameMap: { [key in EntryCategory]: string } = {
  [EntryCategory.APPROVED]: "Approved",
  [EntryCategory.BORROWED]: "Borrowed",
  [EntryCategory.BURNED]: "Burned",
  [EntryCategory.CANCELLED]: "Cancelled",
  [EntryCategory.CLAIMED]: "Claimed",
  [EntryCategory.DEPLOYED]: "Deployed",
  [EntryCategory.DEPOSITED]: "Deposited",
  [EntryCategory.EXECUTED]: "Executed",
  [EntryCategory.MINTED]: "Minted",
  [EntryCategory.RECEIVED]: "Received",
  [EntryCategory.REPAID]: "Repaid",
  [EntryCategory.SENT]: "Sent",
  [EntryCategory.STAKED]: "Staked",
  [EntryCategory.SWAPPED]: "Swapped",
  [EntryCategory.UNSTAKED]: "Unstaked",
  [EntryCategory.WITHDRAWN]: "Withdrawn",
  [EntryCategory.UNSPECIFIED]: "Unspecified",
};
