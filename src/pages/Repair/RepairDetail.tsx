import { CardRow } from "@/components/Card";
import Content from "@/core/layouts/Content.tsx";
import { useLoading, useModal } from "@/hooks";
import UpdateRepairStatusModal from "@/pages/Repair/components/UpdateRepairStatusModal.tsx";
import { useRepair } from "@/services/Repair";
import { useParams } from "react-router-dom";
import { RepairStatusTableType } from "@/pages/Repair/types.ts";
import Table from "@/components/Table";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { DetailCard } from "@/components/Card/DetailCard.tsx";
import { useRepairStatus } from "@/services/RepairStatus.ts";

dayjs.extend(relativeTime);
const RepairDetail = () => {
  const { uuid } = useParams();
  const { closeModal, isOpen, openModal } = useModal();
  const { toggleLoading, isLoading } = useLoading();
  const { data: repair, refetch: refetchRepairDetail } = useRepair({ uuid });
  const { data: repairStatuses, refetch: refetchRepairStatuses } =
    useRepairStatus({ uuid });
  const repairStatusColumns: RepairStatusTableType = [
    { key: "title", dataIndex: "title", title: "Title" },
    { key: "note", dataIndex: "note", title: "Note" },
    { key: "status", dataIndex: "status", title: "Status" },
    {
      key: "createdAt",
      dataIndex: "createdAt",
      title: "Created Datetime",
      render: (value: string) => <span>{dayjs(value).fromNow()}</span>,
    },
  ];
  return (
    <Content
      title={`Repair Detail / ${repair?.code}`}
      backButtonUrl="/repairs"
      editAction={
        repair?.latestStatus !== "REPAIRED"
          ? { title: "Edit Repair", onClick: openModal }
          : undefined
      }
    >
      <div className="flex flex-col gap-3">
        <div className="flex gap-5">
          <DetailCard className="w-1/3" title="Customer">
            <CardRow label="Full Name" value={repair?.customer.fullName} />
            <CardRow
              label="Phone Number"
              value={repair?.customer.phoneNumber}
            />
          </DetailCard>
          <DetailCard className="w-1/3" title="Spare Part">
            <CardRow label="Name" value={repair?.sparePart.name} />
            <CardRow
              label="Price"
              value={repair?.sparePart.priceWithCurrency}
            />
          </DetailCard>
        </div>
        <Table
          columns={repairStatusColumns}
          dataSource={repairStatuses}
          rowKey="uuid"
          bordered
        />
      </div>

      {repair?.latestStatus !== "REPAIRED" && (
        <UpdateRepairStatusModal
          toggleLoading={toggleLoading}
          isLoading={isLoading}
          open={isOpen}
          onCancel={async () => {
            closeModal();
            await refetchRepairDetail();
            await refetchRepairStatuses();
          }}
          title="Update Repair Status"
        />
      )}
    </Content>
  );
};

export default RepairDetail;
