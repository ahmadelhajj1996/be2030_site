import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

function Offer() {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate =     useNavigate()
  const url = `offers`;

  const { data, isFetched } = useGet(["offers", id], url, {
    staleTime: Infinity,
    select: (data) => data?.offers?.find((e) => e.id === parseInt(id)),
  });

  const normalized = useMemo(() => {
    if (!data) return null;
    return isFetched ? data : {};
  }, [data, isFetched]);

  console.log(normalized);

 const renderDetailsTab = () => {
   if (!normalized) {
     return <div className="p-4 text-gray-500">{t("noDetailsAvailable")}</div>;
   }

   // Define excluded keys for both top level and nested data
   const excludedKeys = ["created_at", "updated_at", "id" , "on"];
   const includedOnDataKeys = ["title"];

   // Process the offer object
   const offerDetails = Object.entries(normalized).filter(
     ([key]) => !excludedKeys.includes(key)
   );

   const productDetails = normalized.on?.data
     ? Object.entries(normalized.on.data).filter(
         ([key]) => includedOnDataKeys.includes(key)
       )
     : [];

   if (offerDetails.length === 0 && productDetails.length === 0) {
     return (
       <div className="p-4 text-gray-500">
         {t("noRelevantDetailsAvailable")}
       </div>
     );
   }

   // Helper function to render values properly
   const renderValue = (value) => {
     if (value === null || value === undefined) {
       return "-";
     }
     if (typeof value === "object") {
       // Handle specific object cases
       if (value.type && value.data) {
         return JSON.stringify(value); // or handle this specific case differently
       }
       return JSON.stringify(value);
     }
     return value;
   };

   return (
     <div className="space-y-6 p-4">
       {/* Offer Details Section */}
       {offerDetails.length > 0 && (
         <div className="space-y-4">
           <div className="grid grid-cols-1    gap-4">
             {offerDetails.length > 0 && (
               <div className="space-y-4">
                 <div className="grid grid-cols-1 gap-4">
                   {offerDetails.map(([key, value]) => {
                     const displayKey =
                       key.toString() == "title" ? "Product" : key;
                     return (
                       <DetailItem
                         key={`offer-${key}`}
                         label={t(displayKey)}
                         value={renderValue(value)}
                         className="border-b pb-2"
                       />
                     );
                   })}
                 </div>
               </div>
             )}
           </div>
         </div>
       )}

       {/* Product Details Section */}
       {productDetails.length > 0 && (
         <div className="space-y-4 -mt-2">
           <div className="grid grid-cols-1 gap-4">
             {productDetails.map(([key, value]) => {
               const displayKey = key.toString() == "title" ? "Product" : key;

               return (
                 <DetailItem
                   key={`offer-${key}`}
                   label={t(displayKey)}
                   value={renderValue(value)}
                   {...(key.toString() === "title" && {
                     onClick: () => navigate(`/product-details/${normalized?.on?.data?.id}`), // Your click handler function
                     className: "text-blue-500 underline underline-offset-8 cursor-pointer", // Additional className for title
                   })}
                 />
               );
             })}
           </div>
         </div>
       )}
     </div>
   );
 };

  const tabs = [
    {
      label: t("details"),
      content: renderDetailsTab(),
    },
  ];

  const { activeTab, handleTabChange } = useTab(tabs, `/offers/${id}`);

  const {
    modalState: userState,
    dispatch: userDispatch,
    openFreezeModal,
    openDeleteModal: userDel,
    closeAllModals: closeUserModals,
  } = useModal();

  const handleFreeze = () => {
    console.log("freezed", normalized?.id);
    userDispatch({ type: modalActions.CLOSE_ALL });
  };

  const handleDelete = () => {
    console.log("deleted", normalized?.id);
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
              {t("freeze")}
            </Button>
            <Button className="w-[125px]" onClick={() => userDel(normalized)}>
              {t("delete")}
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
        action={t("freeze")}
        itemName={`${t("freezeTheOffer")}: "${
          normalized?.on?.data?.title || t("untitled")
        }"`}
      />

      <Delete
        isOpen={userState.isDeleteOpen}
        onClose={closeUserModals}
        onConfirm={() => handleDelete(normalized)}
        action={t("delete")}
        itemName={`${t("deleteTheOffer")}: "${
          normalized?.on?.data?.title || t("untitled")
        }"`}
      />
    </>
  );
}

export default Offer;
