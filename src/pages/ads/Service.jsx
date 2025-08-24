// add the publisher Full info as an external component ...

import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useGet } from "../../hooks/useApi";
import { useTab } from "../../hooks/useTab";
import { useModal } from "../../hooks/useModal";
import { modalActions } from "../../constants/general";
import Container from "../../components/layout/Container";
import Button from "../../components/layout/Button";
import Tabs from "../../components/navigation/Tabs";
import Delete from "../../components/feedback/Delete";
import { DetailItem } from "../../components/addetails/Details";
import { useTranslation } from "react-i18next";
import { ImageGallery } from "../../components/addetails/Imagegallery";

function Serivce() {
  const { id } = useParams();
  const { t } = useTranslation();
  const url = `services`;

  const { data : service , isFetched } = useGet(["services", id], url, {
    staleTime: Infinity,
    select: (data) => data?.find((e) => e.id === parseInt(id)),
  });



  const normalized = useMemo(() => {
    if (!service) return null;

    return isFetched
      ? {
          title: service?.title,
          description: service?.description,
          price: service?.price,
          governorate: service?.governorate,
          location: service?.location,
          days_hours: service?.days_hours,
          phone_number: service?.phone_number,
          email: service?.email,
          images: [
            "https://images.unsplash.com/photo-1527838832700-5059252407fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1492571350019-22de08371fd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          ],
        }
      : {};
  }, [service]);

  // console.log();

  const renderDetailsTab = () => {
    if (!normalized) {
      return <div className="p-4 text-gray-500">No details available</div>;
    }

    const excludedKeys = ["created_at", "updated_at" , "id", "images"];
    const filteredDetails = Object.entries(normalized).filter(
      ([key]) => !excludedKeys.includes(key)
    );

    if (filteredDetails.length === 0) {
      return (
        <div className="p-4 text-gray-500">No relevant details available</div>
      );
    }

    return (
      <div className="grid grid-cols-2 gap-4 p-4">
        {filteredDetails.map(([key, value]) => (
          <DetailItem
            key={key}
            label={key}
            value={value}
            className="border-b pb-2"
          />
        ))}
      </div>
    );
  };

  const renderImagesTab = () => {
    return <ImageGallery images={normalized?.images} jobId={id} />;
  };

  const tabs = [
    {
      label: t("details"),
      content: renderDetailsTab(),
    },
    {
      label: t("images"),
      content: renderImagesTab(),
    },
  ];

  const { activeTab, handleTabChange } = useTab(tabs, `/services-ads/${id}`);

  const {
    modalState: userState,
    dispatch: userDispatch,
    openFreezeModal,
    openDeleteModal: userDel,
    closeAllModals: closeUserModals,
  } = useModal();

  const handleFreeze = () => {
    console.log("freezed", service?.id);
    userDispatch({ type: modalActions.CLOSE_ALL });
  };

  const handleDelete = () => {
    console.log("deleted", service?.id);
    userDispatch({ type: modalActions.CLOSE_ALL });
  };

  if (!isFetched) return null;

  return (
    <>
      <Container
        additionalHeaderContent={
          <>
            <Button
              className="w-[125px]"
              onClick={() => openFreezeModal(normalized)}
            >
              Freeze
            </Button>
            <Button
              className="w-[125px]"
              onClick={() => userDel(normalized)}
            >
              Delete
            </Button>
          </>
        }
      >
        <Tabs
          tabs={tabs}
          tabListClassName="w-[15%] -mt-3"
          tabListWidth="1000px"
          tabPanelWidth="calc(100% - 200px)"
          activeTab={activeTab}
          onChange={handleTabChange}
        />
      </Container>

      <Delete
        isOpen={userState.isModalOpen && userState.mode === "freeze"}
        onClose={closeUserModals}
        onConfirm={() => handleFreeze(normalized)}
        action="Freeze"
        itemName={`freeze the service: "${normalized?.title}"`}
      />

      <Delete
        isOpen={userState.isDeleteOpen}
        onClose={closeUserModals}
        onConfirm={() => handleDelete(normalized)}
        action="Delete"
        itemName={`delete the service: "${normalized?.title}"`}
      />
    </>
  );
}

export default Serivce;
