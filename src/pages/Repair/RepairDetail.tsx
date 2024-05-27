import { CardRow } from "@/components/Card";
import Content from "@/core/layouts/Content.tsx";
import { useRepair } from "@/services/Repair";
import { Card } from "antd";
import { useParams } from "react-router-dom";
import UpdateRepairStatusModal from "@/pages/Repair/components/UpdateRepairStatusModal.tsx";
import { useLoading, useModal } from "@/hooks";

const RepairDetail = () => {
  const { uuid } = useParams();
  const { closeModal, isOpen, openModal } = useModal();
  const { toggleLoading, isLoading } = useLoading();
  const { data: repair } = useRepair({ uuid });
  if (repair?.status === "REPAIRED") {
    return (
      <Content
        title={`Repair Detail / ${repair?.code}`}
        backButtonUrl="/repairs"
      >
        <div className="flex gap-5">
          <Card className="w-1/3" title="Customer">
            <CardRow label="Full Name" value={repair?.customer.fullName} />
            <CardRow
              label="Identity Number"
              value={repair?.customer.identityNumber}
            />
            <CardRow
              label="Phone Number"
              value={repair?.customer.phoneNumber}
            />
          </Card>
          <Card className="w-1/3" title="Spare Part">
            <CardRow label="Name" value={repair?.sparePart.name} />
            <CardRow
              label="Price"
              value={repair?.sparePart.priceWithCurrency}
            />
          </Card>
        </div>
        <UpdateRepairStatusModal
          toggleLoading={toggleLoading}
          isLoading={isLoading}
          open={isOpen}
          onCancel={closeModal}
          title="Update Repair Status"
        />
      </Content>
    );
  } else {
    return (
      <Content
        title={`Repair Detail / ${repair?.code}`}
        backButtonUrl="/repairs"
        editAction={{ title: "Edit Repair", onClick: openModal }}
      >
        <div className="flex gap-5">
          <Card className="w-1/3" title="Customer">
            <CardRow label="Full Name" value={repair?.customer.fullName} />
            <CardRow
              label="Identity Number"
              value={repair?.customer.identityNumber}
            />
            <CardRow
              label="Phone Number"
              value={repair?.customer.phoneNumber}
            />
          </Card>
          <Card className="w-1/3" title="Spare Part">
            <CardRow label="Name" value={repair?.sparePart.name} />
            <CardRow
              label="Price"
              value={repair?.sparePart.priceWithCurrency}
            />
          </Card>
        </div>
        {repair?.status}
        {repair?.status !== "REPAIRED" && (
          <UpdateRepairStatusModal
            toggleLoading={toggleLoading}
            isLoading={isLoading}
            open={isOpen}
            onCancel={closeModal}
            title="Update Repair Status"
          />
        )}
      </Content>
    );
  }
};

export default RepairDetail;
