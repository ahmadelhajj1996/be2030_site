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

function Seeking() {
  const { id } = useParams();
  const { t } = useTranslation();
  const url = `jobs?id=${id}`;

  const { data: job, isFetched } = useGet(["jobs", id], url, {
    staleTime: Infinity,
    select: (data) => data?.find((e) => e.id === parseInt(id)),
  });

  const normalizedJob = useMemo(() => {
    if (!job) return null;

    return isFetched
      ? {
          title: job.title,
          job_title: job.job_title,
          description: job.description,
          job_type: job.job_type,
          governorate: job.governorate,
          location: job.location,
          work_hours: job.work_hours,
          start_date: job.start_date,
          salary: job.salary,
          education: job.education,
          experience: job.experience,
          skills: job.skills,
          images: [
            "https://images.unsplash.com/photo-1527838832700-5059252407fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1492571350019-22de08371fd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          ],
        }
      : {};
  }, [job]);

  // console.log();

  const renderDetailsTab = () => {
    if (!normalizedJob) {
      return <div className="p-4 text-gray-500">No details available</div>;
    }

    const excludedKeys = ["created_at", "updated_at", "job_id", "id", "images"];
    const filteredDetails = Object.entries(normalizedJob).filter(
      ([key]) => !excludedKeys.includes(key)
    );

    if (filteredDetails.length === 0) {
      return (
        <div className="p-4 text-gray-500">No relevant details available</div>
      );
    }

    return (
      <div className="grid grid-cols-1 gap-4 p-4">
        {filteredDetails.map(([key, value]) => (
          <DetailItem
            key={key}
            label={t(`jobs.details.${key}`) || key}
            value={value}
            className="border-b pb-2"
          />
        ))}
      </div>
    );
  };

  const renderImagesTab = () => {
    return <ImageGallery images={normalizedJob?.images} jobId={id} />;
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

  const { activeTab, handleTabChange } = useTab(tabs, `/job-seeking/${id}`);

  const {
    modalState: userState,
    dispatch: userDispatch,
    openFreezeModal,
    openDeleteModal: userDel,
    closeAllModals: closeUserModals,
  } = useModal();

  const handleFreeze = () => {
    console.log("freezed", job?.id);
    userDispatch({ type: modalActions.CLOSE_ALL });
  };

  const handleDelete = () => {
    console.log("deleted", job?.id);
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
              onClick={() => openFreezeModal(normalizedJob)}
            >
              Freeze
            </Button>
            <Button
              className="w-[125px]"
              onClick={() => userDel(normalizedJob)}
            >
              Delete
            </Button>
          </>
        }
      >
        <Tabs
          tabs={tabs}
          tabListClassName="w-[60%] -mt-3"
          tabListWidth="1000px"
          tabPanelWidth="calc(100% - 200px)"
          activeTab={activeTab}
          onChange={handleTabChange}
        />
      </Container>

      <Delete
        isOpen={userState.isModalOpen && userState.mode === "freeze"}
        onClose={closeUserModals}
        onConfirm={() => handleFreeze(normalizedJob)}
        action="Freeze"
        itemName={`freeze the job: "${normalizedJob?.job_title}"`}
      />

      <Delete
        isOpen={userState.isDeleteOpen}
        onClose={closeUserModals}
        onConfirm={() => handleDelete(normalizedJob)}
        action="Delete"
        itemName={`delete the job: "${normalizedJob?.job_title}"`}
      />
    </>
  );
}

export default Seeking;
