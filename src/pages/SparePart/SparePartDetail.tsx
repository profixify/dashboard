import { CardRow } from "@/components/Card";
import Content from "@/core/layouts/Content.tsx";
import { useSparePart } from "@/services/SparePart";
import { Card, Spin } from "antd";
import { useParams } from "react-router-dom";
import EditSparePartModal from "@/pages/SparePart/components/EditSparePartModal.tsx";
import { useLoading, useModal } from "@/hooks";

const SparePartDetail = () => {
  const { uuid } = useParams();
  const { data: sparePart, refetch: refetchSparePart } = useSparePart({ uuid });
  const { isLoading, toggleLoading } = useLoading();
  const { closeModal, openModal, isOpen } = useModal();
  return (
    <Content
      title="Spare Part"
      backButtonUrl="/spare-parts"
      editAction={{ title: "Edit Spare Part", onClick: openModal }}
    >
      <Spin spinning={!sparePart}>
        <Card className="w-1/4">
          <CardRow label="Category" value="Apple / iPhone 6" />
          <CardRow label="Name" value={sparePart?.name} />
          <CardRow label="Price" value={sparePart?.priceWithCurrency} />
          <CardRow label="Amount" value={sparePart?.amount} />
          <CardRow label="Left Amount" value={sparePart?.leftAmount} />
        </Card>
      </Spin>
      {sparePart && uuid && (
        <EditSparePartModal
          toggleLoading={toggleLoading}
          uuid={uuid}
          data={sparePart}
          isLoading={isLoading}
          open={isOpen}
          onCancel={async () => {
            closeModal();
            await refetchSparePart();
          }}
          title="Edit Spare Part"
        />
      )}
    </Content>
  );
};

export default SparePartDetail;
