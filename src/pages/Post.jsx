import { IoMdArrowBack } from "react-icons/io";
import { useGet } from "../hooks/useApi";
import { useParams } from "react-router-dom";
import { useMemo } from "react";

function Parts() {
  const { id } = useParams();
  const queryKey = useMemo(() => ["posts", id], [id]);
  const selectFunction = useMemo(
    () => (data) => data.find((e) => e.id == id),
    [id]
  );

  const { data  } = useGet(queryKey, "posts", {
    staleTime: 5 * 60 * 1000,
    select: selectFunction,
    enabled: !!id,  
  });

 
 
  return (
    <>
      <div className="w-full max-w-6xl mx-auto p-8 md:p-12">
        <div className="" dir="rtl">
          <IoMdArrowBack
            className="w-7 h-7 rotate-180 text-[#b9a779] mb-4 cursor-pointer"
            onClick={() => window.history.back()}
          />
          <div className="m-4 sm:m-8 flex flex-col gap-y-12">
            {data?.parts?.map((item) => (
              <div key={item?.id} className=" flex flex-col gap-y-3">
                <p className="text-md text-[#b9a779]">{item.title}</p>
                <p className=" text-sm ps-2">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Parts;
