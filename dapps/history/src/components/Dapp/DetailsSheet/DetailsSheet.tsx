import { Skeleton } from "@dwidget/shared/components";
import { Sheet, Button } from "@dwidget/shared-dapp/components";
import { EntryStatus } from "@dwidget/shared/proto/history";

import { useStateMachine } from "@/providers";
import { Details } from "./Details";
import { nameMap } from "@/utils";

const statusMap: { [status in EntryStatus]: string } = {
  [EntryStatus.UNSPECIFIED]: "",
  [EntryStatus.CONFIRMED]: "",
  [EntryStatus.PENDING]: "◦ Pending",
  [EntryStatus.FAILED]: "◦ Failed",
};

export const DetailsSheet = () => {
  const [state, send] = useStateMachine();

  const open =
    state.matches("DETAILS.loading") || state.matches("DETAILS.success");
  const isLoading = state.matches("DETAILS.loading");

  const entry = state.context.historyEntry?.entry;
  const title = entry
    ? `${nameMap[entry.category]}${statusMap[entry.status]}`
    : "";

  return (
    <Sheet
      open={open}
      onClose={() => open && send({ type: "closeHistoryEntry" })}
      title={isLoading ? <Skeleton className="h-[28px] w-40" /> : title}
    >
      <div className="grid gap-1">
        {isLoading ? (
          <Skeleton className="h-[72px] w-full" />
        ) : (
          <Details entry={entry} />
        )}
      </div>
      <div className="grid gap-4 mt-10">
        <Button onClick={() => send({ type: "closeHistoryEntry" })}>
          Close
        </Button>
      </div>
    </Sheet>
  );
};
