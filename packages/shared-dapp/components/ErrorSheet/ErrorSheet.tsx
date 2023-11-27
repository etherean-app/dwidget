import { FunctionalComponent } from "preact";

import { Button, Sheet } from "..";
import { ErrorMessage } from "./ErrorMessage";

interface Props {
  open: boolean;
  error: string | null | undefined;
  onClose: () => void;
  onTryAgain: () => void;
}

const ErrorSheetOriginal: FunctionalComponent<Props> = ({
  open,
  error,
  onClose,
  onTryAgain,
}) => {
  return (
    <Sheet
      open={open}
      onClose={() => open && onClose()}
      icon="cancel"
      iconClass="text-error"
      title="Something went wrong"
    >
      <ErrorMessage error={error} />
      <div className="grid gap-4 mt-10">
        <Button onClick={onTryAgain}>Try again</Button>
      </div>
    </Sheet>
  );
};

export const ErrorSheet = ErrorSheetOriginal;
