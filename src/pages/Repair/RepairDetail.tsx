import { CardRow } from "@/components/Card";
import Content from "@/core/layouts/Content.tsx";
import { useLoading, useModal } from "@/hooks";
import UpdateRepairStatusModal from "@/pages/Repair/components/UpdateRepairStatusModal.tsx";
import { useRepair } from "@/services/Repair";
import { Card } from "antd";
import { useParams } from "react-router-dom";

const RepairDetail = () => {
  const { uuid } = useParams();
  const { closeModal, isOpen, openModal } = useModal();
  const { toggleLoading, isLoading } = useLoading();
  const { data: repair, refetch: refetchRepairDetail } = useRepair({ uuid });
  return (
    <Content
      title={`Repair Detail / ${repair?.code}`}
      backButtonUrl="/repairs"
      editAction={
        repair?.status !== "REPAIRED"
          ? { title: "Edit Repair", onClick: openModal }
          : undefined
      }
    >
      <div className="flex gap-5">
        <Card
          className="w-1/3"
          title="Customer"
          styles={{
            header: {
              minHeight: "40px",
            },
            body: {
              padding: "1rem 1.5rem",
            },
          }}
        >
          <CardRow label="Full Name" value={repair?.customer.fullName} />
          <CardRow
            label="Identity Number"
            value={repair?.customer.identityNumber}
          />
          <CardRow label="Phone Number" value={repair?.customer.phoneNumber} />
        </Card>
        <Card className="w-1/3" title="Spare Part">
          <CardRow label="Name" value={repair?.sparePart.name} />
          <CardRow label="Price" value={repair?.sparePart.priceWithCurrency} />
        </Card>
      </div>
      {repair?.status !== "REPAIRED" && (
        <UpdateRepairStatusModal
          toggleLoading={toggleLoading}
          isLoading={isLoading}
          open={isOpen}
          onCancel={() => {
            closeModal();
            refetchRepairDetail();
          }}
          title="Update Repair Status"
        />
      )}
    </Content>
  );
};

export default RepairDetail;
