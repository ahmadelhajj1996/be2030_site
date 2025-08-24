import { useMemo, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGet, usePost, useDelete } from "../../hooks/useApi";
import { useTab } from "../../hooks/useTab";
import { useModal } from "../../hooks/useModal";
import Container from "../../components/layout/Container";
import Button from "../../components/layout/Button";
import Tabs from "../../components/navigation/Tabs";
import Delete from "../../components/feedback/Delete";
import { DetailItem } from "../../components/addetails/Details";
import { useTranslation } from "react-i18next";
import { ImageGallery } from "../../components/addetails/Imagegallery";
import { toast } from "react-toastify";

function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const url = `jobs?id=${id}`;

  // Data fetching
  const {
    data: job,
    isFetched,
    isLoading,
  } = useGet(["jobs", id], url, {
    staleTime: Infinity,
    select: (data) => data?.find((e) => e.id === parseInt(id)),
  });

  // Normalize job data
  const normalizedJob = useMemo(() => {
    if (!job) return null;

    return {
      id: job.id,
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
      is_active: job.is_active,
      images: job.images || [],
    };
  }, [job]);

  // Modal management
  const {
    modalState: userState,
    // dispatch: userDispatch,
    openFreezeModal,
    openDeleteModal: userDel,
    closeAllModals: closeUserModals,
  } = useModal();

  // Status toggle mutation
  const patchUserStatus = usePost({
    invalidateQueries: ["jobs"],
    updateQuery: ["jobs", 20],
    onSuccess: () => {
      toast.success(t("user.status_updated_successfully"));
      closeUserModals();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleFreeze = useCallback(() => {
    if (!normalizedJob?.id) return;

    patchUserStatus.mutate({
      url: `admin/jobs/toggleActivation`,
      data: {
        job_id: normalizedJob?.id,
      },
    });
  }, [normalizedJob?.id, patchUserStatus]);

  // Delete mutation
  const deleteProduct = useDelete({
    invalidateQueries: ["jobs"],
    onSuccess: () => {
      toast.success(t("user.deleted_successfully"));
      closeUserModals();
      navigate("/job-ads");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleDelete = useCallback(() => {
    if (!normalizedJob?.id) return;

    deleteProduct.mutate({
      url: `admin/jobs/delete?job_id=${normalizedJob?.id}`,
    });
  }, [normalizedJob?.id, deleteProduct]);

  // Tab management
  const tabs = useMemo(
    () => [
      {
        label: t("details"),
        content: renderDetailsTab(normalizedJob, t),
      },
      {
        label: t("images"),
        content: <ImageGallery images={normalizedJob?.images} jobId={id} />,
      },
    ],
    [normalizedJob, id, t]
  );

  const { activeTab, handleTabChange } = useTab(tabs, `/job-ads/${id}`);

  if (isLoading) return <div>{t("loading")}</div>;
  if (!isFetched || !normalizedJob) return <div>{t("not_found")}</div>;

  return (
    <>
      <Container
        additionalHeaderContent={
          <div className="flex gap-2">
            <Button
              className="w-[125px]"
              onClick={() => openFreezeModal(normalizedJob)}
              variant={normalizedJob?.is_active ? "warning" : "success"}
            >
              {normalizedJob?.is_active ? t("freeze") : t("unfreeze")}
            </Button>
            <Button
              className="w-[125px]"
              onClick={() => userDel(normalizedJob)}
              variant="danger"
            >
              {t("delete")}
            </Button>
          </div>
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
        onConfirm={handleFreeze}
        action={normalizedJob?.is_active ? t("freeze") : t("unfreeze")}
        itemName={t("jobs.title")}
        itemTitle={normalizedJob?.job_title}
      />

      <Delete
        isOpen={userState.isDeleteOpen}
        onClose={closeUserModals}
        onConfirm={handleDelete}
        action={t("delete")}
        itemName={t("jobs.title")}
        itemTitle={normalizedJob?.job_title}
      />
    </>
  );
}

function renderDetailsTab(job, t) {
  if (!job) {
    return <div className="p-4 text-gray-500">{t("no_details_available")}</div>;
  }

  const excludedKeys = [
    "created_at",
    "updated_at",
    "job_id",
    "id",
    "images",
    "is_active",
  ];

  const filteredDetails = Object.entries(job).filter(
    ([key]) => !excludedKeys.includes(key)
  );

  if (filteredDetails.length === 0) {
    return <div className="p-4 text-gray-500">{t("no_relevant_details")}</div>;
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
}

export default JobDetails;
