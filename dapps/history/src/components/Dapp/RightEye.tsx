import { useCallback } from "preact/hooks";
import { FilterStatus } from "@dwidget/shared/proto/history";
import { Icon } from "@dwidget/shared/components";
import { useLocation } from "@dwidget/shared-dapp/hooks";

import { useStateMachineRef, useStateMachineSelector } from "@/providers";

export const RightEye = () => {
  const { send } = useStateMachineRef();
  const status = useStateMachineSelector(
    (state) => state.context.history.filter?.status
  );

  const handleFilterChangeClick = useCallback(() => {
    const nextStatus =
      status === FilterStatus.PENDING
        ? FilterStatus.UNSPECIFIED
        : FilterStatus.PENDING;

    send({
      type: "SET_FILTER",
      filter: {
        status: nextStatus,
      },
    });
  }, [status]);

  const iconName =
    status === FilterStatus.PENDING ? "visibility" : "visibility_off";

  return (
    <div onClick={handleFilterChangeClick}>
      <Icon name={iconName} className="w-6 h-6 cursor-pointer" />
    </div>
  );
};
