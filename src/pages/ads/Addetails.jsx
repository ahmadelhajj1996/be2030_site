import { useMemo, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGet, usePost, usePatch, useDelete } from "../../hooks/useApi";
import { useTab } from "../../hooks/useTab";
import { useModal } from "../../hooks/useModal";
import Table from "../../components/display/Table";
import { currencyColumns, violationsColumns } from "../../constants/Columns";
import Container from "../../components/layout/Container";
import Button from "../../components/layout/Button";
import Tabs from "../../components/navigation/Tabs";
import Delete from "../../components/feedback/Delete";
import { DetailItem } from "../../components/addetails/Details";
import { useTranslation } from "react-i18next";
import { formatDate } from "../../utils/helpers";
import { ImageGallery } from "../../components/addetails/Imagegallery";
import useToastr from "../../hooks/useToastr";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { toastr } = useToastr();

  // API URLs
  const productUrl = `products?id=${id}`;
  const reportsUrl = `admin/products/${id}/violations`;

  // Data fetching
  const { data: product, isFetched: isProductFetched } = useGet(
    ["products", id],
    productUrl,
    {
      staleTime: Infinity,
      select: (data) => data.products[0],
    }
  );

  const { data: violationsData, isFetched: isViolationsFetched } = useGet(
    ["violations", reportsUrl],
    reportsUrl,
    {
      staleTime: Infinity,
      select: (data) => data.violations,
    }
  );

  // Memoized data transformations
  const normalizedProduct = useMemo(() => {
    if (!product) return null;

    return {
      category: product?.category?.name,
      subcategory: product?.subCategory?.name,
      product: product?.product,
      details: product?.details,
      reviews: product?.reviews,
      costs: product?.costs,
      mainCurrency: product?.costs[0]?.from_currency,
      images: product?.images,
    };
  }, [product]);

  const violations = useMemo(() => {
    if (!violationsData) return [];
    return violationsData.map((violation) => ({
      ...violation,
      formattedDate: violation.date
        ? formatDate(new Date(violation.date))
        : t("not_found"),
    }));
  }, [violationsData, t]);

  // Navigation handlers
  const handlePublisherClick = useCallback(() => {
    if (normalizedProduct?.product?.added_by) {
      navigate(`/sellers/${normalizedProduct.product.added_by}`);
    }
  }, [normalizedProduct?.product?.added_by, navigate]);

  // Memoized columns
  const columns = useMemo(() => currencyColumns(t), [t]);
  const violationscolumns = useMemo(() => violationsColumns(t), [t]);

  // Tab content renderers
  const renderProductTab = useCallback(() => {
    if (!normalizedProduct) return null;

    return (
      <div className="flex flex-col gap-y-6 ms-2 mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <DetailItem
            label={t("product.id")}
            value={normalizedProduct?.product?.id}
          />
          <DetailItem
            label={t("product.publisher")}
            value={normalizedProduct?.product?.added_by}
            className="text-blue-500 underline underline-offset-8 cursor-pointer"
            onClick={handlePublisherClick}
          />
          <DetailItem
            label={t("product.category")}
            value={normalizedProduct?.category}
          />
          <DetailItem
            label={t("product.sub_category")}
            value={normalizedProduct?.subcategory}
          />
        </div>
        <div className="grid grid-cols-2">
          <DetailItem
            label={t("product.title")}
            value={normalizedProduct?.product?.title}
          />
          <DetailItem
            label={t("product.status")}
            value={
              normalizedProduct?.product?.is_active === 1
                ? t("filter.active")
                : t("filter.inactive")
            }
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <DetailItem
            label={t("product.price")}
            value={`${normalizedProduct?.product?.price} ${normalizedProduct?.mainCurrency}`}
          />
          <DetailItem
            label={t("product.main_currency")}
            value={normalizedProduct?.mainCurrency}
          />
        </div>
        <DetailItem
          label={t("product.description")}
          value={normalizedProduct?.product?.description}
          className="whitespace-pre-line"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DetailItem
            label={t("product.publish_date")}
            value={
              normalizedProduct?.product?.created_at
                ? formatDate(new Date(normalizedProduct.product.created_at))
                : t("not_found")
            }
          />
          <DetailItem
            label={t("product.last_update")}
            value={
              normalizedProduct?.product?.updated_at
                ? formatDate(new Date(normalizedProduct.product.updated_at))
                : t("not_found")
            }
          />
        </div>
        <Table
          columns={columns}
          data={normalizedProduct?.costs}
          pageSize={8}
          pagination={true}
        />
      </div>
    );
  }, [normalizedProduct, handlePublisherClick, t, columns]);

  const renderDetailsTab = useCallback(() => {
    if (!normalizedProduct?.details) {
      return (
        <div className="p-4 text-gray-500">{t("no_details_available")}</div>
      );
    }

    const excludedKeys = ["created_at", "updated_at", "product_id"];
    const filteredDetails = Object.entries(normalizedProduct.details).filter(
      ([key]) => !excludedKeys.includes(key)
    );

    if (filteredDetails.length === 0) {
      return (
        <div className="p-4 text-gray-500">{t("no_relevant_details")}</div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {filteredDetails.map(([key, value]) => (
          <DetailItem
            key={key}
            label={t(`productdetails.${key}`) || key}
            value={value}
            className="border-b pb-2"
          />
        ))}
      </div>
    );
  }, [normalizedProduct?.details, t]);

  const renderImagesTab = useCallback(() => {
    return <ImageGallery images={normalizedProduct?.images} productId={id} />;
  }, [normalizedProduct?.images, id]);

  const renderReviewsTab = useCallback(() => {
    if (!normalizedProduct?.reviews?.length) {
      return (
        <div className="p-4 text-gray-500">{t("no_reviews_available")}</div>
      );
    }

    return (
      <div className="space-y-4 p-4">
        {normalizedProduct.reviews.map((review, index) => (
          <div key={index} className="border-b pb-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">{review.user}</h3>
              <span className="text-sm text-gray-500">
                {formatDate(new Date(review.date))}
              </span>
            </div>
            <p className="mt-2">{review.comment}</p>
            <div className="mt-1">
              {t("product_details.rating")}: {review.rating}/5
            </div>
          </div>
        ))}
      </div>
    );
  }, [normalizedProduct?.reviews, t]);

  const renderReportsTab = useCallback(() => {
    if (!violations?.length) {
      return (
        <div className="p-4 text-gray-500">{t("no_reports_available")}</div>
      );
    }

    return (
      <Table
        data={violations}
        columns={violationscolumns}
        pageSize={8}
        pagination={true}
      />
    );
  }, [violations, violationscolumns, t]);

  // Tabs configuration
  const tabs = useMemo(
    () => [
      {
        label: t("product1"),
        content: renderProductTab(),
      },
      {
        label: t("details1"),
        content: renderDetailsTab(),
      },
      {
        label: t("images1"),
        content: renderImagesTab(),
      },
      {
        label: t("reports"),
        content: renderReportsTab(),
      },
      {
        label: t("reviews1"),
        content: renderReviewsTab(),
      },
    ],
    [
      t,
      renderProductTab,
      renderDetailsTab,
      renderImagesTab,
      renderReportsTab,
      renderReviewsTab,
    ]
  );

  const { activeTab, handleTabChange } = useTab(tabs, `/product-details/${id}`);

  // Modal and mutation handlers
  const { modalState, openFreezeModal, openDeleteModal, closeAllModals } =
    useModal();

  const patchUserStatus = usePost({
    invalidateQueries: ["products"],
    updateQuery: ["product", 20],
    onSuccess: () => {
      toastr(t("user.status_updated_successfully"), "success");
      closeAllModals();
    },
    onError: (error) => {
      toastr(error.message, "error");
    },
  });

  const handleFreeze = useCallback(() => {
    if (!normalizedProduct?.product?.id) return;

    patchUserStatus.mutate(
      {
        url: `admin/products/toggleActivation`,
        data: {
          product_id: normalizedProduct?.product?.id,
        },
      },
      {
        onSettled: closeAllModals,
      }
    );
  }, [normalizedProduct?.product?.id, patchUserStatus, closeAllModals]);

  const deleteProduct = useDelete({
    invalidateQueries: ["products"],
    onSuccess: () => {
      toastr(t("user.deleted_successfully"), "success");
      closeAllModals();
      navigate(-1);
    },
    onError: (error) => {
      toastr(error.message, "error");
    },
  });

  const handleDelete = useCallback(() => {
    if (!normalizedProduct?.product?.id) return;

    deleteProduct.mutate(
      {
        url: `admin/products/delete?product_id=${normalizedProduct.product.id}`,
      },
      {
        onSettled: closeAllModals,
      }
    );
  }, [normalizedProduct?.product?.id, deleteProduct, closeAllModals]);

  const patchMutation = usePatch({
    invalidateQueries: ["products"],
    onSuccess: () => {
      toastr(t("product_featured_status_updated"), "success");
    },
    onError: (error) => {
      toastr(error.message, "error");
    },
  });

  const handleMarkFeatured = useCallback(() => {
    if (!normalizedProduct?.product?.id) return;

    patchMutation.mutate({
      url: `/admin/products/${normalizedProduct.product.id}/feature`,
      data: {},
    });
  }, [normalizedProduct?.product?.id, patchMutation]);

  if (!isProductFetched || !isViolationsFetched) {
    return <div className="p-4">{t("messages.loading")}</div>;
  }

  return (
    <>
      <Container
        additionalHeaderContent={
          <div className="flex gap-2">
            <Button className="w-[200px]" onClick={handleMarkFeatured}>
              {t("mark_as_featured")}
            </Button>

            <Button
              className="w-[125px]"
              onClick={() => openFreezeModal(normalizedProduct)}
            >
              {normalizedProduct?.product?.is_active
                ? t("freeze")
                : t("unfreeze")}
            </Button>
            <Button
              className="w-[125px]"
              variant="danger"
              onClick={() => openDeleteModal(normalizedProduct)}
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
        isOpen={modalState.isModalOpen && modalState.mode === "freeze"}
        onClose={closeAllModals}
        onConfirm={handleFreeze}
        action={
          normalizedProduct?.product?.is_active ? t("freeze") : t("unfreeze")
        }
        itemName={`${
          normalizedProduct?.product?.is_active
            ? t("freeze_the_product")
            : t("unfreeze_the_product")
        } "${normalizedProduct?.product?.title}"`}
        isLoading={patchUserStatus.isLoading}
      />

      <Delete
        isOpen={modalState.isDeleteOpen}
        onClose={closeAllModals}
        onConfirm={handleDelete}
        action={t("delete")}
        itemName={`${t("delete_the_ad")}: ${normalizedProduct?.product?.title}`}
        isLoading={deleteProduct.isLoading}
      />
    </>
  );
}

export default ProductDetails;
